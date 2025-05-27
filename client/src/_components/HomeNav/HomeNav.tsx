import React from "react";
import styles from "./HomeNav.module.css";
import { useNavigate } from "react-router-dom";

const HomeNav: React.FC = () => {
  const navigate = useNavigate();

  const handleUserSignOut = async () => {
    const request = await fetch("/api/user/sign-out");

    const response = request.json();

    response.then((e) => {
      if (e.success == true) {
      } else {
        console.log(e);
      }
    });
  };

  return (
    <div className={styles.homenavContainer}>
      <div className={styles.homenavLeft}>
        <p className={styles.logoContainer} onClick={() => navigate("/")}>
          Simple banking system
        </p>
      </div>
      <div className={styles.homenavRight}>
        <div className={styles.createUserOptions}>
          <p onClick={() => navigate("/sign-in")}>Sign in</p>
          <hr />
          <button
            className={styles.signupBtn}
            onClick={() => {
              navigate("sign-up");
            }}
          >
            Sign up
          </button>
          <button className={styles.signoutBtn} onClick={handleUserSignOut}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
