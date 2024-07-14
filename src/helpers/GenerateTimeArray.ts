const GenerateTimeArray = () => {
  const hourArray = [];
  const minArray = [];

  for (let hour = 0; hour < 24; hour++) {
    const formattedHour = hour.toString().padStart(2, "0");
    hourArray.push(formattedHour);
  }

  for (let minute = 0; minute < 60; minute += 15) {
    const formattedMinute = minute.toString().padStart(2, "0");
    minArray.push(formattedMinute);
  }

  return { hourArray, minArray };
};

export default GenerateTimeArray;
