
import express from "express"
import { createPlan, getPlans, updatePlan } from "../controller"

const plans = express.Router()

plans.route("/").post(createPlan)
plans.route("/:userId").get(getPlans)
plans.route("/:planId").post(updatePlan)

export default plans