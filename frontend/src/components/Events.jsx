import React from "react";
import { eventImg, events } from "../constants/events";
import "./activity.css"; // Import CSS file for styling

const Events = () => {
  const firstThreeEvents = events.slice(0, 3); // Slice the first three events

  return (
    <div className="border-2 h-[27rem] w-[28rem] max-sm:w-[70vw] rounded-xl">
      <div className="acttable flex flex-col gap-5 overflow-y-scroll h-[27rem] w-full p-5">
        {firstThreeEvents.map((event, index) => {
          let backgroundColor;
          let insideColor;
          if (index === 0) {
            backgroundColor = "#f0fcf9";
            insideColor = "#68d5db";
          } else if (index === 1) {
            backgroundColor = "#fcf0fc";
            insideColor = "#ff70ba";
          } else if (index === 2) {
            backgroundColor = "#fcf8f0";
            insideColor = "#ffc76d";
          }

          return (
            <div
              key={event.id}
              className="p-4 py-4 rounded-xl flex gap-4"
              style={{ backgroundColor }}
            >
              <div className="flex flex-center self-center">
                <img
                  src={event.img}
                  alt=""
                  className="w-12 h-12  rounded-xl p-2 "
                  style={{backgroundColor: insideColor}}
                />
              </div>
              
              <div className="flex flex-col">

              <h1 className="font-[system-ui] font-bold">
                  {event.title}
              </h1>
              <h1 className="font-[system-ui] w-3/4">
                  {event.desc}
              </h1>
                <h1 className="font-[system-ui] font-light">{event.date}</h1>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
