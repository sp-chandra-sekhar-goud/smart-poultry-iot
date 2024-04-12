import axios from "axios";
import { useEffect, useState } from "react";
import { FaFan, FaLightbulb } from "react-icons/fa";

export default function ActuatorCard({ itemName, itemStatus, setStatus }) {
  const [newFanStatus, setNewFanStatus] = useState("");
  const [newLightStatus, setNewLightStatus] = useState("");

  useEffect(()=>{
    setNewFanStatus(itemStatus.fan);
    setNewLightStatus(itemStatus.light);
  }, [])
  function handleActuatorStatus() {
    let newFanStatus = "",
      newLightStatus = "";
    if (itemName == "Fan") {
      newFanStatus = itemStatus.fan === "Off" ? "On" : "Off";
      newLightStatus = itemStatus.light;
    } else {
      newFanStatus = itemStatus.fan;
      newLightStatus = itemStatus.light === "Off" ? "On" : "Off";
    }

    setNewFanStatus(newFanStatus);
    setNewLightStatus(newLightStatus);

    setStatus({ fan: newFanStatus, light: newLightStatus });

    const postData = {
      fan: newFanStatus, 
      light: newLightStatus,
    };
    
    axios
      .post("/api/actuatorsData", postData)
      .then((response) => {
        console.log("Actuator status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating actuator status:", error);
      });
  }

  return (
    <div className="flex flex-col items-center w-[90vw] md:w-[25vw] lg:w-[20vw] bg-white rounded-lg shadow-lg p-4 px-8 m-4 border-2 border-gray-300">
      <div className="flex flex-col items-center justify-center">
        {itemName === "Fan" && (
          <FaFan
            className={`${
              newFanStatus === "On" ? "animate-spin text-blue-800" : ""
            } text-[10vw] md:text-[4.5vw] lg:text-[3vw] my-4`}
          />
        )}
        {itemName === "Light" && (
          <FaLightbulb
            className={`${
              newLightStatus === "On" ? "text-yellow-400" : "text-grey-100"
            } text-[10vw] md:text-[4.5vw] lg:text-[3vw] my-4`}
          />
        )}
      </div>
      <div className="text-center">
        <h1 className={` mt-1 text-2xl font-bold`}>{itemName}</h1>
        <p
          className={` ${
            itemName === "Fan"
              ? newFanStatus === "On"
                ? "text-green-800"
                : "text-red-800"
              : newLightStatus === "On"
              ? "text-green-800"
              : "text-red-800"
          } mt-1 text-sm font-bold flex `}
        >
          Status:&nbsp;{" "}
          {itemName === "Fan" ? (
            newFanStatus === "On" ? (
              "On"
            ) : (
              "Off"
            )
          ) : newLightStatus === "On" ? (
           "On"
          ) : (
           "Off"
          )}
        </p>
      </div>
      
      {/* <div
        onClick={() => {
          handleActuatorStatus();
        }}
        className="border-2 border-blue-800 px-3 py-1 mt-4 text-blue-800 font-medium rounded shadow-lg cursor-pointer"
      >
        {itemName === "Fan" ? (
          newFanStatus === "On" ? (
            <h1>Turn Off</h1>
          ) : (
            <h1>Turn On</h1>
          )
        ) : newLightStatus === "On" ? (
          <h1>Turn Off</h1>
        ) : (
          <h1>Turn On</h1>
        )}
      </div> */}
    </div>
  );
}
