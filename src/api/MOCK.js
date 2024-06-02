import data from "../data/index";

const pageSize = 10; // Defina o tamanho da página

export const get = (page) => {
  // Obtenha o número total de registros
  const totalRecords = data.length;

  // Calcule o offset para a paginação inversa
  const offset = totalRecords - page * pageSize;

  // Ajuste o offset para garantir que ele nunca seja negativo
  const adjustedOffset = Math.max(0, offset);

  // Determine o limite para a última página
  const limit =
    page * pageSize > totalRecords ? totalRecords % pageSize : pageSize;

  // Obtenha os registros com limite e offset
  const paginatedItems = data
    .slice(adjustedOffset, adjustedOffset + limit)
    .reverse();

  return paginatedItems;
};

export const getPages = () => {
  // Obtenha o número total de registros
  const totalRecords = data.length;

  // Calcule o número total de páginas
  const totalPages = Math.ceil(totalRecords / pageSize);

  return totalPages;
};

export const getByQuery = (query) => {
  const formattedQuery = query.toLowerCase();

  // Filtra os itens que contêm a query no nick ou name
  const filteredItems = data.filter(
    (item) =>
      item.nick.toLowerCase().includes(formattedQuery) ||
      item.name.toLowerCase().includes(formattedQuery)
  );

  // Ordena os itens pelo id em ordem decrescente
  const sortedItems = filteredItems.sort((a, b) => b.id - a.id);

  return sortedItems;
};

export default data;
