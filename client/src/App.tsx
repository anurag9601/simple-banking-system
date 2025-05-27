import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import HomeNav from "./_components/HomeNav/HomeNav";
import Signup from "./pages/auth/signup/Signup";
import SignIn from "./pages/auth/signin/Signin";

function App() {
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
