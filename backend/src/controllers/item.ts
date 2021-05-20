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
  ctx.response.body = await getAllItems(ctx);
};

const getItemByIdController = async (ctx: Koa.Context) => {
  const id = Number(ctx.params.itemId);
  ctx.response.body = await getItem(ctx, id);
};

const createItemController = async (ctx: Koa.Context) => {
  const item = ctx.request.body;
  if (!item) {
    ctx.response.body = {
      message: "Content can not be empty!"
    };
    return;
  }

  try {
    const res = await createItem(ctx, item);
    ctx.response.body = {
      res,
      message: 'Item was created successfully.',
    };
  } catch (err) {
    ctx.response.body = {
      message: 'Error occured creating Item',
    };
  }
};

const editItemController = async (ctx: Koa.Context) => {
  const id = Number(ctx.params.itemId);
  const item = ctx.request.body;
  try {
    const res = await editItem(ctx, id, item);
    if (res) {
      ctx.response.body = {
        res,
        message: 'Item was updated successfully.',
      };
    } else {
      ctx.response.body = {
        message: `Cannot update Item with id=${id}. Maybe Item was not found or ctx.body is empty!`,
      };
    }
  } catch (err) {
    ctx.response.body = {
      message: `Error occured updating Item with id=${id}`,
    };
  }
};

const deleteItemController = async (ctx: Koa.Context) => {
  const id = Number(ctx.params.itemId);
  try {
    const res = await deleteItem(ctx, id);
    if (res) {
      ctx.response.body = {
        res,
        message: 'Item was deleted successfully.',
      };
    } else {
      ctx.response.body = {
        message: `Cannot delete Item with id=${id}. Maybe Item was not found`,
      };
    }
  } catch (err) {
    ctx.response.body = {
      message: `Error occured deleting Item with id=${id}`,
    };
  }
};

const getAllItemsPaginationController = async (ctx: Koa.Context) => {
  const queryParams = ctx.request.query;
  ctx.response.body = await getPaginationData(ctx, queryParams);
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
