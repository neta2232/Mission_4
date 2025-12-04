import { runQuery } from "../dal/dal";

export async function getAllBankAccounts(){

    const q = "SELECT account_number, customer_name FROM BankAccounts;";
    const res = await runQuery(q);
    return res;    
}