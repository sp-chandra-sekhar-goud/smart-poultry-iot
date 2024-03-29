const uniqueData = (data) => {
  const uniqueTimestamps = new Set(data.map((item) => item[0]));

  return Array.from(uniqueTimestamps).map((timestamp) => {
    const [foundItem] = data.filter((item) => item[0] === timestamp);
    return foundItem;
  });
};

export default uniqueData;