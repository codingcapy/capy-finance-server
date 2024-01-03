
import express, { Request, Response } from "express"

const incomes = express.Router()

incomes.route("/").get((req: Request, res: Response) => res.send("incomes"))

export default incomes