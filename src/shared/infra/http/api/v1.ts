
import express from 'express'
import {authRoute} from "../../../../modules/auth/infra/http/routes";


const v1Router = express.Router();

v1Router.get('/', (req, res) => {
  return res.json({ message: "Yo! we're up" });
})
v1Router.use('/auth', authRoute)


export { v1Router }