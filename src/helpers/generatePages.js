const generatePages = (n) => {
  const range = [];
  for (let i = 1; i <= n; i += 1) {
    range.push(i);
  }
  return range;
};

const getFivePages = (currentPage, totalPages) => {
  const pages = generatePages(totalPages);
  let newPages;
  const cPage = currentPage - 1;
  if (cPage < 3) {
    newPages = pages.slice(0, 7);
  } else if (cPage > totalPages - 4) {
    newPages = pages.slice(-7);
  } else {
    newPages = pages.slice(cPage - 3, cPage + 4);
  }
  return newPages
};

export default getFivePages;
