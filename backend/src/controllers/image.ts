import * as Koa from 'koa';
import {
  addImage, getAllImagesByItemId, getImageByItemId,
} from '../db/queries/image';

const addImageController = async (ctx: Koa.Context) => {
  const image = ctx.request.body;
  image.image_url = `http://localhost:8080/images/${ctx.request.file.filename}`;
  const res = await addImage(ctx, image);
  if (res) {
    ctx.response.body = {
      res,
      message: 'Image was uploaded successfully.',
    };
  } else {
    ctx.response.body = {
      message: 'Cannot upload Image.',
    };
  }
};

const getImageByItemIdController = async (ctx: Koa.Context) => {
  const id = Number(ctx.params.itemId);
  ctx.response.body = await getImageByItemId(ctx, id);
};

const getAllImagesByItemIdController = async (ctx: Koa.Context) => {
  const id = Number(ctx.params.itemId);
  ctx.response.body = await getAllImagesByItemId(ctx, id);
};

const imageControllers = {
  addImageController,
  getImageByItemIdController,
  getAllImagesByItemIdController
};

export default imageControllers;