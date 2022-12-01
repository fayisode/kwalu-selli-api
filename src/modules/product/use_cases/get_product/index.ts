import { productReadRepo } from "../../repos/implementation";
import {GetProductUseCase} from "./get_product_use_case";
import {jwtAuthService} from "../../../auth/services/implementation";
import {GetProductController} from "./get_product_controller";

const getProductUseCase = new GetProductUseCase(productReadRepo, jwtAuthService)
const getProductController = new GetProductController(getProductUseCase)

export {
    getProductUseCase,
    getProductController
}