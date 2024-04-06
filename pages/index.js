import Layout from "@/components/Layout";
import Card from "@/components/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; 

import tempIcon from "../public/icons/temp.png";
import humidityIcon from "../public/icons/humidity.png";
import ammoniaIcon from "../public/icons/ammonia.png";
import co2Icon from "../public/icons/co2.png";



import { IoClose } from "react-icons/io5";
import { GrMenu } from "react-icons/gr";

import { useMode } from "@/contexts/ModeContext";
import NavLinks from "@/components/NavLinks";
import ActuatorCard from "@/components/actuatorCard";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const session = useSession();

  const [tempData, setTempData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [co2Data, setCo2Data] = useState([]);
  const [ammoniaData, setAmmoniaData] = useState([]);

  const [lastUpdatedTime, setLastUpdatedTime] = useState("");
  const { mode, _ } = useMode();


  useEffect(() => { 
    async function fetchData() {
    if(mode == "Real-Time Monitoring"){
      axios
      .get("/api/sensorsData/real-time")
      .then((response) => {
        distributeData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    }else{
      axios
      .get("/api/sensorsData/")
      .then((response) => {
        distributeData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
  }

  fetchData();

  const interval = setInterval(
    () => {
      fetchData();
    },
    mode === "Real-Time Monitoring" ? 60 * 1000 : 30 * 60000
  );

  return () => clearInterval(interval);
}, []);

  const distributeData = (sensorData) => {
    sensorData.forEach((row) => {
      const [
        timestamp,
        temperature,
        humidity,
        co2,
        ammonia
      ] = row;
      setTempData((prevData) => [...prevData, temperature]);
      setHumidityData((prevData) => [...prevData, humidity]);
      setCo2Data((prevData) => [...prevData, co2]);
      setAmmoniaData((prevData) => [...prevData, ammonia]);
    
      const latestTimestamp =
        sensorData.length > 0 ? sensorData[sensorData.length - 1][0] : "";
      setLastUpdatedTime(latestTimestamp);
    });
  };

  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <Layout>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
          <div className="flex flex-col ">
            <div className=" block md:hidden">
              {isNavOpen ? (
                <IoClose
                  className="absolute top-4 right-10 text-white block md:hidden text-[6vw] font-bold"
                  onClick={() => setIsNavOpen(false)}
                />
              ) : (
                <GrMenu
                  className="absolute top-4 right-10 text-white block md:hidden text-[6vw] font-bold"
                  onClick={() => setIsNavOpen(true)}
                />
              )}
              <div className="absolute w-[95vw] h-[100vw] z-10 p-0">
              {isNavOpen && <NavLinks />}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-between px-4 py-4">
              <h1 className="text-lg">
                Welcome back, <br/>
                <span className="font-bold">{session?.data?.user?.name}</span>
              </h1>
              <div className="flex flex-col">
              <h1 className="text-lg ">
                Lastly updated at
                <span className="font-bold">{lastUpdatedTime}</span>
              </h1>
              <h1 className="text-lg ">
                Mode: <span className="font-bold">{mode}</span>
              </h1>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <Card
                imgPath={tempIcon}
                title={"Temperature"}
                data={tempData}
                unit={"Celsius (°c)"}
                path={"/temperature"}
              />
              <Card
                imgPath={humidityIcon}
                title={"Humidity"}
                data={humidityData}
                unit={"Percentage (%)"}
                path={"/humidity"}
              />
              <Card
                imgPath={co2Icon}
                title={"Carbon Dioxide"}
                data={co2Data}
                unit={"ppm"}
                path={"/carbon-dioxide"}
              />
              <Card
                imgPath={ammoniaIcon}
                title={"Ammonia"}
                data={ammoniaData}
                unit={"Parts Per Million (ppm)"}
                path={"/ammonia"}
              />
              <ActuatorCard
                iconName={"FaFan"}
                item={"Fan"}
                status={"On"}
              />
              <ActuatorCard
                iconName={"FaLightbulb"}
                item={"Light"}
                status={"Off"}
              />
              
            </div>
          </div>
        )      
      }
    </Layout>
  );
}
