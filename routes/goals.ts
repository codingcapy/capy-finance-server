
import express, { Request, Response } from "express"

const goals = express.Router()

goals.route("/").get((req:Request,res:Response)=> res.send("goals"))

export default goals