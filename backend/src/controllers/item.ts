import * as Koa from 'koa';
import {
  createItem,
  deleteItem,
  editItem,
  getAllItems,
  getItem,
} from '../db/queries/item';
import { getPaginationData } from '../services/pagination';

const getAllItemsController = async (ctx: Koa.Context) => {
  ctx.response.body = await getAllItems();
};

const getItemByIdController = async (ctx: Koa.Context) => {
  const id = Number(ctx.params.itemId);
  ctx.response.body = await getItem(id);
};

const createItemController = async (ctx: Koa.Context) => {
  const item = ctx.request.body;
  ctx.response.body = await createItem(item);
};

const editItemController = async (ctx: Koa.Context) => {
  const id = Number(ctx.params.itemId);
  const item = ctx.request.body;
  ctx.response.body = await editItem(id, item);
};

const deleteItemController = async (ctx: Koa.Context) => {
  const id = Number(ctx.params.itemId);
  ctx.response.body = await deleteItem(id);
};

const getAllItemsPaginationController = async (ctx: Koa.Context) => {
  const queryParams = ctx.request.query;
  ctx.response.body = await getPaginationData(queryParams);
};

const itemControllers = {
  getAllItemsController,
  getAllItemsPaginationController,
  getItemByIdController,
  createItemController,
  editItemController,
  deleteItemController,
};

export default itemControllers;
