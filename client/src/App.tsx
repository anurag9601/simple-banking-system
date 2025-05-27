import { Route, Routes, useParams } from "react-router-dom";
import styles from "./App.module.css";
import HomeNav from "./_components/HomeNav/HomeNav";
import Signup from "./pages/auth/signup/Signup";
import SignIn from "./pages/auth/signin/Signin";
import { useContext, useEffect } from "react";
import { UserContext } from "./_context/userContext";

function App() {
  const { user, setUser } = useContext(UserContext);

  async function fetchUserDataFromServer() {
    const request = await fetch("/api/auth/me");

    const response = await request.json();

    if (response.user) {
      setUser(response.user);
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
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
