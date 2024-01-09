
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: fixed expenditure router for capy finance web server
 */

import express from "express"
import { createFixed, updateFixed } from "../controller"

const fixed = express.Router()

fixed.route("/").post(createFixed)
fixed.route("/:fExpId").post(updateFixed)

export default fixed