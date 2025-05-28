import styles from "./NotFound.module.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFoundContainer}>
      <iframe
        src="https://lottie.host/embed/8a96e934-309e-4c45-954b-547e601d13a5/07EX70Oupo.lottie"
        style={{ border: "none", height: "200px" }}
      ></iframe>
      <p className={styles.redirectText} onClick={() => navigate("/")}>
        Back to home page
      </p>
    </div>
  );
};

export default NotFound;
