
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: user router for capy finance web server
 */

import express from "express"
import { decryptToken, validateUser } from "../controller"

const user = express.Router()

user.route("/login").post(validateUser)
user.route("/validation").post(decryptToken)

export default user