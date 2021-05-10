import * as Koa from 'koa';
import {
  createItem,
  deleteItem,
  editItem,
  getAllItems,
  getItem,
} from '../db/queries/item';

// get all items

const getAllItemsC = async (ctx: Koa.Context) => {
  ctx.response.body = await getAllItems();
};

// get item by id

const getItemByIdC = async (ctx: Koa.Context) => {
  const id = Number(ctx.params.itemId);
  ctx.response.body = await getItem(id);
};

// create item

const createItemC = async (ctx: Koa.Context) => {
  const item = ctx.request.body;
  ctx.response.body = await createItem(item);
};

// edit item

const editItemC = async (ctx: Koa.Context) => {
  const id = Number(ctx.params.itemId);
  const item = ctx.request.body;
  ctx.response.body = await editItem(id, item);
};

// delete item

const deleteItemC = async (ctx: Koa.Context) => {
  const id = Number(ctx.params.itemId);
  ctx.response.body = await deleteItem(id);
};

const itemControllers = {
  getAllItemsC: getAllItemsC,
  getItemByIdC: getItemByIdC,
  createItemC: createItemC,
  editItemC: editItemC,
  deleteItemC: deleteItemC,
};

export default itemControllers;
