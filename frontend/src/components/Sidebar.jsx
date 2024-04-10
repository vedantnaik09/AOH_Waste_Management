import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setIndex } from '../slices/generalSlice';
import waste from '../assets/Sidebar/waste.svg';
import home from '../assets/Sidebar/home.svg';
import book from '../assets/Sidebar/book.svg';
import qrcodelogo from '../assets/Sidebar/qrcodelogo.svg';
import map from '../assets/Sidebar/map.svg';
import './sidebar.css';
import logo from "../assets/Sidebar/logomain.png";

const Sidebar = () => {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state) => state.counter.index);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const email = localStorage.getItem("email");
  const isAdmin = email === 'admin@gmail.com'; // Check if the user is admin

  const toggleUpdateForm = () => {
    setShowUpdateForm(!showUpdateForm);
  };

  const handleUsernameUpdate = () => {
    // Logic to update username
  };

  const handleEmailUpdate = () => {
    // Logic to update email
  };

  const handlePasswordUpdate = () => {
    // Logic to update password
  };

  return (
    <div className='fixed top-0 left-0 h-screen w-16 sidebar flex flex-col'>
      <Link to="/dashboard" className='my-5 w-10 mx-auto' onClick={() => handleLinkClick(1)}>
        <img src={logo} alt="" />
      </Link>
      <Link to="/dashboard" className='mt-10 w-7 mx-auto ' onClick={() => handleLinkClick(1)}>
        <img src={home} alt="" />
        {currentIndex === 1 && <div className='w-7 border-2 border-[#292929] my-1 '></div>}
      </Link>
      <Link to="/learn" className='mt-10 w-7 mx-auto' onClick={() => handleLinkClick(2)}>
        <img src={book} alt="" />
        {currentIndex === 2 && <div className='w-7 border-2 border-[#292929] my-1 '></div>}
      </Link>
      <Link to="/qrcode" className='mt-10 w-7 mx-auto' onClick={() => handleLinkClick(3)}>
        <img src={qrcodelogo} alt="" />
        {currentIndex === 3 && <div className='w-7 border-2 border-[#292929] my-1 '></div>}
      </Link>
      <Link to="/location" className='mt-10 w-9 mx-auto' onClick={() => handleLinkClick(4)}>
        <img src={map} alt="" />
        {currentIndex === 4 && <div className='w-9 border-2 border-[#292929] my-1 '></div>}
      </Link>
      {isAdmin && ( // Only render the link if the user is not admin
        <Link to="/scan" className='mt-10 w-7 mx-auto' onClick={() => handleLinkClick(5)}>
          <img src={qrcodelogo} alt="" />
          {currentIndex === 5 && <div className='w-7 border-2 border-[#292929] my-1 '></div>}
        </Link>
      )}

      <button className='mt-10  mx-auto bottom-3 absolute flex justify-center w-full' onClick={toggleUpdateForm}>
        <img src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-File.png" alt="" className='w-9' />
      </button>

      {showUpdateForm && (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-50 flex justify-center items-center z-50 ">
          <div className="bg-white p-8 rounded-lg w-1/2 h-[90%] max-lg:w-3/4 relative">
            <h2 className="text-2xl font-bold mb-4">
              Update your profile details
            </h2>
            {/* Form Components */}
            <form className="space-y-4 text-[system-ui] font-thin">
              <div className="flex flex-col">
                <label htmlFor="username" className="mb-2">Username:</label>
                <input type="text" id="username" className="border border-gray-300 px-3 py-2 rounded-lg" />
                <button className="mt-2 px-4 py-2 w-fit bg-black text-white rounded-lg font-semibold" onClick={handleUsernameUpdate}>Update</button>
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2">Email:</label>
                <input type="email" id="email" className="border border-gray-300 px-3 py-2 rounded-lg" />
                <button className="mt-2 px-4 py-2 w-fit bg-black text-white rounded-lg font-semibold" onClick={handleEmailUpdate}>Update</button>
              </div>
              <div className="flex flex-col">
                <label htmlFor="prevPassword" className="mb-2">Previous Password:</label>
                <input type="password" id="prevPassword" className="border border-gray-300 px-3 py-2 rounded-lg" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="newPassword" className="mb-2">New Password:</label>
                <input type="password" id="newPassword" className="border border-gray-300 px-3 py-2 rounded-lg" />
                <button className="mt-2 px-4 py-2 w-fit bg-black text-white rounded-lg font-semibold" onClick={handlePasswordUpdate}>Update</button>
              </div>
              <div className="text-right absolute right-5 bottom-10">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold"
                  onClick={toggleUpdateForm}
                >
                  Close
                </button>
                
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
