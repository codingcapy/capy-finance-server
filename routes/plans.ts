
import express, { Request, Response } from "express"
import { createPlan, getPlans } from "../controller"

const plans = express.Router()

plans.route("/").post(createPlan)
plans.route("/:userId").get(getPlans)

export default plans