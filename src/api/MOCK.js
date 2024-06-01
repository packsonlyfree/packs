import tmb1 from "../data/Cibelly Ferreira/1.jpg";
import tmb2 from "../data/Cibelly Ferreira/2.jpg";
import tmb3 from "../data/Cibelly Ferreira/3.jpg";
import tmb4 from "../data/Cibelly Ferreira/4.jpg";

const items = [
  {
    date: "2024-06-01",
    id: 1,
    link: "https://mega.nz/folder/LM0SAAhQ#lQYM-2hgmCGvMGvVcUzqBQ",
    name: "Cibelly Ferreira",
    nick: "CibellyFerreira",
    site: "privacy",
    thumbnail: [tmb1, tmb2, tmb3, tmb4],
  },
];

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
