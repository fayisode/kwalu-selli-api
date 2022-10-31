import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { v1Router } from './api/v1';
import {MongoHelper} from "../db/mongo/helper";
import {dbConfig} from "../../../config/config";

const origin = {
  origin: "*"
}
const mongoHelper = new MongoHelper();

mongoHelper.connect(dbConfig.mongoUrl)
    .then(async () => {
      const app = express();

      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(cors(origin))
      app.use(compression())
      app.use(helmet())
      app.use(morgan('combined'))

      app.use('/api/v1', v1Router)

      const port = process.env.PORT || 5000;

      app.listen(port, () => {
        console.log(`[App]: Listening on port ${port}`)
      })
    })
    .catch(console.error)

