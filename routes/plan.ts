
import express from "express"
import { getPlan } from "../controller"

const plan = express.Router()

plan.route("/:planId").get(getPlan)

export default plan