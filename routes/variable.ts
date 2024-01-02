
import express, { Request, Response } from "express"

const variable = express.Router()

variable.route("/").get((req:Request,res:Response)=> res.send("variable"))

export default variable