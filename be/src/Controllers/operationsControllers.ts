import express, { NextFunction, Request, Response } from "express"
import { getAllBankAccounts } from "../Services/accountsServices";
import { addOperation, getAllOperationByAccount } from "../Services/operationsServices";


export const operationsRoutes = express.Router();

operationsRoutes.get("/account-opperations", async (req: Request, res: Response, next: NextFunction) => {
    const account_number = String(req.query.account_number)
    const opperations = await getAllOperationByAccount(account_number);
    res.status(200).json(opperations);
})
operationsRoutes.post("/add-operation", async (req: Request, res: Response, next: NextFunction) => {
    const { accountId, action_type, amount, operation_date, interest, payments } = req.body;

    if (action_type === "loan") {
        if (interest == null || payments == null) {
            return res.status(400).json({ error: "Loan requires interest and payments" });
        }
    }

    const newopp = await addOperation(
        accountId,
        action_type,
        amount,
        operation_date,
        interest,
        payments
    );
    res.status(201).json(newopp);
}
);

