import React, { useEffect, useState } from "react";
import BarChart from "./charts/BarChart";
import DatePickerComponent from "./datePickerComponent";
import IntervalButtons from "./intervalButtons";
import axios from "axios";
import distributeData from "../utils/distributeData";

import { IoClose } from "react-icons/io5";
import { GrMenu } from "react-icons/gr";
import NavLinks from "./NavLinks";

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
    // setLoading(true);  
    try {
      const response = await axios.get(`/api/sensorsData/${endPoint}`, {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
      });
      if (response.data.message === "No data found for the specified date range") {
        setFormattedTimeStamps([]);
        setData([]);
        setLoading(false);
        return;
      }
      const sensorData = response.data.data.data;
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

  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-col md:items-start p-4 gap-4 w-[90vw] md:w-[60vw] lg:w-[40vw]">
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
            <div className="absolute w-[90vw] h-[100vw] z-10 p-0">
            {isNavOpen && <NavLinks />}
            </div>
          </div>
          <h1>{parameter}</h1>
          <DatePickerComponent
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            fetchData={fetchData}
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
