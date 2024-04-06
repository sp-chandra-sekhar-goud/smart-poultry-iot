import axios from "axios";
import { useEffect, useState } from "react";
import { FaFan } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";

export default function ActuatorCard({ iconName, item, status, setStatus}) {
  const [animate, setAnimate] = useState(false);
  // console.log(status);
  useEffect(() => {

    
    setAnimate(true);
    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 1000); 

    return () => clearTimeout(timeout);
  }, [status]);

  function handleActuatorStatus(){
    setStatus((prev)=>{
      if(prev == "Off"){
        return "On";
      }else{
        return "Off";
      }
    })
    
  }

  return (
    <div className="flex flex-col items-center w-[90vw] md:w-[25vw] lg:w-[20vw] bg-white rounded-lg shadow-lg p-4 px-8 m-4 border-2 border-gray-300">
        <div className=" flex flex-col items-center justify-center">
         {iconName == "FaFan" && <FaFan className={`${status == "On" ? 'animate-spin text-blue-800' : ''} text-[10vw] md:text-[4.5vw] lg:text-[3vw] my-4`}/>}
         {iconName == "FaLightbulb" && <FaLightbulb className={`${status == "On" ? 'text-yellow-400' : 'text-grey-100'} text-[10vw] md:text-[4.5vw] lg:text-[3vw] my-4`}/>}
        </div>
        <div className="text-center">
          <h1 className={`  mt-1 text-2xl font-bold`}>{item}</h1>
          <p className={` ${status == "On" ? 'text-green-800' : 'text-red-800'}   mt-1 text-sm font-bold`}>Status: {status}</p>
        </div>
        <div 
        onClick={() => {handleActuatorStatus()}}
        className="border-2 border-blue-800 px-3 py-1 mt-4 text-blue-800 font-medium rounded shadow-lg cursor-pointer">
          {status == "On" ? <h1>Turn Off</h1> : <h1>Turn On</h1>}
        </div>
    </div>
  );
}
