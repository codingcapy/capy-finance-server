
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: variable expenditure router for capy finance web server
 */

import express from "express"
import { createAsset } from "../controller"

const assets = express.Router()

assets.route("/").post(createAsset)

export default assets