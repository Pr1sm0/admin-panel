import * as Koa from 'koa';
import {
  addImage, getAllImagesByItemId, getImageByItemId,
} from '../db/queries/image';
import { Image } from '../interfaces';

const addImageController = async (ctx: Koa.Context) => {
  const originalImage: Image = ctx.request.body;
  originalImage.size = 'original';
  originalImage.image_url = `http://localhost:8080/images/original/${ctx.request.file.filename}`;
  const res = await addImage(ctx, originalImage);

  const largeImage: Image = ctx.request.body;
  largeImage.size = 'large';
  largeImage.image_url = `http://localhost:8080/images/large/${ctx.request.body.images.largeImageName}`;
  await addImage(ctx, largeImage);

  const smallImage: Image = ctx.request.body;
  smallImage.size = 'small';
  smallImage.image_url = `http://localhost:8080/images/small/${ctx.request.body.images.smallImageName}`;
  await addImage(ctx, smallImage);

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