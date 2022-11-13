import {MongoProductReadRepo} from "./mongo_product_read_repo";
import {mongoHelper} from "../../../auth/repos/implementation";
import {MongoProductWriteRepo} from "./mongo_product_write_repo";

const productReadRepo = new MongoProductReadRepo(mongoHelper);
const productWriteRepo = new MongoProductWriteRepo(mongoHelper);


export {
    productReadRepo,
    productWriteRepo
}