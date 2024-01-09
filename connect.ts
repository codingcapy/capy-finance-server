
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: mongoose connect for capy finance web server
 */

import mongoose from "mongoose"

export default function connectDB(url: any) {
    return mongoose.connect(url)
}