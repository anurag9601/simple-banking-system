import React, { type FormEvent } from "react";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../../_components/Loading/Loading";

const Signup = () => {
  const navigate = useNavigate();

  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = React.useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleUserManualSignup = async (e: FormEvent) => {
    e.preventDefault();

    if (passwordRef.current!.value.length < 6) {
      alert("Length of password must be 6 or more than 6.");
      return;
    }

    if (passwordRef.current!.value !== confirmPasswordRef.current!.value) {
      alert("Passwords are not matched.");
      return;
    }

    setLoading(true);

    const request = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    });

    const response = request.json();

    response.then((e) => {
      if (e.success === true) {
        window.location.href = "/";
      } else {
        alert("Something went wrong");
        console.log(e);
      }
    });

    setLoading(false);
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.signUpFormContainer}>
        <h3>Sign up</h3>

        <form
          className={styles.manualSignupForm}
          onSubmit={handleUserManualSignup}
        >
          <input type="email" placeholder="email" ref={emailRef} required />
          <input
            type="password"
            placeholder="password"
            ref={passwordRef}
            required
          />
          <input
            type="password"
            placeholder="confirm password"
            ref={confirmPasswordRef}
            required
          />
          <button type="submit" disabled={loading}>
            {loading === true ? <Loading /> : "Sign up"}
          </button>
        </form>
        <span
          onClick={() => navigate("/sign-in")}
          className={styles.signinRedirect}
        >
          Already have an account?
        </span>
      </div>
    </div>
  );
};

export default Signup;
