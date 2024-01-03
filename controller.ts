

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./models/User";
import Plan from "./models/Plan";
import Income from "./models/Income";

export interface IDecodedUser {
    userId: number
};

const saltRounds = 6;

export async function validateUser(req: Request, res: Response) {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if (!user) return res.json({ result: { user: null, token: null } });
    bcrypt.compare(password, user?.password || "", function (err, result) {
        if (result === true) {
            const token = jwt.sign({ id: user?.id }, "secret", { expiresIn: "2days" });
            res.json({ result: { user, token } });
        }
        else {
            return res.json({ result: { user: null, token: null } });
        }
    })
}

export async function decryptToken(req: Request, res: Response) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(403).send("Header does not exist");
            return "";
        }
        const token = authHeader.split(" ")[1];
        const decodedUser = jwt.verify(token, "secret");
        const user = searchUserById((decodedUser as IDecodedUser).userId);
        res.json({ result: { user, token } });
    }
    catch (err) {
        res.status(401).json({ err });
    }
}

export async function searchUserById(id: number) {
    const user = User.findOne({ userId: id });
    // if (!user) throw new Error("User not found");
    return user;
}

export async function createUser(req: Request, res: Response) {
    const users = await User.find({})
    const userId = users.length === 0 ? 1 : users[users.length - 1].userId + 1
    const username = req.body.username;
    const password = req.body.password;
    if (users.find((user: any) => user.username === username.toString())) {
        res.json({ success: false, message: "Username already exists" })
    }
    else {
        console.log(users.find((user: any) => user.username === username.toString()))
        const encrypted = await bcrypt.hash(password, saltRounds)
        const user = await User.create({ username: username, password: encrypted, userId: userId })
        res.status(200).json({ success: true, message: "Sign up successful!" })
    }
}


export async function createPlan(req: Request, res: Response) {
    const plans = await Plan.find({})
    const planId = plans.length === 0 ? 1 : plans[plans.length - 1].postId + 1;
    const title = req.body.title
    const content = req.body.content
    const username = req.body.username
    const userId = parseInt(req.body.userId)
    const plan = await Plan.create({ title, content, username, userId, planId })
    res.status(200).json({ success: true })
}

export async function getPlans(req: Request, res: Response) {
    const userId = req.params.userId
    const plans = await Plan.find({ userId: parseInt(userId) })
    res.json(plans)
}

export async function getPlan(req: Request, res: Response) {
    const planId = req.params.planId
    const plan = await Plan.findOne({ planId: parseInt(planId) })
    const income = await Income.find({ planId: parseInt(planId) })
    res.json({plan, income})
}