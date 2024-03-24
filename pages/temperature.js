import Layout from "@/components/Layout";
import BarChart from "@/components/charts/BarChart";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Temperature() {

  const [loading, setLoading] = useState(true);
  
  const [formattedTimeStamps, setFormattedTimeStamps] = useState([]);
  const [tempData, setTempData] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      axios
        .get("/api/sensorsData/tempData")
        .then((response) => {
          distributeData(response.data.data);
          formatTimeStamp(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    fetchData();
  }, [tempData]);

  const formatTimeStamp = (sensorData) => {
    
    let prevDate = null;

    const timestamps = sensorData.map((row) => {
      if(row[0] === "Timestamp") return null;
      const [datePart, timePart] = row[0].split(" "); 
      const [day, month, year] = datePart.split("-").map(Number); 
      const [hours, minutes] = timePart.split(":").map(Number);
      

      if (prevDate === null || prevDate !== `${day}/${month}/${year}`) {
        prevDate = `${day}/${month}/${year}`;
        return `${day}/${month}/${year} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
      } else {
        return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
      }
      
    });
    
    setFormattedTimeStamps(timestamps);
  };
  
  const distributeData = (sensorData) => {
      sensorData.forEach(row => {
        const [timestamp, temperature] = row;
        setTempData(prevData => [...prevData, temperature]);
      });
  };
    

  return (
    <Layout>
        {loading ? (
        <h1>Loading...</h1>
      ) : (
      <div>
        <h1>Temperature</h1>
        <BarChart
          formattedTimeStamps={formattedTimeStamps}
          tempData={tempData}
        />
      </div>
      )}
    </Layout>
  );
}
