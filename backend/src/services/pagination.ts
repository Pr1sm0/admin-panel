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

export const getPaginationData = async (query: any) => {
  const { page, size, name } = query;
  const nameCondition = name ? `%${name}%` : '%%';

  const { limit, offset } = getPagination(page, size);

  const numberOfItems = await countAllItemsWithPagination(nameCondition);
  const items = await getAllItemsWithPagination(nameCondition, limit, offset);
  
  const response = getPagingData(numberOfItems, items, page, limit);

  return response;
};
