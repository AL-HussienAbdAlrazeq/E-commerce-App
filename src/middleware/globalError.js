import { deleteFile } from "../utils/deleteFile.js";

export const globalError = (err, req, res, next) => {
  // if (req.file) {
  //   deleteFile(req.file.path);
  // }

  // case use array
  //req.files >>> array case >>> [{},{},{}]
  //   if (req.files) {
  //     for (const file of req.files) {
  //       deleteFile(file.path);
  //     }
  //   }
  // case use fields
  /**
  req.files >>> fields case >>> { imageCover:[{}] ,images:[{},{},{}]}
  */

  // for (const key in req.files) {
  //   for (const file of key) {
  //     deleteFile(file.path);
  //   }
  // }
  const code = err.statusCode || 500;
  res.status(code).json({ error: "Error", message: err.message, code , stack:err.stack });
};
