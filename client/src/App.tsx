import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import HomeNav from "./_components/HomeNav/HomeNav";
import Signup from "./pages/auth/signup/Signup";
import SignIn from "./pages/auth/signin/Signin";
import { useContext, useEffect } from "react";
import { UserContext } from "./_context/userContext";
import Transactions from "./pages/transactions/Transactions";

function App() {
  const { user, setUser } = useContext(UserContext);

  async function fetchUserDataFromServer() {
    const request = await fetch("/api/auth/me");

    const response = await request.json();

    if (response.user) {
      setUser(response.user);
      return;
    } else if (response.error) {
      alert(response.error);
    }
  }

  useEffect(() => {
    fetchUserDataFromServer();
  }, []);
  return (
    <div className={styles.appContainer}>
      <HomeNav />
      <Routes>
        <Route path="/sign-up" element={user ? <Transactions /> : <Signup />} />
        <Route path="/sign-in" element={user ? <Transactions /> : <SignIn />} />
        <Route path="/" element={user ? <Transactions /> : <SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
