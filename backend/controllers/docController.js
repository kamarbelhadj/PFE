
import FS from "fs";
import PATH from "path";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const mkdirIfNotExists = (path) => {
    try {
      if (!FS.existsSync(path)) {
        FS.mkdirSync(path);
      }
    } catch (error) {
      throw error;
    }
  };
  const uploadImageProfil = async ({ tmpFile }) => {
    // console.log('here',tmpFile)
    const absolutePath = PATH.join("./uploads/profil", "");
   
    if (tmpFile) {

      const newPath = PATH.join(absolutePath, tmpFile.filename);
      try {
        console.log('tmpFile.path',tmpFile.path)
        console.log('new Path', newPath)
        FS.copyFileSync(tmpFile.path, newPath);
        FS.unlinkSync(tmpFile.path);
        return {
          url: `${process.env.API_URL}/uploads/profil/${tmpFile.filename}`,
          fileName: tmpFile.filename
        };
      } catch (error) {
        throw error
      }
    }
  };
  const uploadDocument = async ({ tmpFile ,date, contentType, description,fullname,patientId}) => {
    const absolutePath = PATH.join("./uploads/docs", "");
    if (tmpFile) {
      if (!FS.existsSync(absolutePath)) {
        throw new Error("Invalid directory path");
      }
      const newPath = PATH.join(absolutePath, tmpFile.filename);
  
      try {
        FS.copyFileSync(tmpFile.path, newPath);
        FS.unlinkSync(tmpFile.path);
        return {
          fileName: tmpFile.filename,
          date,
          contentType,
          description,
          fullname,
          patientId,
        };
      } catch (error) {
        console.log(error);
        throw new Error("An error occurred while copying the file");
      }
    } else {
      throw new Error("No file provided");
    }
  };
  
  const imageDownload = async({fileName})=>{
    try {
      const filePath = PATH.resolve( __dirname,'../uploads/profil/', fileName)
      return filePath
    } catch (error) {
      console.log(error)
    }
  };
  const documentDownload = async({fileName})=>{
    try {
      const filePath = PATH.resolve( __dirname,'../uploads/docs/', fileName);
      return filePath
    } catch (error) {
      throw new Error(message=error.message)
    }
  };
  

  export { uploadImageProfil, uploadDocument, imageDownload, documentDownload };