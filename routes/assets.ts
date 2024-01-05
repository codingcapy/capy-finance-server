
import express, { Request, Response } from "express"
import { createAsset } from "../controller"

const assets = express.Router()

assets.route("/").post(createAsset)

export default assets