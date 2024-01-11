
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: plans router for capy finance web server
 */

import express from "express"
import { createMessage } from "../controller"

const messages = express.Router()

messages.route("/").post(createMessage)

export default messages