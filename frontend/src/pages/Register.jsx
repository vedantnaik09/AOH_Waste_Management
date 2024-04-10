import React, { useState, useEffect } from "react";

import header from "../assets/Landing/header.png";

import { initializeApp } from "firebase/app";
import sidebanner from "../assets/Login/sidebanner.jpeg";
import fb from "../assets/Login/fb.png";
import google from "../assets/Login/google.webp";
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
  // apiKey: "", Enter google api key
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

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [pincode, setPincode] = useState("");
  const [username, setUsername] = useState("");
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
        pincode: pincode, // Include pincode
        // Add more details as needed
      });

      // Save user data to backend
      await axios.post("http://localhost:3000/api/auth/register", {
        email,
        username,
        password,
        firstName,
        lastName,
        dob,
        pincode, // Include pincode
      });

      // Now you can redirect to dashboard
      localStorage.setItem("email", email);
      navigate("/metamasklogin");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    setError(null);

    try {
      // Send login data to backend
      await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      //   console.log(response)

      // If login is successful on the backend
      if (response.status === 200) {
        navigate("/dashboard"); // Redirect to dashboard on successful login
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

  return (
    <div className="flex min-h-[150vh] justify-center items-center h-screen bg-cover"  style={{backgroundImage:`url(${header})`}}>
      <div className="w-[80%]  h-[90%] max-md:[90%] flex rounded-lg shadow-md right ">
        
        <div className="flex h-fit min-h-fit flex-col p-5 mx-auto w-1/2 max-md:w-full">
          <h2 className="text-3xl mt-10 mb-5 text-center font-light text-white">
            Register
          </h2>
          <div className="mb-4 flex justify-center">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-3/4  p-2  rounded-md"
              required
            />
          </div>
          <div className="mb-4 flex justify-center">
            {" "}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-3/4  p-2  rounded-md"
              required
            />
          </div>
          <div className="mb-4 flex justify-center">
            {" "}
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-3/4  p-2  rounded-md"
              required
            />
          </div>
          <div className="mb-4 flex justify-center">
            {" "}
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-3/4  p-2  rounded-md"
              required
            />
          </div>
          <div className="mb-4 flex justify-center">
            {" "}
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-3/4  p-2  rounded-md"
              required
            />
          </div>
          <div className="mb-4 flex justify-center">
            {" "}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-3/4  p-2  rounded-md"
              required
            />
          </div>
          <div className="mb-4 flex justify-center">
            {" "}
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-3/4  p-2  rounded-md"
            />
          </div>
          <div className="mb-4 flex justify-center">
            {" "}
            <input
              type="number"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              inputMode="numeric" // Disable spinner controls
              className="w-3/4  p-2  rounded-md"
              required
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-3/4  p-2  rounded-xl mx-auto bg-black text-white text-bold text-xl"
          >
            Register
          </button>
          <p className="text-center my-5 text-[system-ui] font-thin text-gray-300">
            or <span className="font-normal text-xl">Continue</span> with
          </p>
          <div className="flex mx-auto gap-4 mt-3">
            <button
              onClick={handleGoogleRegister}
              className="border-2 border-black bg-[white] p-2 rounded-lg"
            >
              <img src={google} alt="" className="w-14" />
            </button>
            <button
              onClick={handleFacebookRegister}
              className="border-2 border-black bg-white p-2 rounded-lg"
            >
              <img src={fb} alt="" className="w-14" />
            </button>
          </div>

          <p className="text-lg  text-center mt-7 text-gray-300">
            Already have an account?{" "}
            <button className="">
              <Link to="/login" className="font-bold">Login here</Link>
            </button>
          </p>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        <div
          className="w-1/2  h-full bg-cover bg-center rounded-r-lg max-md:hidden"
          style={{ backgroundImage: `url(${sidebanner})` }}
        ></div>
      </div>
    </div>
  );
};

export default Register;
