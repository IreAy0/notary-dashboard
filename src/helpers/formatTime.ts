const formatTime = (value: Date) => {
  if (value) {
    const time = new Date(value).toLocaleTimeString();

    return time;
  }

  return value;
};
export default formatTime;
