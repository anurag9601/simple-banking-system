import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loading}></div>
    </div>
  );
};

export default Loading;
