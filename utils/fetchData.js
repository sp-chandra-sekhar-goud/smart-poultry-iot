import axios from "axios";
import distributeData from "./distributeData";

const fetchData = async (
  endPoint,
  startDate,
  endDate,
  selectedInterval,
  setFormattedTimeStamps,
  setData,
  setLoading
) => {
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

export default fetchData;
