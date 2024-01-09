
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: progress router for capy finance web server
 */

import express, { Request, Response } from "express"

const progress = express.Router()

progress.route("/").get((req: Request, res: Response) => res.send("progress"))

export default progress