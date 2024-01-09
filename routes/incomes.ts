
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: incomes router for capy finance web server
 */

import express from "express"
import { createIncome, updateIncome } from "../controller"

const incomes = express.Router()

incomes.route("/").post(createIncome)
incomes.route("/:incomeId").post(updateIncome)

export default incomes