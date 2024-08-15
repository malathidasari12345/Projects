import React, { useEffect, useState } from 'react';
import { logo } from "../assets/img";
import UserAuth from '../components2/UserAuth';
import { FaEnvelope } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    validateInput();
  }, [email, password]);

  const validateInput = () => {
    let valid = true;
    if (email && !email.includes('@')) {
      setEmailError("Include @ for email");
      valid = false;
    } else {
      setEmailError("");
    }
    if (password && password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    } else {
      setPasswordError("");
    }
    setIsFormValid(valid && email && password); 
    return valid;
  };

  // to reset fields
  const resetFields = () => {
    setEmail("");
    setPassword("");
  };

  // for signup
  const createNewUser = async () => {
    if (!validateInput()) return;

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      if (userCred) {
        console.log("User created successfully:", userCred);
        setAlert(true);
        setAlertSuccess(true);
        setAlertMsg("User created successfully!");
        resetFields();
        setTimeout(()=>{
          navigate('/home/projects'); 
        },2000)
     
      }
    } catch (err) {
      setAlert(true);
      setAlertSuccess(false);
      if (err.code === 'auth/email-already-in-use') {
        setAlertMsg("User already exists with this email.");
      } else {
        setAlertMsg("Please enter valid details.");
      }
    }
  };

  // for login
  const LoginWithEmail = async () => {
    if (!validateInput()) return;

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCred);
      setAlert(true);
      setAlertSuccess(true);
      setAlertMsg("Login Successful!");
      resetFields();
      navigate('/home/projects'); 
    } 
    catch (err) {
      setAlert(true);
      setAlertSuccess(false);
      if (err.code === 'auth/wrong-password') {
        setAlertMsg('Password is Incorrect');
      } else if (err.code === 'auth/user-not-found') {
        setAlertMsg('Invalid Details, User not found');
      } else {
        setAlertMsg('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <img src={logo} alt="Logo" className='object-contain h-auto w-20 py-4 opacity-50' />
      <div className='w-full flex flex-col items-center justify-center py-0 px-4'>
        <div className='px-8 w-full gap-3 md:w-auto py-9 md:h-auto
          rounded-xl bg-secondary shadow-md flex flex-col items-center justify-center'>
          {/* email, password, and button group */}
          <div className='w-full mt-4 flex flex-col gap-4'> 
            {/* email */}
            <div>
              <UserAuth
                placeholder="Email"
                ispass={false}
                key="email"
                setStatefunction={setEmail}
                Icon={FaEnvelope}
                className={`w-full px-4 py-2 rounded-md ${emailError ? 'bg-red-200' : 'bg-white'}`}
              />
              {emailError && <p className='text-red-500 text-sm'>{emailError}</p>}
            </div>
            {/* password */}
            <div>
              <UserAuth
                placeholder="Password"
                ispass={true}
                key="password"
                setStatefunction={setPassword}
                Icon={MdPassword}
                className={`w-full px-4 py-2 rounded-md ${passwordError ? 'bg-red-200' : 'bg-white'}`}
              />
              {passwordError && <p className='text-red-500 text-sm'>{passwordError}</p>}
            </div>
            {/* login/signup button */}
            <div>
              {!login ? (
                <div 
                  onClick={createNewUser}
                  className={`flex items-center justify-center w-full py-3 rounded-xl
                    hover:bg-emerald-400 cursor-pointer bg-emerald-500 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!isFormValid}
                >
                  <p className='text-xl text-white'>Sign Up</p>
                </div>
              ) : (
                <div 
                  onClick={LoginWithEmail}
                  className={`flex items-center justify-center w-full py-3 rounded-xl
                    hover:bg-emerald-400 cursor-pointer bg-emerald-500 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!isFormValid}
                >
                  <p className='text-xl text-white'>Login</p>
                </div>
              )}
            </div>
          </div>
          {/* alert */}
          {alert && (
            <p className={`text-${alertSuccess ? 'emerald' : 'red'}-500`}>{alertMsg}</p>
          )}

          {/* text section */}
          {!login ? (
            <p className='text-sm text-primaryText flex items-center justify-center gap-3'>Already have an account?
              <span onClick={() => setLogin(!login)}
                className='text-emerald-500 cursor-pointer'>Login Here</span>
            </p>
          ) : (
            <p className='text-sm text-primaryText flex items-center justify-center gap-3'>Doesn't have an account?
              <span onClick={() => setLogin(!login)}
                className='text-emerald-500 cursor-pointer'>Create here</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
