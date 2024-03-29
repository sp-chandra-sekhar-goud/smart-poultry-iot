import React, { useEffect, useState } from "react";
import BarChart from "./charts/BarChart";
import DatePickerComponent from "./datePickerComponent";
import IntervalButtons from "./intervalButtons";
import axios from "axios";
import distributeData from "../utils/distributeData";


export default function SensorAnalyticsComponent({ parameter, endPoint }) {
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() - 7);
    return today;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [formattedTimeStamps, setFormattedTimeStamps] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState("10mins");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/sensorsData/${endPoint}`, {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      });
      if (
        response.data.message === "No data found for the specified date range"
      ) {
        setFormattedTimeStamps([]);
        setData([]);
        setLoading(false);
        return;
      }
      const sensorData = response.data.data;
      const { formattedTimeStamps, data } = distributeData(
        sensorData,
        selectedInterval,
        setFormattedTimeStamps,
        setData
      );
      if (selectedInterval !== "1day") {
        setFormattedTimeStamps(formattedTimeStamps);
        setData(data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setFormattedTimeStamps([]);
      setData([]);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedInterval]);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-col md:items-start p-4 gap-4 w-[90vw] md:w-[60vw] lg:w-[40vw]">
          <h1>{parameter}</h1>
          <DatePickerComponent
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            fetchData={fetchData}
            selectedInterval={selectedInterval}
          />

          {data.length === 0 && (
            <h1>No data found for the specified date range</h1>
          )}
          {data.length > 0 && (
            <BarChart
              parameter={parameter}
              formattedTimeStamps={formattedTimeStamps}
              data={data}
            />
          )}

          <IntervalButtons
            selectedInterval={selectedInterval}
            setSelectedInterval={setSelectedInterval}
          />
        </div>
      )}
    </>
  );
}
