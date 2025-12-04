import { useState } from "react";
import { fetchAccountOperations } from "../../apiServices";
import type { Operation } from "../../types";
import AddOperation from "../AddOpperation/AddOperation";
import './AccountOperations.css';

const AccountOperations = () => {
  const [accountId, setAccountId] = useState<number | null>(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [operations, setOperations] = useState<Operation[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [accountCorrect, setAccountCorrect] = useState(true);

  async function handleSend() {
    try {
      const res = await fetchAccountOperations(accountNumber);
      console.log(res.data);
      setOperations(res.data);

      if (res.data.length > 0) {
        setAccountId(res.data[0].account);
        setAccountCorrect(true); // ✅ אם יש תוצאות – ההודעה נעלמת
      } else {
        setAccountCorrect(false); // ❌ אם אין תוצאות – מציגים הודעת שגיאה
      }

      setShowAddForm(true);
    } catch (err) {
      console.error(err);
      setAccountCorrect(false);
    }
  }

  function handleAddOperation(newOp: Operation) {
    console.log(newOp);
    
    setOperations((prev) => [...prev, newOp]); 
  }

  return (
    <div className="main-container">
      <h1>Account Operations</h1>
      <label>Please write account number</label>
      <br />
      <input
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>

      {!accountCorrect && (
        <p id="pid" style={{ color: "red", marginTop: "10px" }}>
          Please insert an existing account number
        </p>
      )}

      <div className="operations-grid">
        {operations.map((op) => (
          <div key={op.id} className="card">
            <p>operation type: {op.action_type}</p>
            <p>amount: {op.amount}₪</p>
            <p className="date">
              date: {new Date(op.operation_date).toLocaleDateString("he-IL")}
            </p>
            {op.interest && <p>interest: {op.interest}</p>}
            {op.payments && <p>payments: {op.payments}</p>}
          </div>
        ))}
      </div>

      {/* טופס להוספת פעולה חדשה יוצג רק אחרי לחיצה על הכפתור */}
      {showAddForm && accountId && (
        <AddOperation accountId={accountId} onAddOperation={handleAddOperation} />
      )}
    </div>
  );
};

export default AccountOperations;



