
import express, { Request, Response } from "express"
import { createFixed } from "../controller"

const fixed = express.Router()

fixed.route("/").post(createFixed)

export default fixed