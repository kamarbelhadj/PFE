
import multer from "multer";
import { ext, mimeTypes} from "./FileTypes.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 //const uploadDir = path.resolve(__dirname, "../uploads/profil/");

const storage = multer.diskStorage({

    destination : (req, file, cb) =>{
     return cb(null, './uploads')
    },
    filename: (req, file, cb) => {

      cb(null,file.originalname );
    },
  });
const sanitizeFile = (file, cb) => {
  
    const arr = file.originalname.split(".");
    const fileExts = [...ext];
    const fileMimeTypes = [...mimeTypes];
    const isAllowedExt = fileExts.includes(arr[arr.length - 1].toLowerCase());
    const isAllowedMimeType = fileMimeTypes.includes(file.mimetype);
  
    if (isAllowedExt && isAllowedMimeType) {
   
      return cb(null, true);
    } else {
      return cb(
        new Error({ message: "Invalid file", code: 81 }),
        false
      );
    }
  };

const imgUploader = multer({
    storage: storage,
    fileFilter: (req, file, cb) => sanitizeFile(file, cb),
  }).single('Image');

  const fileUploader = multer({
    storage: storage,
    fileFilter: (req, file, cb) => sanitizeFile(file, cb),
  }).single('file');




export {imgUploader, fileUploader}