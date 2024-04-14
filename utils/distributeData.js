import formatTimeStamp from "./formatTimeStamp";
import getExpectedNextTimeStamp from "./getExpectedNextTimeStamp";
import handleOneDayInterval from "./handleOneDayInterval";
import uniqueData from "./uniqueData";

const distributeData = (
  sensorData,
  selectedInterval,
  setFormattedTimeStamps,
  setData
) => {

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
    return handleOneDayInterval({
      sensorData: sensorData,
      setFormattedTimeStamps: setFormattedTimeStamps,
      setData: setData,
    });
  }

  let total = 0,  observations = 0;
  const timeStamps = [];
  const data = [];

  const uniqueSensorData = uniqueData(sensorData);
 
  let expectedNextTimeStamp = getExpectedNextTimeStamp(
    uniqueSensorData[0][0],
    intervalMinutes
  );


  for (let i = 0; i < uniqueSensorData.length; i++) {

    const [timestamp, value] = uniqueSensorData[i];

    let a = expectedNextTimeStamp;
    let b = uniqueSensorData[uniqueSensorData.length - 1][0];
    let c = (i < uniqueSensorData.length - 1) && uniqueSensorData[i + 1][0];
    
    total += parseFloat(value);
    observations++;

    if (a >= b || ((i < uniqueSensorData.length - 1) && (c > a))) {
      const val = total / observations;
      data.push(val.toFixed(2));
      
      if (a >= b) {
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
// console.log(timeStamps);
  const formattedTimeStamps = formatTimeStamp(timeStamps);

  // console.log("formattedTimeStamps", formattedTimeStamps);
  return { formattedTimeStamps, data };
};

export default distributeData;
