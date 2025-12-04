import axios from "axios";
import { BASE_URL } from "./config";
import type { Operation } from "./types";


export async function fetchAccountOperations(account_number: string) {
  const url = `${BASE_URL}/account-opperations`;
  const res = await axios.get(url, {
    params: { account_number }  
  });
  return res;
}
export async function fetchaddOperation(operation: Operation){
  const url = `${BASE_URL}/add-operation`;
  const res = await axios.post(url, operation);
  console.log(res.data);
  return res;
}