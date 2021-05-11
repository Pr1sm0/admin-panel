import * as Koa from 'koa';
import {
  createItem,
  deleteItem,
  editItem,
  getAllItems,
  getItem,
} from '../db/queries/item';

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

const itemControllers = {
  getAllItemsController,
  getItemByIdController,
  createItemController,
  editItemController,
  deleteItemController,
};

export default itemControllers;
