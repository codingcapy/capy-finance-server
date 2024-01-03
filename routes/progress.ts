
import express, { Request, Response } from "express"

const progress = express.Router()

progress.route("/").get((req: Request, res: Response) => res.send("progress"))

export default progress