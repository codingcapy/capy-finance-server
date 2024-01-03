
import express, { Request, Response } from "express"
import cors from "cors"
import connectDB from "./connect"
import users from "./routes/users"
import user from "./routes/user"
import plans from "./routes/plans"
import plan from "./routes/plan"
import incomes from "./routes/incomes"
import fixed from "./routes/fixed"
import variable from "./routes/variable"
import assets from "./routes/assets"
import liabilities from "./routes/liabilities"
import goals from "./routes/goals"
import progress from "./routes/progress"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = process.env.PORT || 3333

app.use(cors())
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("welcome")
})

app.use("/api/v1/users", users)
app.use("/api/v1/user", user)
app.use("/api/v1/plans", plans)
app.use("/api/v1/plan", plan)
app.use("/api/v1/incomes", incomes)
app.use("/api/v1/fixed", fixed)
app.use("/api/v1/variable", variable)
app.use("/api/v1/assets", assets)
app.use("/api/v1/liabilities", liabilities)
app.use("/api/v1/goals", goals)
app.use("/api/v1/progress", progress)

async function start() {
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("Connected to database")
        app.listen(port, () => console.log(`Server listening on port: ${port}`))
    }
    catch (err) {
        console.log(err)
    }
}

start()