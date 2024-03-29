import Layout from "@/components/Layout";
import Card from "@/components/card";
import axios from "axios";
import { useEffect, useState } from "react";

import tempIcon from '../public/icons/temp.png';
import humidityIcon from '../public/icons/humidity.png';
import ammoniaIcon from '../public/icons/ammonia.png';
import propaneIcon from '../public/icons/propane.png';
import butaneIcon from '../public/icons/butane.png';
import carbonMonoxideIcon from '../public/icons/carbon monoxide.png';
import co2Icon from '../public/icons/co2.png';

export default function Home() {
  const [loading, setLoading] = useState(true);
  
  const [tempData, setTempData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [carbonMonoxideData, setCarbonMonoxideData] = useState([]);
  const [co2Data, setCo2Data] = useState([]);
  const [ammoniaData, setAmmoniaData] = useState([]);
  const [butaneData, setButaneData] = useState([]);
  const [propaneData, setPropaneData] = useState([]);

  const [lastUpdatedTime, setLastUpdatedTime] = useState("");

  useEffect(() => {
    async function fetchData() {
      axios
        .get("/api/sensorsData")
        .then((response) => {
          distributeData(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    fetchData();
    
    const interval = setInterval(() => {
      fetchData();
    }, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
    
  }, []);

  const distributeData = (sensorData) => {
      sensorData.forEach(row => {
        const [timestamp, temperature, humidity, co2, ammonia, butane, propane, carbonMonoxide] = row;
        setTempData(prevData => [...prevData, temperature]);
        setHumidityData(prevData => [...prevData, humidity]);
        setCarbonMonoxideData(prevData => [...prevData, carbonMonoxide]); 
        setCo2Data(prevData => [...prevData, co2]);
        setAmmoniaData(prevData => [...prevData, ammonia]);
        setButaneData(prevData => [...prevData, butane]);
        setPropaneData(prevData => [...prevData, propane]);

        const latestTimestamp = sensorData.length > 0 ? sensorData[sensorData.length - 1][0] : "";
        setLastUpdatedTime(latestTimestamp);
      });
  };
    


  return (
    <Layout>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-col ">
          <h1 className="text-lg px-4 my-4">Lastly updated at <span className="font-bold">{lastUpdatedTime}</span></h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">            
            <Card imgPath={tempIcon} title={"Temperature"} data={tempData} unit={"Celsius (°c)"} path={"/temperature"}/>
            <Card imgPath={humidityIcon} title={"Humidity"} data={humidityData} unit={"Percentage (%)"}  path={"/humidity"}/>
            <Card imgPath={ammoniaIcon} title={"Ammonia"} data={ammoniaData} unit={"Parts Per Million (ppm)"} path={"/ammonia"}/>
            <Card imgPath={butaneIcon} title={"Butane"} data={butaneData} unit={"Parts Per Million (ppm)"}  path={"/butane"}/>
            <Card imgPath={propaneIcon} title={"Propane"} data={propaneData} unit={"Parts Per Million (ppm)"}  path={"/propane"}/>
            <Card imgPath={carbonMonoxideIcon} title={"Carbon Monoxide (co)"} data={carbonMonoxideData} unit={"Parts Per Million (ppm)"}  path={"/carbon-monoxide"}/>
            <Card imgPath={co2Icon} title={"Carbon dioxide (co2)"} data={co2Data} unit={"Parts Per Million (ppm)"}  path={"/carbon-dioxide"}/>
          </div>
        </div>
      )}
    </Layout>
  );
}
