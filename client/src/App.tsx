import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import HomeNav from "./_components/HomeNav/HomeNav";
import Signup from "./pages/auth/signup/Signup";
import SignIn from "./pages/auth/signin/Signin";
import { useContext, useEffect } from "react";
import { UserContext } from "./_context/userContext";
import Transactions from "./pages/transactions/Transactions";
import BankerLogin from "./pages/banker-pages/bankerLogin/BankerLogin";
import Users from "./pages/banker-pages/bankUsers/Users";
import UserInfo from "./pages/banker-pages/userInfo/UserInfo";
import NotFound from "./pages/notfound/NotFound";

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
        <Route
          path="/banker-login"
          element={user?.banker === true ? <Users /> : <BankerLogin />}
        />
        <Route
          path="/bank/users"
          element={user?.banker === true ? <Users /> : <BankerLogin />}
        />
        <Route
          path="/user/:userId"
          element={user?.banker === true ? <UserInfo /> : <BankerLogin />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
