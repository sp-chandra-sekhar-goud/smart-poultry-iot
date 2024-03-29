import React, { useEffect, useState } from "react";
import BarChart from "./charts/BarChart";
import DatePickerComponent from "./datePickerComponent";
import IntervalButtons from "./intervalButtons";
import fetchData from "@/utils/fetchData";

export default function SensorAnalyticsComponent({ parameter, endPoint }) {
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() - 7);
    return today;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [tempData, setData] = useState([]);
  const [formattedTimeStamps, setFormattedTimeStamps] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState("10mins");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(
      endPoint,
      startDate,
      endDate,
      selectedInterval,
      setFormattedTimeStamps,
      setData,
      setLoading
    );
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

          {tempData.length === 0 && (
            <h1>No data found for the specified date range</h1>
          )}
          {tempData.length > 0 && (
            <BarChart
              formattedTimeStamps={formattedTimeStamps}
              tempData={tempData}
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
