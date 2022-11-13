import {MongoHelper} from "../../../../shared/infra/db/mongo/helper";
import {MongoAuthRepo} from "./mongo_auth_repo";

const mongoHelper = new MongoHelper();
const authRepo = new MongoAuthRepo(mongoHelper);

export {
    authRepo,
    mongoHelper
};