import {Router} from "express";
import {createNewProductController} from "../../../use_cases/create_new_product";
import {multerUpload} from "../../../../../shared/infra/multer";
import {getProductController} from "../../../use_cases/get_product";

const productRoute = Router();

productRoute.post('/create-product', multerUpload.array('photos'), (req, res) =>
    createNewProductController.execute(req, res)
)

productRoute.get('/get-product', (req, res) =>
    getProductController.execute(req, res)
)

export {
    productRoute
}