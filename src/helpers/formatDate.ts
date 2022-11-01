const formatDate = (value: Date) => {
  if (value) {
    const [month, date, year] = new Date(value).toLocaleDateString()?.split('/');

    return [year, month, date]?.join('/');
  }

  return value;
};
export default formatDate;
