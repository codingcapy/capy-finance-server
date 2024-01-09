
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: plan router for capy finance web server
 */

import express from "express"
import { getPlan } from "../controller"

const plan = express.Router()

plan.route("/:planId").get(getPlan)

export default plan