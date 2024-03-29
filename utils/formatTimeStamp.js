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

  export default formatTimeStamp;