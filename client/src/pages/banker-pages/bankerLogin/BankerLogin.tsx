import React, { useContext, type FormEvent } from "react";
import styles from "./BankerLogin.module.css";
import Loading from "../../../_components/Loading/Loading";
import { UserContext } from "../../../_context/userContext";

const BankerLogin = () => {
  const { user, setUser } = useContext(UserContext);

  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = React.useState<boolean>(false);

  async function handleBankerFormSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    const request = await fetch("/api/auth/banker", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    });

    const response = await request.json();

    if (response.success) {
      setUser(response.user);
      window.location.href = "/bank/users";
    } else if (response.error) {
      alert(response.error);
    }
    setLoading(false);
  }

  console.log(user);

  return (
    <div className={styles.signInContainer}>
      <div className={styles.signInFormContainer}>
        <h3>Banker Login</h3>
        <h5 className={styles.loginInstuctions}>
          This application is currently running in testing mode. Use the
          credentials below to log in and explore the features also except login
          page only backer login user can access other routers related to backer
          login:
          <br />
          email: anuragmishrap13@gmail.com password: anurag
        </h5>
        <form
          className={styles.manualsignInForm}
          onSubmit={handleBankerFormSubmit}
        >
          <input type="email" placeholder="email" ref={emailRef} required />
          <input
            type="password"
            placeholder="password"
            ref={passwordRef}
            required
          />
          <button type="submit" disabled={loading}>
            {loading === true ? <Loading /> : "Banker Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankerLogin;
