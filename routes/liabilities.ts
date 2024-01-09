
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: liabilities router for capy finance web server
 */

import express from "express"
import { createLiability } from "../controller"

const liabilities = express.Router()

liabilities.route("/").post(createLiability)

export default liabilities