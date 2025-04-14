import { useRef, useState } from 'react';
import Navbar from './Navbar';
import useRenterSignUp from '../../hooks/renter/useRenterSignUp';
import Styles from './SignUp.module.css';

type signUpInfo = {
  firstName: string;
  email: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  profilePicture: File | null;
};

const SignUp = () => {
  const [signupInfo, setSignUpInfo] = useState<signUpInfo>({
    firstName: '',
    email: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    profilePicture: null,
  });
  const { error: formError, loading, signRenterUp } = useRenterSignUp();
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const signUp = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setError('');
    if (
      signupInfo.firstName === '' ||
      signupInfo.lastName === '' ||
      signupInfo.email === '' ||
      signupInfo.password === '' ||
      signupInfo.address === '' ||
      signupInfo.phone === '' ||
      signupInfo.profilePicture === null
    ) {
      setError('Please fill all fields');
      return;
    }
    if (signupInfo.password !== signupInfo.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!signupInfo.profilePicture.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      return;
    }
    if (signupInfo.profilePicture.size > 2 * 1024 * 1024) {
      setError('File size exceeds 2MB limit');
      return;
    }

    const form = new FormData();
    form.append('firstName', signupInfo.firstName);
    form.append('lastName', signupInfo.lastName);
    form.append('email', signupInfo.email);
    form.append('password', signupInfo.password);
    form.append('phone', signupInfo.phone);
    form.append('address', signupInfo.address);
    if (signupInfo.profilePicture instanceof File) {
      form.append('profilePicture', signupInfo.profilePicture);
    } else {
      setError('Invalid profile picture. It should be a File object.');
      return;
    }
    await signRenterUp(form);
    setError(formError);
    setSignUpInfo({
      firstName: '',
      email: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      phone: '',
      address: '',
      profilePicture: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset file input field
    }
  };

  return (
    <div className={Styles.signUpContainer}>
      <Navbar />
      <form className={Styles.signUpForm}>
        <h1 className={Styles.signUpTitle}>Sign Up</h1>
        <div className={Styles.inputGroup}>
          <label className={Styles.signUpLabel}>First Name</label>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            className={Styles.signUpInput}
            onChange={(e) => {
              setSignUpInfo({ ...signupInfo, firstName: e.target.value });
            }}
            value={signupInfo.firstName}
          />
        </div>
        <div className={Styles.inputGroup}>
          <label className={Styles.signUpLabel}>Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            className={Styles.signUpInput}
            onChange={(e) => {
              setSignUpInfo({ ...signupInfo, lastName: e.target.value });
            }}
            value={signupInfo.lastName}
          />
        </div>
        <div className={Styles.inputGroup}>
          <label className={Styles.signUpLabel}>Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            className={Styles.signUpInput}
            onChange={(e) => {
              setSignUpInfo({ ...signupInfo, email: e.target.value });
            }}
            value={signupInfo.email}
          />
        </div>
        <div className={Styles.inputGroup}>
          <label className={Styles.signUpLabel}>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className={Styles.signUpInput}
            onChange={(e) => {
              setSignUpInfo({ ...signupInfo, password: e.target.value });
            }}
            value={signupInfo.password}
          />
        </div>
        <div className={Styles.inputGroup}>
          <label className={Styles.signUpLabel}>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className={Styles.signUpInput}
            onChange={(e) => {
              setSignUpInfo({ ...signupInfo, confirmPassword: e.target.value });
            }}
            value={signupInfo.confirmPassword}
          />
        </div>
        <div className={Styles.inputGroup}>
          <label className={Styles.signUpLabel}>Address</label>
          <input
            type="text"
            placeholder="Address"
            name="address"
            className={Styles.signUpInput}
            onChange={(e) => {
              setSignUpInfo({ ...signupInfo, address: e.target.value });
            }}
            value={signupInfo.address}
          />
        </div>
        <div className={Styles.inputGroup}>
          <label className={Styles.signUpLabel}>Phone</label>
          <input
            type="text"
            placeholder="Phone"
            name="phone"
            className={Styles.signUpInput}
            onChange={(e) => {
              setSignUpInfo({ ...signupInfo, phone: e.target.value });
            }}
            value={signupInfo.phone}
          />
        </div>
        <div className={Styles.inputGroup}>
          <label className={Styles.signUpLabel}>Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            className={Styles.fileInput}
            ref={fileInputRef}
            onChange={(e) => {
              if (e.target.files != null) {
                setSignUpInfo({ ...signupInfo, profilePicture: e.target.files[0] });
              } else {
                setError('Please upload image');
              }
            }}
          />
        </div>
        {error && <div className={Styles.error}>{error}</div>}
        <button
          onClick={(e) => {
            signUp(e);
          }}
          disabled={loading}
          className={Styles.signUpButton}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {formError && <div className={Styles.error}>{formError}</div>}
      </form>
    </div>
  );
};

export default SignUp;