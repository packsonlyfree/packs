import items from "./MOCK";
import { easyFetch } from "./easyFetch";

export const get = async (page) => {
  // const response = await easyFetch(`http://10.0.0.98:4010/list?page=${page}`);
  // const responseJSON = await response.json();
  const responseJSON = items;
  return responseJSON;
};

export const getByQuery = async (query) => {
  // const response = await easyFetch(`http://10.0.0.98:4010/list?query=${query}`);
  // const responseJSON = await response.json();
  const responseJSON = items;
  return responseJSON;
};

export const getPages = async () => {
  const response = await easyFetch(`http://10.0.0.98:4010/pages`);
  const responseJSON = await response.json();
  return responseJSON;
};
