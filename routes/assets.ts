
import express, { Request, Response } from "express"

const assets = express.Router()

assets.route("/").get((req:Request,res:Response)=> res.send("assets"))

export default assets