import { countAllItemsWithPagination, getAllItemsWithPagination } from '../db/queries/item';
import { Item } from '../interfaces';

const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (totalItems: number, items: Item[], page: number, limit: number) => {
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, items, totalPages, currentPage };
};

export const getPaginationData = async (query: any) => {
  const { page, size, name } = query;
  const nameCondition = name ? `%${name}%` : '%%';

  const { limit, offset } = getPagination(page, size);

  const totalItems = await countAllItemsWithPagination(nameCondition);
  const items = await getAllItemsWithPagination(nameCondition, limit, offset);
  
  const response = getPagingData(totalItems, items, page, limit);

  return response;
};
