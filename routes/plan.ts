
import express from "express"

const plan = express.Router()

plan.route("/:planId").get()

export default plan