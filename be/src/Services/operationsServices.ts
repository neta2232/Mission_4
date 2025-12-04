import { runQuery } from "../dal/dal"

export async function getAllOperationByAccount(account_number: string): Promise<any> {
  const q = `
    SELECT AccountOperations.* FROM AccountOperations JOIN BankAccounts  ON AccountOperations.account = BankAccounts.id
    WHERE BankAccounts.account_number = ?;
  `;
  const res = await runQuery(q, [account_number]);
  console.log(res);
  
  return res;
}

export async function addOperation(
  accountId: number,
  action_type: "deposit" | "withdrawal" | "loan",
  amount: number,
  operation_date: string,
  interest?: number,
  payments?: number
) {

  if (action_type === "loan") {
    if (interest == null || payments == null) {
      throw new Error("Loan requires interest and payments");
    }
  }

  const q = `
    INSERT INTO AccountOperations (account, action_type, amount, operation_date, interest, payments) VALUES (?, ?, ?, ?, ?, ?);
  `;

  const res = await runQuery(q, [
    accountId,
    action_type,
    amount,
    operation_date,
    interest ? interest : null,
    payments ? payments: null
  ]);

  console.log("Inserted operation:", res);
  return res;
}
