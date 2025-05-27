import React, { type FormEvent } from "react";
import styles from "./signIn.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../../_components/Loading/Loading";

const SignIn = () => {
  const navigate = useNavigate();

  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = React.useState<boolean>(false);

  async function handleUserManualSignin(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    const request = await fetch("/api/user/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    });

    const response = await request.json();

    if (response.success) {
      navigate("/");
    } else {
      console.log(response);
    }

    setLoading(false);
  }
  
  return (
    <div className={styles.signInContainer}>
      <div className={styles.signInFormContainer}>
        <h3>Sign In</h3>

        <form
          className={styles.manualsignInForm}
          onSubmit={handleUserManualSignin}
        >
          <input type="email" placeholder="email" ref={emailRef} required />
          <input
            type="password"
            placeholder="password"
            ref={passwordRef}
            required
          />
          <button type="submit" disabled={loading}>
            {loading === true ? <Loading /> : "Sign in"}
          </button>
        </form>
        <span
          onClick={() => navigate("/sign-up")}
          className={styles.signInRedirect}
        >
          Don't have an account?
        </span>
      </div>
    </div>
  );
};

export default SignIn;
