import express, { NextFunction, Request, Response } from "express"
import { getAllBankAccounts } from "../Services/accountsServices";


export const accountsRoutes = express.Router();
accountsRoutes.get("/accounts", async (req: Request, res: Response, next: NextFunction) => {    
    const accounts = await getAllBankAccounts();
    res.status(200).json(accounts);
})