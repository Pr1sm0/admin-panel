import * as Koa from 'koa';
import * as Joi from 'joi';
import {
  createItem,
  deleteItem,
  editItem,
  getAllItems,
  getItem,
} from '../db/queries/item';
import { getPaginationData } from '../services/pagination';
import { Item } from '../interfaces';

const itemSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),

  price: Joi.number().min(0).required(),

  description: Joi.string().min(3).max(1000).required(),

  is_published: Joi.boolean().required(),
});

const getAllItemsController = async (ctx: Koa.Context) => {
  ctx.response.body = await getAllItems(ctx);
};

const getItemByIdController = async (ctx: Koa.Context) => {
  const id = Number(ctx.params.itemId);
  ctx.response.body = await getItem(ctx, id);
};

const createItemController = async (ctx: Koa.Context) => {
  try {
    const item: Item = {
      name: ctx.request.body.name,
      price: ctx.request.body.price,
      description: ctx.request.body.description,
      is_published: ctx.request.body.is_published,
    };

    const validatedItem = await itemSchema.validateAsync(item);

    const res = await createItem(ctx, validatedItem);
    if (res) {
      ctx.response.body = {
        res,
        message: 'Item was created successfully.',
      };
    } else {
      ctx.response.body = {
        message: 'Cannot create Item.',
      };
    }
  } catch (err) {
    ctx.throw(err.status, err);
  }
};

const editItemController = async (ctx: Koa.Context) => {
  try {
    const id = Number(ctx.params.itemId);
    const item: Item = {
      name: ctx.request.body.name,
      price: ctx.request.body.price,
      description: ctx.request.body.description,
      is_published: ctx.request.body.is_published,
    };

    const validatedItem = await itemSchema.validateAsync(item);

    const res = await editItem(ctx, id, validatedItem);
    if (res) {
      ctx.response.body = {
        res,
        message: 'Item was updated successfully.',
      };
    } else {
      ctx.response.body = {
        message: 'Cannot update Item.',
      };
    }
  } catch (err) {
    ctx.throw(err.status, err);
  }
};

const deleteItemController = async (ctx: Koa.Context) => {
  const id = Number(ctx.params.itemId);
  const res = await deleteItem(ctx, id);
  if (res) {
    ctx.response.body = {
      res,
      message: 'Item was deleted successfully.',
    };
  } else {
    ctx.response.body = {
      message: 'Cannot delete Item.',
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
