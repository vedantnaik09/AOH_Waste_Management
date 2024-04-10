import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = ({ id }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/info/leaderboard")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard data:", error);
      });
  }, []);

  // Update displayedUsers logic to use correct properties
  const displayedUsers = users.slice(0, 5);

  return (
    <div className="w-full hover:cursor-default">
      <h1 className="text-[1.3rem]  my-5">Leaderboard</h1>
      <table className="w-full border-collapse border  bg-[#faf8f4]">
        <tbody>
          <tr className="border-2 border-[#cecaca]">
            <th className="py-2 px-4 text-left">Rank</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Credits</th>
          </tr>
          {/* Display the first 5 records */}
          {displayedUsers.map((user, index) => (
            // Check if username is not "admin" before rendering the row
            user.username !== "admin" && (
              <tr
                key={index}
                className={`border-2  border-[#cecaca] ${
                  user._id === id ? "font-bold" : ""
                }`}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">{user.credits}</td>
              </tr>
            )
          ))}
          {/* Check if there are more users */}
          {users.length > 5 && (
            <tr className="border-2 border-[#cecaca]">
              <td colSpan="3" className="py-2 px-4 text-center">
                ...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
