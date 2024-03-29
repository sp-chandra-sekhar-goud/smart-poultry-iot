const handleOneDayInterval = ({ sensorData, setFormattedTimeStamps, setData }) => {
    const dataByDay = new Map();

    // Iterate through sensor data and aggregate data by day
    sensorData.forEach(([timestamp, data]) => {
      const [datePart] = timestamp.split(" ");
      if (!dataByDay.has(datePart)) {
        dataByDay.set(datePart, { total: 0, observations: 0 });
      }
      const dayData = dataByDay.get(datePart);
      dayData.total += parseFloat(data);
      dayData.observations++;
    });

    // Calculate average data for each day
    const timeStamps = [];
    const data = [];
    dataByDay.forEach((dayData, datePart) => {
      const averageTemp = dayData.total / dayData.observations;
      timeStamps.push(datePart);
      data.push(averageTemp.toFixed(2));
    });

    // Format timestamps
    setFormattedTimeStamps(timeStamps);
    setData(data);
    return { formattedTimeStamps: timeStamps, data };
};

export default handleOneDayInterval;
