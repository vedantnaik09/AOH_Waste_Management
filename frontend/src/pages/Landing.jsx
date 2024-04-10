import React from "react";

import header from "../assets/Landing/header.png";
import bin from "../assets/Landing/bin.webp";
import bottle from "../assets/Landing/bottle.png";
import kiwi from "../assets/Landing/kiwi.webp";
import mango from "../assets/Landing/mango.webp";
import straw from "../assets/Landing/straw.webp";
import mobile from "../assets/Landing/mobile.png";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import logo from '../assets/Sidebar/logomain.png'

import './landing.css'

const Landing = () => {
  return (
    <div
      className="leading-normal tracking-normal min-h-[100vh]  text-indigo-400 p-6 bg-cover bg-fixed max-xl:min-h-[180vh] select-none"
      style={{ backgroundImage: `url(${header})` }}
    >
      <div className="w-full container mx-auto">
        <div className="w-full flex items-center justify-between">
          <a
            className="flex items-center text-green-300 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href="#"
          >
            <img src={logo} alt="" className="w-10"/>GreenLedger
          </a>
        </div>
      </div>

      <div className="container pt-12  mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
            Turning Trash into&nbsp;
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
              Treasure:&nbsp;
            </span>
            Your Sustainable&nbsp;
            <span className="bg-clip-text text-green-500">Waste Solution</span>
          </h1>

          <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
            Make the right decision.. Compete with your locality!
          </p>

          <form className="invite opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-blue-300 py-2 font-bold mb-2"
                htmlFor="emailaddress"
              >
                Invite us to your locality!
              </label>
              <input
                className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                id="emailaddress"
                type="text"
                placeholder="you@somewhere.com"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                className="bg-gradient-to-r from-red-500 to-yellow-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                type="button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <motion.div
          className="w-1/2 h-[200x] mt-[-500px] xl:mt-[35vh] relative md:mt-15 max-xl:top-[650px] max-xl:left-[80px] max-lg:left-[-65px] max-md:left-[-280px] max-md:top-[900px] max-sm:left-[-300px] max-sm:top-[900px]  p-5"
         
          
          draggable="false"
        >
          <motion.img
          initial={{ rotate: 60, scale: 1 , y: -150}}
          animate={{ rotate: 30, scale: 1.1 , y: 0 }}
          transition={{ delay: 0.5 }}
           drag
           whileHover={{ scale: 1.05 }}
           dragSnapToOrigin="true"
           dragConstraints={{ left: 20, right: 20, top: 20, bottom: 20 }}
           dragElastic={0.25}
          src={bin} alt="" className="absolute mx-auto w-64 ml-60 top-[-9rem]" draggable="false"></motion.img>

          <motion.img
          initial={{ rotate: 60, scale: 1 , y: -150}}
          animate={{ rotate: 260, scale: 1.1 , y: 0 }}
          transition={{ delay: 0.5 }}
           drag
           whileHover={{ scale: 1.05 }}
           dragConstraints={{ left: 20, right: 20, top: 20, bottom: 20 }}
           dragElastic={0.25}
          src={straw} alt="" className="absolute mx-auto w-20 ml-[15rem] top-[-15rem]" draggable="false"></motion.img>

          
          <motion.img
          initial={{ rotate: 60, scale: 1 , y: -150}}
          animate={{ rotate: 0, scale: 1.1 , y: 0 }}
          transition={{ delay: 0.5 }}
           drag
           whileHover={{ scale: 1.05 }}
           dragConstraints={{ left: 20, right: 20, top: 20, bottom: 20 }}
           dragElastic={0.25}
          src={straw} alt="" className="absolute mx-auto w-24 ml-[32rem] top-[-22rem]" draggable="false"></motion.img>

          
          <motion.img
          initial={{ rotate: 60, scale: 1 , y: -150}}
          animate={{ rotate: -150, scale: 1.05 , y: 0 }}
          transition={{ delay: 0.5 }}
           drag
           whileHover={{ scale: 1.05 }}
           dragConstraints={{ left: 20, right: 20, top: 20, bottom: 20 }}
           dragElastic={0.25}
          src={mango} alt="" className="absolute mx-auto w-16 ml-[27rem] top-[-1rem]" draggable="false"></motion.img>
          
          <motion.img
          initial={{ rotate: 60, scale: 1 , y: -150}}
          animate={{ rotate: 120, scale: 1.05 , y: 0 }}
          transition={{ delay: 0.5 }}
           drag
           whileHover={{ scale: 1.05 }}
           dragConstraints={{ left: 20, right: 20, top: 20, bottom: 20 }}
           dragElastic={0.25}
          src={mango} alt="" className="absolute mx-auto w-16 ml-[22rem] top-[-20rem]" draggable="false"></motion.img>
          
          <motion.img
          initial={{ rotate: 60, scale: 1 , y: -150}}
          animate={{ rotate: -150, scale: 1.08 , y: 0 }}
          transition={{ delay: 0.5 }}
           drag
           whileHover={{ scale: 1.05 }}
           dragConstraints={{ left: 20, right: 20, top: 20, bottom: 20 }}
           dragElastic={0.25}
          src={bottle} alt="" className="absolute mx-auto w-20 ml-[24rem] top-[-12rem]" draggable="false"></motion.img>
          
          <motion.img
          initial={{ rotate: 60, scale: 1 , y: -150}}
          animate={{ rotate: 180, scale: 1.3 , y: 0 }}
          transition={{ delay: 0.5 }}
           drag
           whileHover={{ scale: 1.05 }}
           dragConstraints={{ left: 20, right: 20, top: 20, bottom: 20 }}
           dragElastic={0.25}
          src={mobile} alt="" className="absolute mx-auto w-20 ml-[35rem] top-[-14rem]" draggable="false"></motion.img>
          
          <motion.img
          initial={{ rotate: 60, scale: 1 , y: -150}}
          animate={{ rotate: -30, scale: 1.01 , y: 0 }}
          transition={{ delay: 0.5 }}
           drag
           whileHover={{ scale: 1.05 }}
           dragConstraints={{ left: 20, right: 20, top: 20, bottom: 20 }}
           dragElastic={0.25}
          src={kiwi} alt="" className="absolute mx-auto w-20 ml-[35rem] top-[-7rem]" draggable="false"></motion.img>


        </motion.div>

        <div className="mx-auto md:pt-4 absolute top-0 right-4">
          <div className="flex w-full gap-2 text-xl justify-center md:justify-start pb-24 lg:pb-0 fade-in">
            <Link to="/login" className="p-4 ">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
