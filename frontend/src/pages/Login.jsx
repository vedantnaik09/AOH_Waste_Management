import React, { useState, useEffect } from "react";
import sidebanner from "../assets/Login/sidebanner.jpeg";

import header from "../assets/Landing/header.png";


import fb from "../assets/Login/fb.png";
import google from "../assets/Login/google.webp";
import { initializeApp } from "firebase/app";
import './login.css'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate for redirection

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9f29nQHK-XJifHGXKZnaN_EhS2lHOkbA",
  authDomain: "aceofhacks-c3cc1.firebaseapp.com",
  projectId: "aceofhacks-c3cc1",
  storageBucket: "aceofhacks-c3cc1.appspot.com",
  messagingSenderId: "852739775747",
  appId: "1:852739775747:web:f30589fefd4aeea72e1d36",
  measurementId: "G-YXR4Y2EJVR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get the navigate function for redirection

  // Inside your handleRegister function
  const handleRegister = async () => {
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Register user in Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Log user details
      console.log("Registered user:", {
        email: user.email,
        dob: dob,
        firstName: firstName,
        lastName: lastName,
        // Add more details as needed
      });

      // Save user data to backend
      await axios.post("http://localhost:3000/api/auth/register", {
        email,
        password,
        firstName,
        lastName,
        dob,
      });

      // Now you can redirect to dashboard
      navigate("/metamasklogin");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    setError(null);

    try {
      // Send login data to backend
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(response);
      localStorage.setItem("email", email);
      // If login is successful on the backend
      if (response.status === 200) {
        navigate("/metamasklogin"); // Redirect to dashboard on successful login
      } else {
        setError("Login failed"); // Display error message if login fails
      }
    } catch (error) {
      setError("Login failed"); // Display error message if login fails
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log(user);
      navigate("/dashboard"); // Redirect to dashboard on successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFacebookRegister = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log(user);
      navigate("/dashboard"); // Redirect to dashboard on successful registration
    } catch (error) {
      setError(error.message);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover" style={{backgroundImage:`url(${header})`}}>
      <div className="w-[80%]  h-[90%] max-md:[90%] flex rounded-lg shadow-md right ">
      <div
          className="w-1/2  h-full bg-cover bg-center rounded-r-lg max-md:hidden"
          style={{ backgroundImage: `url(${sidebanner})` }}
        ></div>

<div className="flex h-fit min-h-fit flex-col p-5 mx-auto w-1/2 max-md:w-full">
          <h2 className="text-3xl mt-10 mb-5 text-center font-light text-white">
            Login...
          </h2>
          <div className="mb-4 flex justify-center">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-3/4  p-2  rounded-md"
            />
          </div>
          <div className="mb-4 flex justify-center">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-3/4  p-2  rounded-md"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-3/4  p-2  rounded-xl mx-auto bg-black text-white text-bold text-xl"
          >
            Sign In
          </button>
          <p className="text-center my-5 text-[system-ui] font-thin text-gray-300">
            or <span className="font-normal text-xl">Continue</span> with
          </p>
          <div className="flex mx-auto gap-4 mt-3">
            <button
              onClick={handleGoogleRegister}
              className="border-2 border-black bg-[white] p-2 rounded-lg"
            >
              <img src={google} alt="" className="w-14"/>
            </button>
            <button
              onClick={handleFacebookRegister}
              className="border-2 border-black bg-white p-2 rounded-lg"
            >
              <img src={fb} alt="" className="w-14"/>
            </button>
          </div>
          <p className="text-lg  text-center mt-7 text-gray-300">
            Don't have an account?{" "}
            <button className="">
              <Link to="/register" className="font-bold">Register here</Link>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
