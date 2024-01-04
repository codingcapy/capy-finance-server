
import express, { Request, Response } from "express"
import { createIncome } from "../controller"

const incomes = express.Router()

incomes.route("/").post(createIncome)

export default incomes