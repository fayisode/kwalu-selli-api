import {Router} from "express";
import {createNewProductController} from "../../../use_cases/create_new_product";
import {multerUpload} from "../../../services/multer";
const productRoute = Router();
// const multer  = require('multer')
// const path = require("path");
// const upload = multer({
//     storage: multer.diskStorage({}),
//     fileFilter: (req, file, cb) => {
//         let ext = path.extname(file.originalname);
//         if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//             cb(new Error("File type is not supported"), false);
//             return;
//         }
//         cb(null, true);
//     },
// });
productRoute.post('/create-product',multerUpload.array('photos'),(req, res) =>
    createNewProductController.execute(req, res)
)

export {
    productRoute
}