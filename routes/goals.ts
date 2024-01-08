
import express, { Request, Response } from "express"
import { createGoal } from "../controller"

const goals = express.Router()

goals.route("/").post(createGoal)

export default goals