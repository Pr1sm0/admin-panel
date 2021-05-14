import { countAllItemsWithPagination, getAllItemsWithPagination } from '../db/queries/item';
import { Item } from '../interfaces';

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (numberOfItems: number, items: Item[], page: number, limit: number) => {
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(numberOfItems / limit);

  return { numberOfItems, items, totalPages, currentPage };
};

// Retrieve all Tutorials from the database.
export const getAll = async (query: any) => {
  const { page, size, title } = query;
  const condition = title ? `%${title}%` : '%%';

  const { limit, offset } = getPagination(page, size);

  const countAll = await countAllItemsWithPagination(condition);
  const items = await getAllItemsWithPagination(condition, offset, limit);
  
  const numberOfItems = countAll.count;

  const response = getPagingData(numberOfItems, items, page, limit);

  return response;
};
