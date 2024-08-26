import fs from "fs";
import path from "path";

export const deleteFile = (fullPath) => {
  fs.unlinkSync(path.resolve(fullPath));
};
