import { useState } from "react";
import Navbar from "./Navbar";
import useRenterLogin from "../../hooks/renter/useRenterLogin";
import Styles from './Login.module.css';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const { error, loading, loginRenter } = useRenterLogin();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (loginInfo.email === '' || loginInfo.password === '') {
      alert('Please enter email and password');
      return;
    }
    loginRenter(loginInfo.email, loginInfo.password);
  };

  return (
    <div className={Styles.loginContainer}>
      <Navbar />
      <form className={Styles.loginForm}>
        <h1 className={Styles.loginTitle}>Login</h1>
        <div className={Styles.inputGroup}>
          <label className={Styles.loginLabel}>Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            className={Styles.loginInput}
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, email: e.target.value });
            }}
            value={loginInfo.email}
          />
        </div>
        <div className={Styles.inputGroup}>
          <label className={Styles.loginLabel}>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className={Styles.loginInput}
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, password: e.target.value });
            }}
            value={loginInfo.password}
          />
        </div>
        {error && <div className={Styles.error}>{error}</div>}
        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
          disabled={loading}
          className={Styles.loginButton}
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;