import React, { useContext } from "react";
import styles from "./HomeNav.module.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../_context/userContext";

const HomeNav: React.FC = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const handleUserSignOut = async () => {
    const request = await fetch("/api/auth/sign-out");

    const response = request.json();

    response.then((e) => {
      if (e.success == true) {
        setUser(null);
      } else {
        console.log(e);
        alert(e.error);
      }
    });
  };

  return (
    <div className={styles.homenavContainer}>
      <div className={styles.homenavLeft}>
        <p className={styles.logoContainer} onClick={() => navigate("/")}>
          SBS
        </p>
      </div>
      <div className={styles.homenavRight}>
        <div className={styles.createUserOptions}>
          {!user ? (
            <>
              <p onClick={() => navigate("/sign-in")}>Sign in</p>
              <hr />
              <button
                className={styles.signupBtn}
                onClick={() => {
                  navigate("sign-up");
                }}
              >
                Sign up
              </button>{" "}
            </>
          ) : (
            <button className={styles.signoutBtn} onClick={handleUserSignOut}>
              Sign out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
