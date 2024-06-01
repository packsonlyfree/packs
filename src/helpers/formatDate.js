const formatDate = (date) => {
  if (date === "Em Breve") return date;
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
};

export default formatDate;
