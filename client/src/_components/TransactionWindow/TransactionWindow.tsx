import React, {
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import styles from "./TransactionWindow.module.css";
import { MdCancel } from "react-icons/md";
import Loading from "../Loading/Loading";
import { UserContext } from "../../_context/userContext";
import { TransactionContext } from "../../_context/transactionContext";

interface props {
  openWindow: "deposit" | "withdrawal" | null;
  setOpenWindow: Dispatch<SetStateAction<"deposit" | "withdrawal" | null>>;
}

const TransactionWindow = ({ openWindow, setOpenWindow }: props) => {
  const { user, setUser } = useContext(UserContext);

  const { setAllTransactions } = useContext(TransactionContext);

  const [amount, setAmount] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  async function handleDepositMoney() {
    if (amount === "") {
      alert("Input field is empty.");
      return;
    }
    setLoading(true);

    const request = await fetch("/api/money/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
      }),
    });

    const response = await request.json();

    if (response.error) {
      alert(response.error);
    } else if (response.success === true) {
      setUser(response.user);
      setAllTransactions((prev) => {
        const updatedAllTransactions = [response.transaction, ...prev];
        return updatedAllTransactions;
      });
      setOpenWindow(null);
    }

    setLoading(false);
  }

  async function handleWithdrawal() {
    if (amount === "") {
      alert("Input field is empty.");
      return;
    }

    if (user && Number(amount) > user.balance) {
      alert("Insufficient Funds");
      return;
    }

    setLoading(true);

    const request = await fetch("/api/money/withdrawal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
      }),
    });

    const response = await request.json();

    if (response.error) {
      alert(response.error);
    } else if (response.success === true) {
      setUser(response.user);
      setAllTransactions((prev) => {
        const updatedAllTransactions = [response.transaction, ...prev];
        return updatedAllTransactions;
      });
      setOpenWindow(null);
    }

    setLoading(false);
  }

  return (
    <div className={styles.transactionWindowContainer}>
      <div className={styles.mainWindow}>
        <MdCancel
          className={styles.cancelBtn}
          onClick={() => setOpenWindow(null)}
        />
        <input
          type="number"
          placeholder={`Enter ${openWindow} amount here.`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {openWindow === "deposit" ? (
          <button className={styles.depositBtn} onClick={handleDepositMoney}>
            {loading === true ? <Loading /> : "Deposit"}
          </button>
        ) : (
          <button className={styles.withdrawBtn} onClick={handleWithdrawal}>
            {loading === true ? <Loading /> : "Withdrawal"}
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionWindow;
