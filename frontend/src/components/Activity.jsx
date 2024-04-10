import React, { useEffect, useState } from "react";
import { avatars } from "../constants/activity";
import "./activity.css"; // Import CSS file for styling
import axios from "axios";

const Activity = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchWeightHistory = async () => {
      try {
        // Make API call to fetch weight history
        const response = await axios.get('http://localhost:3000/api/info/getActivity');
        
        // Map the response data to update the users array
        const updatedUsers = response.data.map(user => ({
          id: user._id,
          name: user.username,
          date: user.weightHistory[0].date.substring(0, 10),
          weight: user.weightHistory[0].weight,
          points: user.points
        }));

        // Set the updated users array
        setUsers(updatedUsers);
      } catch (error) {
        // Handle errors
        console.error('Error fetching weight history:', error);
      }
    };

    // Call the function to fetch weight history on component load
    fetchWeightHistory();
  }, []);

  return (
    <div className="border-2 h-[27rem] w-[28rem] max-sm:w-[70vw] rounded-xl">
      <div className="acttable flex flex-col overflow-y-scroll h-[27rem] w-full p-5">
        {users.map((user) => {
          // Check if username is not "admin" before rendering the row
          if (user.name !== "admin") {
            return (
              <div key={user.id} className="p-2 py-4 flex gap-4">
                <div>
                  <img
                    src={avatars[Math.floor(Math.random() * avatars.length)]}
                    alt=""
                    className="w-12 bg-black rounded-full"
                  />
                </div>
                <div className="flex flex-col w-[30%]">
                  <h1 className="font-bold font-[system-ui]">{user.name}</h1>
                  <h2 className="font-[system-ui] font-light">Points: {user.points}</h2>
                </div>
                <div className="flex flex-col">
                  <h1 className="font-[system-ui] ">{user.date}</h1>
                  <h2 className="font-[system-ui] font-light">Submitted {user.weight}kg of waste</h2>
                </div>
              </div>
            );
          } else {
            return null; // Return null to hide the row
          }
        })}
      </div>
    </div>
  );
};

export default Activity;
