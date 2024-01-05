
import express, { Request, Response } from "express"
import { createVariable } from "../controller"

const variable = express.Router()

variable.route("/").post(createVariable)

export default variable