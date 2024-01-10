
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: goals router for capy finance web server
 */

import express from "express"
import { createGoal, updateGoal } from "../controller"

const goals = express.Router()

goals.route("/").post(createGoal)
goals.route("/:goalId").post(updateGoal)

export default goals