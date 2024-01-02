
import express, { Request, Response } from "express"
import { decryptToken, validateUser } from "../controller"

const user = express.Router()

user.route("/login").post(validateUser)
user.route("/validation").post(decryptToken)

export default user