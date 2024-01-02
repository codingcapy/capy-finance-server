
import express, { Request, Response } from "express"

const liabilities = express.Router()

liabilities.route("/").get((req:Request,res:Response)=> res.send("liabilities"))

export default liabilities