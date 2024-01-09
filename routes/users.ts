
import express, { Request, Response } from "express"
import { createUser } from "../controller"

const users = express.Router()

users.route("/").post(createUser)
users.route("/:userId").post()

export default users