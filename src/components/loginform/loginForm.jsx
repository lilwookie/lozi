
import styles from './login.module.css';

const LoginSplit = ({ onSubmit, title = 'Login' }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className={styles.loginWrapper}>
    <div className={styles.loginCard}>
      <div className={styles.loginLeft}>
        <h2 className={styles.heading}>{title}</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <br />
          <p className={styles.passwordReset}>
            forgot password? click <a href="#">here!</a>
          </p>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
      <div className={styles.loginRight}>
        <img
          src="https://cdn.pixabay.com/photo/2015/11/06/11/48/multi-family-home-1026483_1280.jpg"
          alt="login"
        />
      </div>
    </div>
  </div>
  );
};

export default LoginSplit;
