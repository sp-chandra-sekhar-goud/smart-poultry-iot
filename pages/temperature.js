import Layout from "@/components/Layout";
import BarChart from "@/components/charts/BarChart";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Temperature() {
  const [loading, setLoading] = useState(true);

  const [formattedTimeStamps, setFormattedTimeStamps] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState("10mins");

  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() - 7);
    return today;
  });
  const [endDate, setEndDate] = useState(new Date());
  const currentDate = new Date();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/sensorsData/tempData", {
        params: {
          startDate: startDate,
          endDate: endDate
        }
      });
      console.log(response);
      if (response.data.message === "No data found for the specified date range") {
        setFormattedTimeStamps([]);
        setTempData([]);
        setLoading(false);
        return;
      }
      const sensorData = response.data.data;
      const { formattedTimeStamps, tempData } = distributeData(sensorData);
      if (selectedInterval !== "1day") {
        setFormattedTimeStamps(formattedTimeStamps);
        setTempData(tempData);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setFormattedTimeStamps([]);
      setTempData([]);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedInterval]);

  const formatTimeStamp = (timestamps) => {
    let prevDate = null;
    const formattedTimestamps = timestamps.map((timestamp) => {
      const [datePart, timePart] = timestamp.split(" ");
      const [day, month, year] = datePart.split("-").map(Number);
      const [hours, minutes] = timePart.split(":").map(Number);

      if (prevDate === null || prevDate !== `${day}/${month}/${year}`) {
        prevDate = `${day}/${month}/${year}`;
        return `${day}/${month}/${year} ${hours}:${
          minutes < 10 ? "0" + minutes : minutes
        }`;
      } else {
        return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
      }
    });

    return formattedTimestamps;
  };

  const getExpectedNextTimeStamp = (timestamp, intervalMinutes) => {
    let [datePart, timePart] = timestamp.split(" ");
    let [year, month, day] = datePart.split("-");
    let [hours, minutes] = timePart.split(":").map(Number);

    let nextMinutes = minutes + intervalMinutes;
    let nextHours = hours;
    let nextDay = Number(day);
    let nextMonth = Number(month);
    let nextYear = Number(year);

    if (nextMinutes >= 60) {
      nextMinutes = nextMinutes - 60;
      nextHours = hours + 1;
    }

    if (nextHours >= 24) {
      nextHours = nextHours - 24;
      nextDay = nextDay + 1;

      // Check if nextDay exceeds the number of days in the current month
      let daysInMonth = new Date(nextYear, nextMonth, 0).getDate();
      if (nextDay > daysInMonth) {
        nextDay = 1;
        nextMonth = nextMonth + 1;
        if (nextMonth > 12) {
          nextMonth = 1;
          nextYear = nextYear + 1;
        }
      }
    }

    return `${nextYear}-${nextMonth < 10 ? "0" + nextMonth : nextMonth}-${
      nextDay < 10 ? "0" + nextDay : nextDay
    } ${nextHours < 10 ? "0" + nextHours : nextHours}:${
      nextMinutes < 10 ? "0" + nextMinutes : nextMinutes
    }`;
  };

  const uniqueData = (data) => {
    const uniqueTimestamps = new Set(data.map((item) => item[0]));

    return Array.from(uniqueTimestamps).map((timestamp) => {
      const [foundItem] = data.filter((item) => item[0] === timestamp);
      return foundItem;
    });
  };

  const handleOneDayInterval = (sensorData) => {
    const tempByDay = new Map(); // Map to store temperature data by day

    // Iterate through sensor data and aggregate temperatures by day
    sensorData.forEach(([timestamp, temp]) => {
      const [datePart] = timestamp.split(" ");
      if (!tempByDay.has(datePart)) {
        tempByDay.set(datePart, { total: 0, observations: 0 });
      }
      const dayData = tempByDay.get(datePart);
      dayData.total += parseFloat(temp);
      dayData.observations++;
    });

    // Calculate average temperature for each day
    const timeStamps = [];
    const tempData = [];
    tempByDay.forEach((dayData, datePart) => {
      const averageTemp = dayData.total / dayData.observations;
      timeStamps.push(datePart);
      tempData.push(averageTemp.toFixed(2));
    });

    // Format timestamps
    setFormattedTimeStamps(timeStamps);
    setTempData(tempData);
    return { formattedTimeStamps: timeStamps, tempData };
  };

  const distributeData = (sensorData) => {
    const intervalMap = {
      "1min": 1,
      "5mins": 5,
      "10mins": 10,
      "30mins": 30,
      "1hr": 60,
      "1day": 1440,
    };

    const intervalMinutes = intervalMap[selectedInterval] || 10;

    if (selectedInterval === "1day") {
      return handleOneDayInterval(sensorData);
    }

    let total = 0,
      observations = 0;
    const timeStamps = [];
    const tempData = [];

    const uniqueSensorData = uniqueData(sensorData);

    let expectedNextTimeStamp = getExpectedNextTimeStamp(
      uniqueSensorData[0][0],
      intervalMinutes
    );

    for (let i = 0; i < uniqueSensorData.length; i++) {
      const [timestamp, temp] = uniqueSensorData[i];
      total += parseFloat(temp);
      observations++;

      if (
        expectedNextTimeStamp >
          uniqueSensorData[uniqueSensorData.length - 1][0] ||
        (i < uniqueSensorData.length - 1 &&
          uniqueSensorData[i + 1][0] > expectedNextTimeStamp)
      ) {
        const val = total / observations;
        tempData.push(val.toFixed(2));

        if (
          expectedNextTimeStamp >
          uniqueSensorData[uniqueSensorData.length - 1][0]
        ) {
          timeStamps.push(uniqueSensorData[uniqueSensorData.length - 1][0]);
          break;
        }
        timeStamps.push(expectedNextTimeStamp);
        total = 0;
        observations = 0;

        expectedNextTimeStamp = getExpectedNextTimeStamp(
          timestamp,
          intervalMinutes
        );
      }
    }

    const formattedTimeStamps = formatTimeStamp(timeStamps);
    return { formattedTimeStamps, tempData };
  };

  return (
    <Layout>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-col md:items-start p-4 gap-4 w-[90vw] md:w-[60vw] lg:w-[40vw]">
          <h1>Temperature</h1>
          <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
              <div className="flex gap-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium mb-2 text-gray-700"
                >
                  From Date
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  maxDate={currentDate} 
                  dateFormat="dd/MM/yyyy"
                  className="w-full appearance-none shadow border rounded py-3 px-4"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium mb-2 text-gray-700"
                >
                  To Date
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  maxDate={currentDate} 
                  dateFormat="dd/MM/yyyy"
                  className="w-full appearance-none shadow border rounded py-3 px-4"
                />
              </div>
              </div>
              <div>
                <button
                  className="px-4 py-2 my-2 rounded-md bg-blue-800 text-white"
                  onClick={() => fetchData()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          {
            tempData.length === 0 &&
            <h1>No data found for the specified date range</h1>
          }
          {
            tempData.length > 0 &&
            <BarChart
            formattedTimeStamps={formattedTimeStamps}
            tempData={tempData}
          />
          }

          <div className="grid grid-cols-3 gap-2">
            <button
              className={`px-4 py-2 rounded-md w-[25vw] md:w-[20vw] lg:w-[10vw] ${
                selectedInterval === "1min" ? "bg-yellow-500" : "bg-blue-800"
              }`}
              onClick={() => setSelectedInterval("1min")}
            >
              1 min
            </button>
            <button
              className={`px-4 py-2 rounded-md w-[25vw] md:w-[20vw] lg:w-[10vw] ${
                selectedInterval === "5mins" ? "bg-yellow-500" : "bg-blue-800"
              }`}
              onClick={() => setSelectedInterval("5mins")}
            >
              5 mins
            </button>
            <button
              className={`px-4 py-2 rounded-md w-[25vw] md:w-[20vw] lg:w-[10vw] ${
                selectedInterval === "10mins" ? "bg-yellow-500" : "bg-blue-800"
              }`}
              onClick={() => setSelectedInterval("10mins")}
            >
              10 mins
            </button>
            <button
              className={`px-4 py-2 rounded-md w-[25vw] md:w-[20vw] lg:w-[10vw] ${
                selectedInterval === "30mins" ? "bg-yellow-500" : "bg-blue-800"
              }`}
              onClick={() => setSelectedInterval("30mins")}
            >
              30 mins
            </button>
            <button
              className={`px-4 py-2 rounded-md w-[25vw] md:w-[20vw] lg:w-[10vw] ${
                selectedInterval === "1hr" ? "bg-yellow-500" : "bg-blue-800"
              }`}
              onClick={() => setSelectedInterval("1hr")}
            >
              1 hr
            </button>
            <button
              className={`px-4 py-2 rounded-md w-[25vw] md:w-[20vw] lg:w-[10vw] ${
                selectedInterval === "1day" ? "bg-yellow-500" : "bg-blue-800"
              }`}
              onClick={() => setSelectedInterval("1day")}
            >
              1 day
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
