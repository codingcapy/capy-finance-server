
import express, { Request, Response } from "express"
import { createLiability } from "../controller"

const liabilities = express.Router()

liabilities.route("/").post(createLiability)

export default liabilities