import {CreateNewProductController} from "./create_new_product_controller";
import {CreateNewProductUseCase} from "./create_new_product_use_case";
import {Cloudinary} from "../../services/cloudinary";
import {jwtAuthService} from "../../../auth/services/implementation";
import {productWriteRepo} from "../../repos/implementation";

const cloudinary = new Cloudinary();
const createNewProductUseCase = new CreateNewProductUseCase(cloudinary,
    jwtAuthService, productWriteRepo);
const createNewProductController = new CreateNewProductController(createNewProductUseCase)

export {
    createNewProductController,
    createNewProductUseCase
}