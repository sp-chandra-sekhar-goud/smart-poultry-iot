import axios from "axios";
import { useEffect, useState } from "react";
import { FaFan, FaLightbulb } from "react-icons/fa";

export default function ActuatorCard({ itemName, itemStatus, setStatus }) {
  function handleActuatorStatus() {

    
    // const newFanStatus = itemName === "Fan" ? (itemStatus.status === "Off" ? "On" : "Off") : itemStatus.status;
    // const newLightStatus = itemName === "Light" ? (itemStatus.status === "Off" ? "On" : "Off") : itemStatus.status;
  
    // const postData = {
    //   fan: newFanStatus, // Update fan status if itemName is Fan
    //   light: newLightStatus, // Update light status if itemName is Light
    // };
    // console.log(postData);
    // // Send POST request to update actuator data
    // axios
    //   .post("/api/actuatorsData", postData)
    //   .then((response) => {
    //     console.log("Actuator status updated successfully:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error updating actuator status:", error);
    //   });
  }

  return (
    <div className="flex flex-col items-center w-[90vw] md:w-[25vw] lg:w-[20vw] bg-white rounded-lg shadow-lg p-4 px-8 m-4 border-2 border-gray-300">
      <div className="flex flex-col items-center justify-center">
        {itemName === "Fan" && (
          <FaFan
            className={`${
              itemStatus.status === "On" ? "animate-spin text-blue-800" : ""
            } text-[10vw] md:text-[4.5vw] lg:text-[3vw] my-4`}
          />
        )}
        {itemName === "Light" && (
          <FaLightbulb
            className={`${
              itemStatus.status === "On" ? "text-yellow-400" : "text-grey-100"
            } text-[10vw] md:text-[4.5vw] lg:text-[3vw] my-4`}
          />
        )}
      </div>
      <div className="text-center">
        <h1 className={` mt-1 text-2xl font-bold`}>{itemName}</h1>
        <p
          className={` ${
            itemStatus.status === "On" ? "text-green-800" : "text-red-800"
          } mt-1 text-sm font-bold`}
        >
          Status: {itemStatus.status}
        </p>
      </div>
      <div
        onClick={() => {
          handleActuatorStatus();
        }}
        className="border-2 border-blue-800 px-3 py-1 mt-4 text-blue-800 font-medium rounded shadow-lg cursor-pointer"
      >
        {itemStatus.status === "On" ? <h1>Turn Off</h1> : <h1>Turn On</h1>}
      </div>
    </div>
  );
}
