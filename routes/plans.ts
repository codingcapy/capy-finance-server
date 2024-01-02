
import express, { Request, Response } from "express"

const plans = express.Router()

plans.route("/").get((req:Request,res:Response)=> res.send("plans"))

export default plans