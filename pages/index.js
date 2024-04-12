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
import SignIn from "./sign-in";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const [tempData, setTempData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [co2Data, setCo2Data] = useState([]);
  const [ammoniaData, setAmmoniaData] = useState([]);

  const [lastUpdatedTime, setLastUpdatedTime] = useState("");
  const { mode, _ } = useMode();

  const [itemStatus, setItemStatus] = useState({ fan: "", light: "" });

  const session = useSession();
  const status = session.status;

  useEffect(() => {
    async function fetchData() {
      axios
        .get("/api/actuatorsData/")
        .then((response) => {
          const fanStatus = response.data.data[0][1] == "1" ? "On" : "Off";
          const lightStatus = response.data.data[0][2] == "1" ? "On" : "Off";
          setItemStatus({ fan: fanStatus, light: lightStatus });
        })
        .catch((error) => {
          console.log(error);
        });

      if (mode == "Real-Time Monitoring") {
        axios
          .get("/api/sensorsData/real-time")
          .then((response) => {
            distributeData(response.data.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
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

    if (status == "authenticated") {
      fetchData();
    }

    const interval = setInterval(
      () => {
        fetchData();
      },
      mode === "Real-Time Monitoring" ? 60 * 1000 : 30 * 60000
    );

    return () => clearInterval(interval);
  }, [status]);

  const distributeData = (sensorData) => {
    sensorData.forEach((row) => {
      const [timestamp, temperature, humidity, co2, ammonia] = row;
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

  const getDisplayName = () => {
    if (session?.data?.user?.name) {
      return session?.data?.user?.name;
    }
    let email = session?.data?.user?.email;
    let name = email.split("@")[0];
    return name;
  };

  return status == "unauthenticated" ? (
    <SignIn />
  ) : (
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
            <h1 className="flex flex-row lg:flex-col text-lg">
              Welcome back, <br />
              <span className="ml-1 font-bold">{getDisplayName()}</span>
            </h1>
            <div className="flex flex-col">
              <h1 className="text-lg ">
                Lastly updated at:
                <span className="font-bold ml-1">{lastUpdatedTime}</span>
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
              itemName={"Fan"}
              itemStatus={itemStatus}
              setStatus={setItemStatus}
            />
            <ActuatorCard
              itemName={"Light"}
              itemStatus={itemStatus}
              setStatus={setItemStatus}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}
