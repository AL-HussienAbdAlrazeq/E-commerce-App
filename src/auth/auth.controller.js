import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { User } from "../../database/models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { catchError } from "../middleware/catchError.js";
import { sendCode, sendEmail } from "../email/email.js";

const signup = catchError(async (req, res) => {
  const user = new User(req.body);
  await sendEmail(req.body.email);
  await user.save();
  let token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.SECRET_KEY
  );
  res.status(201).json({ message: "success", token });
});

const signin = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return next(new AppError("incorrect email or password ", 404));

  jwt.sign(
    { userId: user.id, name: user.name, role: user.role },
    process.env.SECRET_KEY,
    (err, token) => {
      res.status(201).json({ message: "login", token });
    }
  );
});

const changeUserPassword = catchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || !bcrypt.compareSync(req.body.oldPassword, user.password))
    return next(new AppError("incorrect email or password ", 404));

  await User.findOneAndUpdate(
    { email: req.body.email },
    { password: req.body.newPassword }
  );
  const token = jwt.sign({ userId: user.id, role: user.role }, "S7S");
  res.status(201).json({ message: "login", token });

  //   if(user && bcrypt.compareSync(req.body.oldPassword , user.password) ){
  //         await User.findOneAndUpdate({email:req.body.email} , {password:req.body.newPassword})
  //         const token = jwt.sign({ userId:user.id , role:user.role} ,"S7S" )
  //         res.status(201).json({message:"login" , token})
  //   }
  //  next(new AppError("incorrect email or password ",404))
});

const protectedRoutes = catchError(async (req, res, next) => {
  let { token } = req.headers;
  let userPayload = null;
  if (!token) return next(new AppError("Token Not Provided", 401));
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) return next(new AppError(err, 401));
    userPayload = payload;
  });
  let user = await User.findById(userPayload.userId);
  if (!user) return next(new AppError("User Not Found", 401));
  if (user.passwordChangedAt) {
    let time = parseInt(user.passwordChangedAt.getTime() / 1000);
    if (time > userPayload.iat)
      return next(new AppError("Invalid Token...Login Again", 401));
  }
  req.user = user;
  next();
});

const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }
    return next(
      new AppError("You Not Authorized To Access this Endpoint", 401)
    );
  });
};

const verifyEmail = catchError(async (req, res, next) => {
  jwt.verify(
    req.params.token,
    process.env.SECRET_KEY_EMAIL,
    async (error, payload) => {
      if (error) return next(new AppError(error, 409));

      await User.findOneAndUpdate(
        { email: payload.email },
        { confirmEmail: true }
      );
      res.json({ message: "Success", email: payload.email });
    }
  );
});

const forgetPassword = catchError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return next(new AppError(`User not exist`, 404));
  const resetCode = Math.floor(10000 + Math.random() * 90000).toString();
  sendCode(req.body.email, `<h1> Your code is ${resetCode}</h1>`);
  await User.updateOne({ email }, { code: resetCode });
  res.status(200).json({ message: "Done" });
});

const resetPassword = catchError(async (req, res, next) => {
  const { email, code, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return next(new AppError(`User not exist`, 404));
  if (user.code !== code || code == "") {
    return next(new AppError(`Code is not correct`, 404));
  }
  const hashPassword = bcrypt.hashSync(password, 10);
  const passwordUpdate = await User.updateOne(
    { email },
    { password: hashPassword, code: "", passwordChangedAt: Date.now() }
  );
  res.status(200).json({ message: "Done" });
});

export {
  signup,
  signin,
  changeUserPassword,
  protectedRoutes,
  allowedTo,
  verifyEmail,
  forgetPassword,
  resetPassword,
};
