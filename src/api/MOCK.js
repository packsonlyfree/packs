import data from "../data/index";

const items = data.sort((a, b) => {
  if (a.date === "Em Breve" && b.date !== "Em Breve") {
      return 1;
  } else if (a.date !== "Em Breve" && b.date === "Em Breve") {
      return -1;
  } else {
      return 0;
  }
});

const pageSize = 10; // Defina o tamanho da página

export const get = (page) => {
  // Obtenha o número total de registros
  const totalRecords = items.length;

  // Calcule o offset para a paginação inversa
  const offset = totalRecords - page * pageSize;

  // Ajuste o offset para garantir que ele nunca seja negativo
  const adjustedOffset = Math.max(0, offset);

  // Determine o limite para a última página
  const limit =
    page * pageSize > totalRecords ? totalRecords % pageSize : pageSize;

  // Obtenha os registros com limite e offset
  const paginatedItems = items
    .sort((a, b) => b.id - a.id) // Ordena do final para o início
    .slice(adjustedOffset, adjustedOffset + limit);

  return paginatedItems;
};

export const getPages = () => {
  // Obtenha o número total de registros
  const totalRecords = items.length;

  // Calcule o número total de páginas
  const totalPages = Math.ceil(totalRecords / pageSize);

  return totalPages;
};

export const getByQuery = (query) => {
  const formattedQuery = query.toLowerCase();

  // Filtra os itens que contêm a query no nick ou name
  const filteredItems = items.filter(
    (item) =>
      item.nick.toLowerCase().includes(formattedQuery) ||
      item.name.toLowerCase().includes(formattedQuery)
  );

  // Ordena os itens pelo id em ordem decrescente
  const sortedItems = filteredItems.sort((a, b) => b.id - a.id);

  return sortedItems;
};

export default items;
