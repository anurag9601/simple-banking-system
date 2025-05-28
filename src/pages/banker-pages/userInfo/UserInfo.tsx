import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { transactionDataType } from "../../../_context/transactionContext";
import moment from "moment";
import styles from "./UserInfo.module.css";

const UserInfo = () => {
  const { userId } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState<{
    id: number;
    email: string;
    balance: number;
  } | null>(null);

  const [allTransactions, setAllTransactions] = useState<
    transactionDataType[] | []
  >([]);

  async function fetCurrentUserInfo() {
    const request = await fetch("/api/bank/get-user-info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
      }),
    });

    const response = await request.json();

    if (response.success === true) {
      const userInfo = response.userAllInfo;
      setUser({
        id: userInfo.id,
        email: userInfo.email,
        balance: userInfo.balance,
      });
      setAllTransactions(userInfo.transactions);
    } else {
      navigate("/not-found");
    }
  }

  useEffect(() => {
    fetCurrentUserInfo();
  }, []);

  return (
    <div className={styles.transectionContainer}>
      <div className={styles.userInfo}>
        <p className={styles.userName}>{user?.email}</p>
        <p className={styles.userBalance}>{user?.balance} ₹</p>
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
          <li className={styles.noTransactionMessage}>No transactions yet.</li>
        )}
      </ul>
    </div>
  );
};

export default UserInfo;
