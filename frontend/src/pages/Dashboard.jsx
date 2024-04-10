import React, { useState, useEffect } from "react";
import logo from "../assets/Dashboard/logo.png";
import { getAuth, signOut } from "firebase/auth";

import { initializeApp } from "firebase/app";
import coin from "../assets/Sidebar/coin.png";
import notif from "../assets/Dashboard/notif.svg";
import logout from "../assets/Dashboard/logout.svg";
import Leaderboard from "../components/Leaderboard";
import WasteBar from "../components/WasteBar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Activity from "../components/Activity";
import Calendar from "../components/CalendarProgress";
import Events from "../components/Events";
import "./dashboard.css";
const firebaseConfig = {
  apiKey: "AIzaSyC9f29nQHK-XJifHGXKZnaN_EhS2lHOkbA",
  authDomain: "aceofhacks-c3cc1.firebaseapp.com",
  projectId: "aceofhacks-c3cc1",
  storageBucket: "aceofhacks-c3cc1.appspot.com",
  messagingSenderId: "852739775747",
  appId: "1:852739775747:web:f30589fefd4aeea72e1d36",
  measurementId: "G-YXR4Y2EJVR",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("dry_wet");
  const [estimatedAmount, setEstimatedAmount] = useState("");
  const [pincode, setPincode] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [separateWaste, setSeparateWaste] = useState("");
  const [plasticType, setPlasticType] = useState("");
  const [collectQuantity, setCollectQuantity] = useState("");
  const [separateContainers, setSeparateContainers] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Log the selected plan type
    console.log("Selected Plan:", selectedPlan);
    try {
      const email = localStorage.getItem("email");
      const response = await axios.post(
        "http://localhost:3000/api/add",
        {
          email: email,
          dailyPlan: selectedPlan
        }
      );
  
      // Set user data in state
      setUsername(response.data.username);
  
      // Reset the form submission state and close the modal
      setSubmitted(true);
      closeModal();
    } catch (error) {
      // Handle errors
      console.error("Error fetching user data:", error);
    }
  };
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("email");
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await axios.post(
          "http://localhost:3000/api/getusername",
          {
            userEmail: email,
          }
        );

        // Set user data in state
        setUsername(response.data.username);
      } catch (error) {
        // Handle errors
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="font-euclid bg">
      <Sidebar />

      <div className="p-10 ml-[60px]">
        <div className="flex justify-between">
          <h1 className="text-3xl self-center py-1 ">Hey {username},</h1>

          <div className="flex gap-2">
            <button className="px-2 py-1 bg-[#ffff3100] rounded-xl font-bold text-[#000000] max-md:hidden">
              <img src={coin} alt="" className="w-8 inline-block m-1" />
              15 CBC
            </button>
            <button className="px-1 py-1 rounded-xl  max-md:hidden">
              <img src={notif} alt="" className="w-7 inline-block" />
            </button>
            <button className="py-1 rounded-xl" onClick={handleLogout}>
              <img
                src={logout}
                alt=""
                className="w-7 mt-[-4.5px] inline-block"
              />
            </button>
            {/* <button
              className="p-3 rounded-xl bg-[#f9d85a] font-bold"
              onClick={handleUserInfo}
            >
              <span className="lg:inline-block hidden">info</span>
            </button> */}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-full">
            <div>
              <h1 className="text-lg font-euclid-light text-[#494848] self-center mb-5">
                How are you doing today?
              </h1>
              <button
                className="text-xl rounded-xl font-bold text-[#8d278a] bg-[#ffe3fe] p-3 mb-5"
                onClick={openModal}
              >
                Register for waste disposal
              </button>
              <h1 className="font-bold text-2xl">My Progress</h1>
            </div>
            <div className="flex gap-10 max-xl:flex-col">
              <div className="my-5 w-[45rem] max-lg:w-[40rem]  max-md:w-[35rem]   max-sm:w-[22rem]">
                <Leaderboard id={6} />
              </div>
              <div className="my-5 w-[43rem] max-lg:w-[40rem]  max-md:w-[35rem]   max-sm:w-[22rem]">
                <WasteBar />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-10 justify-evenly max-xl:flex-col">
          <div>
            <div className="inline-block w-2 border-5 bg-green-500 rounded-xl h-2 mx-2 mb-1"></div>
            <h1 className="font-bold text-2xl mb-5 inline-block self-center">
              Activity{" "}
            </h1>
            <Activity />
          </div>

          <div>
            <h1 className="font-bold text-2xl mb-5 inline-block self-center">
              Your Activity{" "}
            </h1>
            <Calendar />
          </div>

          <div>
            <div className="inline-block w-2 border-5 bg-green-500 rounded-xl h-2 mx-2 mb-1"></div>
            <h1 className="font-bold text-2xl mb-5 inline-block self-center">
              Events{" "}
            </h1>
            <Events />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-1/2 h-[90%] max-lg:w-3/4 relative">
            <div className="scroll-div">
              <h2 className="text-2xl font-bold mb-4">
                Register for Waste Disposal
              </h2>
              {/* Form Components */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="plan" className="block font-semibold">
                    Choose a Plan
                  </label>
                  <select
                    id="plan"
                    name="plan"
                    className="block w-full border-black border rounded-lg p-2"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                  >
                    <option value="dry_wet">
                      Dry waste, wet waste segregation
                    </option>
                    <option value="plastic">Plastic collection</option>
                    <option value="biowaste">Biowaste</option>
                    <option value="e_waste">E-waste</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="amount" className="block font-semibold">
                    Estimated amount of Waste (in kg) per week
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    step="0.1"
                    className="block w-full border-black border rounded-lg p-2"
                    value={estimatedAmount}
                    onChange={(e) => setEstimatedAmount(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block font-semibold">
                    Pincode
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    className="block w-full border-black border rounded-lg p-2"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  ></textarea>
                </div>

                {/* Additional Questions */}
                <div>
                  <label htmlFor="waste-type" className="block font-semibold">
                    Type of Waste Generated
                  </label>
                  <input
                    type="text"
                    id="waste-type"
                    name="waste-type"
                    className="block w-full border-black border rounded-lg p-2"
                    value={wasteType}
                    onChange={(e) => setWasteType(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="separate-waste"
                    className="block font-semibold"
                  >
                    Do you separate dry waste and wet waste?
                  </label>
                  <select
                    id="separate-waste"
                    name="separate-waste"
                    className="block w-full border-black border rounded-lg p-2"
                    value={separateWaste}
                    onChange={(e) => setSeparateWaste(e.target.value)}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="plastic-type" className="block font-semibold">
                    Type of Plastics Produced
                  </label>
                  <input
                    type="text"
                    id="plastic-type"
                    name="plastic-type"
                    className="block w-full border-black border rounded-lg p-2"
                    value={plasticType}
                    onChange={(e) => setPlasticType(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="collect-quantity"
                    className="block font-semibold"
                  >
                    Will you be able to collect a certain quantity over time?
                  </label>
                  <select
                    id="collect-quantity"
                    name="collect-quantity"
                    className="block w-full border-black border rounded-lg p-2"
                    value={collectQuantity}
                    onChange={(e) => setCollectQuantity(e.target.value)}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="separate-containers"
                    className="block font-semibold"
                  >
                    Do you have separate containers?
                  </label>
                  <select
                    id="separate-containers"
                    name="separate-containers"
                    className="block w-full border-black border rounded-lg p-2"
                    value={separateContainers}
                    onChange={(e) => setSeparateContainers(e.target.value)}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {/* Time Slot */}
                <div>
                  <label htmlFor="time-slot" className="block font-semibold">
                    Choose Time Slot
                  </label>
                  <select
                    id="time-slot"
                    name="time-slot"
                    className="block w-full border-black border rounded-lg p-2"
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  >
                    <option value="7-8">7am - 8am</option>
                    <option value="8-9">8am - 9am</option>
                    <option value="9-10">9am - 10am</option>
                    <option value="10-11">10am - 11am</option>
                    <option value="11-12">11am - 12pm</option>
                    <option value="12-13">12pm - 1pm</option>
                    <option value="13-14">1pm - 2pm</option>
                    <option value="14-15">2pm - 3pm</option>
                    <option value="15-16">3pm - 4pm</option>
                    <option value="16-17">4pm - 5pm</option>
                    <option value="17-18">5pm - 6pm</option>
                    <option value="18-19">6pm - 7pm</option>
                    {/* Add more time slot options as needed */}
                  </select>
                </div>

                {/* Buttons */}
                <div className="text-right absolute right-5 bottom-10">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold ml-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
