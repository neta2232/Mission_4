import { useState } from "react";
import { fetchaddOperation } from "../../apiServices";
import type { Operation } from "../../types";
import './AddOperation.css';

type AddOperationProps = {
  accountId: number;
  onAddOperation: (op: Operation) => void;
};

const AddOperation = ({ accountId, onAddOperation }: AddOperationProps) => {
  const [form, setForm] = useState({
    actionType: "",
    amount: "",
    interest: "",
    payments: ""
  });
  const [success, setSuccess] = useState<boolean | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const operation: any = {
      accountId,
      action_type: form.actionType,
      amount: Number(form.amount),
      operation_date: new Date().toISOString(),
    };

    if (form.actionType === "loan") {
      operation.interest = Number(form.interest);
      operation.payments = Number(form.payments);
    }

    try {
      const res = await fetchaddOperation(operation);
      if (!res) throw new Error("Error while trying to add operation");

      const newOp: Operation = operation; // הפעולה החדשה מהשרת
      onAddOperation(newOp); // מוסיפים אותה ל־state של ההורה

      setForm({ actionType: "", amount: "", interest: "", payments: "" });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setSuccess(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>Add operation</h1>

      <select name="actionType" value={form.actionType} onChange={handleChange} required>
        <option value="">Select action type</option>
        <option value="deposit">Deposit</option>
        <option value="withdrawal">Withdrawal</option>
        <option value="loan">Loan</option>
      </select>

      {form.actionType && (
        <div>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />

          {form.actionType === "loan" && (
            <div className="inline-grid">
              <input
                type="number"
                name="interest"
                placeholder="Interest"
                value={form.interest}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="payments"
                placeholder="Payments"
                value={form.payments}
                onChange={handleChange}
                required
              />
            </div>
          )}
        </div>
      )}

      <button type="submit">Add</button>

      {success === true && <p className="status-success">New operation added successfully</p>}
      {success === false && <p className="status-error">Failed to add operation</p>}
    </form>
  );
};

export default AddOperation;





