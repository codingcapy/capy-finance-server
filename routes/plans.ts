
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: plans router for capy finance web server
 */

import express from "express"
import { createPlan, getPlans, updatePlan } from "../controller"

const plans = express.Router()

plans.route("/").post(createPlan)
plans.route("/:userId").get(getPlans)
plans.route("/:planId").post(updatePlan)

export default plans