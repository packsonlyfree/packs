const formatDate = (date) => {
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
};

export default formatDate;
