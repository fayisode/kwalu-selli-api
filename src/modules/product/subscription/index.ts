import {AfterImageAdded} from "./after_image_added";
import {productReadRepo} from "../repos/implementation";
import {AfterProductCreated} from "./after_product_created";
import {authRepo} from "../../auth/repos/implementation";
import {AfterProductDeleted} from "./after_product_deleted";
import {AfterProductEdited} from "./after_product_edited";
import {AfterImageUpdated} from "./after_image_updated";

const afterImageAdded = new AfterImageAdded(productReadRepo);
const afterProductCreated = new AfterProductCreated(productReadRepo, authRepo);
const afterProductDeleted = new AfterProductDeleted(productReadRepo);
const afterProductEdited = new AfterProductEdited(productReadRepo);
const afterImageUpdated = new AfterImageUpdated(productReadRepo)

export {
    afterImageAdded,
    afterProductCreated,
    afterProductDeleted,
    afterProductEdited,
    afterImageUpdated
}