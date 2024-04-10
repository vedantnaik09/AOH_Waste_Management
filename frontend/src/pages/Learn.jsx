import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {setIndex} from '../slices/generalSlice'

import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import biodegradable from "../assets/Learn/biodegradable.png";
import nonbio from "../assets/Learn/nonbio.png";
import recyclable from "../assets/Learn/recyclable.png";
import hazard from "../assets/Learn/hazard.png";
import ewaste from "../assets/Learn/ewaste.png";

import './learn.css'
const Learn = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIndex(2))
  }, [])
  
  return (
    <div className="font-euclid">
      <Sidebar />
      <div className="p-5 ml-[60px]">
        <h2 className="text-2xl font-bold mb-4">
          Waste Management and Recycling
        </h2>
        <p className="mb-4 text-[1.1rem]">
          Waste management involves handling, processing, and disposing of
          various types of waste in an environmentally friendly manner. Proper
          waste management helps reduce pollution and conserve resources. Here's
          how you can effectively manage waste:
        </p>

        <h3 className="text-[1.1rem] font-bold mb-2">
          1. Understanding Types of Waste
        </h3>
        <div className="mb-4 border-2 border-black rounded-xl p-5 bg-[#f0fcf9]">
          <h1 className="text-center text-2xl font-bold mb-4">
            Waste can be categorized into different types such as:
          </h1>
          <div className="flex justify-evenly text-xl max-lg:flex-col gap-2">
            <motion.div
              drag
              whileHover={{ scale: 1.05 }}
              dragSnapToOrigin="true"
              dragConstraints={{ left: 20, right: 20, top: 20, bottom: 20 }}
              dragElastic={0.25}
              transition={{ delay: 0.1 }}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              className="flex flex-col items-center gap-5"
            >
              <h1>Biodegradable Waste</h1>
              <img src={biodegradable} alt="" className="w-64 bio" draggable="false" />
            </motion.div>
            <motion.div
              drag
              whileHover={{ scale: 1.05 }}
              dragSnapToOrigin="true"
              dragConstraints={{ left: 20, right: 20, top: 20, bottom: 20 }}
              dragElastic={0.25}
              transition={{ delay: 0.1 }}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              className="flex flex-col items-center gap-5">
              <h1 className="text-center">Non-Biodegradable Waste</h1>
              <img src={nonbio} alt="" className="w-60 nbio" draggable="false"/>
            </motion.div>
            <motion.div
              drag
              whileHover={{ scale: 1.05 }}
              dragSnapToOrigin="true"
              dragConstraints={{ left: 20, right: 20, top: 20, bottom: 20 }}
              dragElastic={0.25}
              transition={{ delay: 0.1 }}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              className="flex flex-col items-center gap-5">
              <h1>Recyclable Waste</h1>
              <img src={recyclable} alt="" className="w-40 recy" draggable="false"/>
            </motion.div>
            <motion.div
              drag
              whileHover={{ scale: 1.05 }}
              dragSnapToOrigin="true"
              dragConstraints={{ left: 20, right: 20, top: 20, bottom: 20 }}
              dragElastic={0.25}
              transition={{ delay: 0.1 }}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              className="flex flex-col items-center gap-5">
              <h1>Hazardous Waste</h1>
              <img src={hazard} alt="" className="w-48 haz" draggable="false"/>
            </motion.div>
            <motion.div
              drag
              whileHover={{ scale: 1.05 }}
              dragSnapToOrigin="true"
              dragConstraints={{ left: 20, right: 20, top: 20, bottom: 20 }}
              dragElastic={0.25}
              transition={{ delay: 0.1 }}
              dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
              className="flex flex-col items-center gap-5">
              <h1 className="text-center">Electronic Waste </h1>
              <img src={ewaste} alt="" className="w-44 ewaste" draggable="false"/>
            </motion.div>
          </div>
        </div>

        <div className="mb-4 bg-gray-200 p-5 rounded-xl">
        <h3 className="text-[1.2rem] font-bold mb-2">2. Waste Separation</h3>        
          Proper waste separation is essential for effective recycling. Follow
          these steps:
          <ul className="list-disc ml-8 sep">
            <li>
              Separate recyclable materials like paper, plastic, and glass from
              non-recyclable waste.
            </li>
            <li>
              Dispose of hazardous waste separately to prevent environmental
              contamination.
            </li>
            <li>
              Consider composting organic waste like food scraps and yard
              trimmings.
            </li>
          </ul>
        </div>
        <div className="mb-4 bg-gray-200 p-5 rounded-xl rec">
        <h3 className="text-[1.2rem] font-bold mb-2">3. Recycling Practices</h3>
        
          Recycling plays a crucial role in waste management. Here are some
          recycling practices:
          <ul className="list-disc ml-8">
            <li>Reduce waste by opting for reusable products and packaging.</li>
            <li>Reuse items whenever possible to extend their lifespan.</li>
            <li>
              Recycle materials like paper, plastic, and metal through
              designated recycling programs.
            </li>
          </ul>
        </div>

        {/* Embedded YouTube Video */}
        <h1 className="text-lg font-bold mb-2">
          Here is how you can segregate waste:
        </h1>
        <div className="w-[64vw] h-[36vw]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/7SCBdcXg2fs"
            title="Waste Management Tutorial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Learn;
