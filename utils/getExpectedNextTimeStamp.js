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

  export default getExpectedNextTimeStamp;