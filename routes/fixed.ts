
import express, { Request, Response } from "express"

const fixed = express.Router()

fixed.route("/").get((req:Request,res:Response)=> res.send("fixed"))

export default fixed