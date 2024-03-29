
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: controller for capy finance web server
 */

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./models/User";
import Plan from "./models/Plan";
import Income from "./models/Income";
import Fixed from "./models/Fixed";
import Variable from "./models/Variable";
import Asset from "./models/Asset";
import Liability from "./models/Liability";
import Goal from "./models/Goal";
import goals from "./routes/goals";
import Message from "./models/Message";

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

export async function updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.userId)
    const incomingUser = await req.body;
    const incomingPassword = incomingUser.password
    const encrypted = await bcrypt.hash(incomingPassword, saltRounds)
    const updatedUser = await User.findOneAndUpdate(
        { userId: userId },
        { username: incomingUser.username, password: encrypted, userId: incomingUser.userId },
        { new: true }
    );
    res.status(200).json({ success: true });
}

export async function createPlan(req: Request, res: Response) {
    const plans = await Plan.find({})
    const planId = plans.length === 0 ? 1 : plans[plans.length - 1].planId + 1;
    const title = req.body.title
    const content = req.body.content
    const username = req.body.username
    const userId = parseInt(req.body.userId)
    const plan = await Plan.create({ title, content, username, userId, planId })
    res.status(200).json({ success: true })
}

export async function updatePlan(req: Request, res: Response) {
    const planId = parseInt(req.params.planId)
    const incomingPlan = await req.body;
    const title = incomingPlan.title;
    const content = incomingPlan.content;
    const active = incomingPlan.active;
    const plan = await Plan.findOneAndUpdate({ planId: planId }, { title: title, content: content, active: active }, { new: true })
    res.status(200).json({ success: true });
}

export async function getPlans(req: Request, res: Response) {
    const userId = req.params.userId
    const plans = await Plan.find({ userId: parseInt(userId) })
    res.json(plans)
}

export async function getPlan(req: Request, res: Response) {
    const planId = parseInt(req.params.planId)
    const plan = await Plan.findOne({ planId: planId })
    const income = await Income.find({ planId: planId })
    const fixed = await Fixed.find({ planId: planId })
    const variable = await Variable.find({ planId: planId })
    const assets = await Asset.find({ planId: planId })
    const liabilities = await Liability.find({ planId: planId })
    const goals = await Goal.find({ planId: planId })
    res.json({ plan, income, fixed, variable, assets, liabilities, goals })
}

export async function createIncome(req: Request, res: Response) {
    const incomes = await Income.find({})
    const incomeId = incomes.length === 0 ? 1 : incomes[incomes.length - 1].incomeId + 1;
    const title = req.body.title
    const content = req.body.content
    const value = parseFloat(req.body.value)
    const taxRate = parseFloat(req.body.taxRate)
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const planId = parseInt(req.body.planId)
    const plan = await Income.create({ title, content, value, taxRate, startDate, endDate, planId, incomeId })
    res.status(200).json({ success: true })
}

export async function updateIncome(req: Request, res: Response) {
    const incomeId = parseInt(req.params.incomeId)
    const title = req.body.title
    const content = req.body.content
    const value = parseFloat(req.body.value)
    const taxRate = parseFloat(req.body.taxRate)
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const income = await Income.findOneAndUpdate({ incomeId: incomeId }, { title, content, value, taxRate, startDate, endDate, incomeId }, { new: true })
    res.status(200).json({ success: true })
}

export async function createFixed(req: Request, res: Response) {
    const fixeds = await Fixed.find({})
    const fExpId = fixeds.length === 0 ? 1 : fixeds[fixeds.length - 1].fExpId + 1;
    const title = req.body.title
    const content = req.body.content
    const value = parseFloat(req.body.value)
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const planId = parseInt(req.body.planId)
    const fixed = await Fixed.create({ title, content, value, startDate, endDate, planId, fExpId })
    res.status(200).json({ success: true })
}

export async function updateFixed(req: Request, res: Response) {
    const fExpId = parseInt(req.params.fExpId)
    const title = req.body.title
    const content = req.body.content
    const value = parseFloat(req.body.value)
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const fixed = await Fixed.findOneAndUpdate({ fExpId: fExpId }, { title, content, value, startDate, endDate, fExpId }, { new: true })
    res.status(200).json({ success: true })
}

export async function createVariable(req: Request, res: Response) {
    const variables = await Variable.find({})
    const vExpId = variables.length === 0 ? 1 : variables[variables.length - 1].vExpId + 1;
    const title = req.body.title
    const content = req.body.content
    const value = parseFloat(req.body.value)
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const planId = parseInt(req.body.planId)
    const variable = await Variable.create({ title, content, value, startDate, endDate, planId, vExpId })
    res.status(200).json({ success: true })
}

export async function updateVariable(req: Request, res: Response) {
    const vExpId = parseInt(req.params.vExpId)
    const title = req.body.title
    const content = req.body.content
    const value = parseFloat(req.body.value)
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const variable = await Variable.findOneAndUpdate({ vExpId: vExpId }, { title, content, value, startDate, endDate, vExpId }, { new: true })
    res.status(200).json({ success: true })
}

export async function createAsset(req: Request, res: Response) {
    const assets = await Asset.find({})
    const assetId = assets.length === 0 ? 1 : assets[assets.length - 1].assetId + 1;
    const title = req.body.title
    const content = req.body.content
    const value = parseFloat(req.body.value)
    const growthRate = parseFloat(req.body.growthRate)
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const planId = parseInt(req.body.planId)
    const plan = await Asset.create({ title, content, value, growthRate, startDate, endDate, planId, assetId })
    res.status(200).json({ success: true })
}

export async function updateAsset(req: Request, res: Response) {
    const assetId = parseInt(req.params.assetId)
    const title = req.body.title
    const content = req.body.content
    const value = parseFloat(req.body.value)
    const growthRate = parseFloat(req.body.growthRate)
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const asset = await Asset.findOneAndUpdate({ assetId: assetId }, { title, content, value, growthRate, startDate, endDate, assetId }, { new: true })
    res.status(200).json({ success: true })
}

export async function createLiability(req: Request, res: Response) {
    const liabilities = await Liability.find({})
    const liabilityId = liabilities.length === 0 ? 1 : liabilities[liabilities.length - 1].liabilityId + 1;
    const title = req.body.title
    const content = req.body.content
    const value = parseFloat(req.body.value)
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const planId = parseInt(req.body.planId)
    const plan = await Liability.create({ title, content, value, startDate, endDate, planId, liabilityId })
    res.status(200).json({ success: true })
}

export async function updateLiability(req: Request, res: Response) {
    const liabilityId = parseInt(req.params.liabilityId)
    const title = req.body.title
    const content = req.body.content
    const value = parseFloat(req.body.value)
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const liability = await Liability.findOneAndUpdate({ liabilityId: liabilityId }, { title, content, value, startDate, endDate, liabilityId }, { new: true })
    res.status(200).json({ success: true })
}

export async function createGoal(req: Request, res: Response) {
    const goals = await Goal.find({})
    const goalId = goals.length === 0 ? 1 : goals[goals.length - 1].goalId + 1;
    const title = req.body.title
    const content = req.body.content
    const value = parseFloat(req.body.value)
    const startDate = req.body.startDate
    const planId = parseInt(req.body.planId)
    const plan = await Goal.create({ title, content, value, startDate, planId, goalId })
    res.status(200).json({ success: true })
}

export async function updateGoal(req: Request, res: Response) {
    const goalId = parseInt(req.params.goalId)
    const title = req.body.title
    const content = req.body.content
    const value = parseFloat(req.body.value)
    const startDate = req.body.startDate
    const goal = await Goal.findOneAndUpdate({ goalId: goalId }, { title, content, value, startDate, goalId }, { new: true })
    res.status(200).json({ success: true })
}

export async function createMessage(req: Request, res: Response) {
    const messages = await Message.find({})
    const messageId = messages.length === 0 ? 1 : messages[messages.length - 1].messageId + 1;
    const email = req.body.email
    const content = req.body.content
    const message = await Message.create({ email, content, messageId })
    res.status(200).json({ success: true })
}