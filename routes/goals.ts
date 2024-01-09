
import express, { Request, Response } from "express"
import { createGoal } from "../controller"

const goals = express.Router()

goals.route("/").post(createGoal)
goals.route("/:incomeId").post()

export default goals