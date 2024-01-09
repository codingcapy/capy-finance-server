
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: variable router for capy finance web server
 */

import express from "express"
import { createVariable } from "../controller"

const variable = express.Router()

variable.route("/").post(createVariable)

export default variable