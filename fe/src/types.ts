export type Operation = {
  id?: number;               
  accountId: number;         
  action_type: "deposit" | "withdrawal" | "loan"; 
  amount: number;            
  operation_date: string;   
  interest?: number;         
  payments?: number;       
};
