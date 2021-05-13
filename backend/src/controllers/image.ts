import * as Koa from 'koa';
import {
  addImage,
} from '../db/queries/image';

const addImageController = async (ctx: Koa.Context) => {
  const image = ctx.request.body;
  image.imageUrl = ctx.request.file.path;
  ctx.response.body = await addImage(image);
};

const imageControllers = {
  addImageController,
};

export default imageControllers;