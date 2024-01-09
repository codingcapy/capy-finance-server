
import express, { Request, Response } from "express"
import { createUser, updateUser } from "../controller"

const users = express.Router()

users.route("/").post(createUser)
users.route("/:userId").post(updateUser)

export default users