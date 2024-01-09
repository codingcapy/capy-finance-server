
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: users router for capy finance web server
 */

import express from "express"
import { createUser, updateUser } from "../controller"

const users = express.Router()

users.route("/").post(createUser)
users.route("/:userId").post(updateUser)

export default users