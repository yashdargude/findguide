type timeType = {
  hh: string;
  mm: string;
};

const ConvertToDateTime = (timeString: timeType) => {
  const hours = timeString.hh;
  const minutes = timeString.mm;
  const now = new Date();
  const date = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    parseInt(hours),
    parseInt(minutes)
  );
  return date.toISOString();
};

export default ConvertToDateTime;
