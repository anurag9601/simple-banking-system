import { useEffect, useState, type ChangeEvent } from "react";
import styles from "./users.module.css";
import { useNavigate } from "react-router-dom";

interface userDataType {
  balance: number;
  email: string;
  id: number;
  password: string;
}

const Users = () => {
  const navigate = useNavigate();

  const [users, setUser] = useState<userDataType[] | []>([]);

  const [filterUsers, setFilterUsers] = useState<userDataType[] | []>([]);

  function handleInputOnChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (value === "") {
      setFilterUsers(users);
      return;
    }

    const filterData = users.filter((user: userDataType) =>
      user.email.includes(value)
    );

    setFilterUsers(filterData);
  }

  function handleSelectUser(userId: string) {
    navigate(`/user/${userId}`);
  }

  async function fetchAllUsers() {
    const request = await fetch("/api/bank/users");

    const response = await request.json();

    if (response.success === true) {
      setUser(response.allUsers);
      setFilterUsers(response.allUsers);
    } else if (response.error) {
      alert(response.error);
    }
  }
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className={styles.usersContainer}>
      <h1 className={styles.usersCount}>
        Currently, there is <span>{users.length}</span> registered user in our
        bank.
      </h1>
      <input
        type="text"
        placeholder="Search user by there email."
        onChange={handleInputOnChange}
      />
      <ul className={styles.allUsers}>
        {filterUsers.length > 0 &&
          filterUsers.map((user, index) => {
            return (
              <li
                key={index}
                style={
                  index === users.length - 1
                    ? { borderBottom: "1px solid var(--background-color)" }
                    : {}
                }
                onClick={() => handleSelectUser(user.id.toString())}
              >
                <p className={styles.name}>{user.email}</p>
                <p className={styles.balance}>{user.balance} ₹</p>
              </li>
            );
          })}
      </ul>
      {filterUsers.length === 0 && (
        <h5 className={styles.notfoundMessage}>User not found.</h5>
      )}
    </div>
  );
};

export default Users;
