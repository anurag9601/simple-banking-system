import React, { useContext, useEffect, useState } from "react";
import styles from "./Transactions.module.css";
import TransactionWindow from "../../_components/TransactionWindow/TransactionWindow";
import { UserContext } from "../../_context/userContext";
import { TransactionContext } from "../../_context/transactionContext";
import moment from "moment";
import { DiVim } from "react-icons/di";

const Transactions = () => {
  const { user } = useContext(UserContext);

  const { allTransactions, setAllTransactions } =
    useContext(TransactionContext);

  const [openWindow, setOpenWindow] = useState<"deposit" | "withdrawal" | null>(
    null
  );

  async function fetchAllTransactions() {
    const request = await fetch("/api/money/transaction/all");

    const response = await request.json();

    if (response.success === true) {
      const allData = response.allTransactions.transactions.reverse();
      setAllTransactions(allData);
    } else if (response.error) {
      alert(response.error);
    }
  }

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  return (
    <>
      {openWindow && (
        <TransactionWindow
          openWindow={openWindow}
          setOpenWindow={setOpenWindow}
        />
      )}
      <div className={styles.transectionContainer}>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{user?.email}</p>
          <p className={styles.userBalance}>{user?.balance} ₹</p>
          <div className={styles.actionBtn}>
            <button
              className={styles.depositBtn}
              onClick={() => setOpenWindow("deposit")}
            >
              Deposit
            </button>
            <button
              className={styles.withdrawBtn}
              onClick={() => setOpenWindow("withdrawal")}
            >
              Withdrawal
            </button>
          </div>
        </div>
        <ul className={styles.transactionList}>
          {allTransactions.length > 0 ? (
            allTransactions.map((transaction, index) => {
              return (
                <li
                  key={index}
                  style={
                    index === allTransactions.length - 1
                      ? { borderBottom: "1px solid var(--background-color)" }
                      : {}
                  }
                >
                  <p
                    style={
                      transaction.action === "Withdrawal"
                        ? { color: "#f07167" }
                        : { color: "#80ed99" }
                    }
                  >
                    {transaction.action}
                  </p>
                  <p
                    style={
                      transaction.action === "Withdrawal"
                        ? { color: "#f07167" }
                        : { color: "#80ed99" }
                    }
                  >
                    {transaction.action === "Withdrawal" && "-"}
                    {transaction.amount} ₹
                  </p>
                  <p className={styles.transactionTime}>
                    {moment(transaction.createdAt).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </p>
                </li>
              );
            })
          ) : (
            <li className={styles.noTransactionMessage}>
              No transactions yet.
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Transactions;
