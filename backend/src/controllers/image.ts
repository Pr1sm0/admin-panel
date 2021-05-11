import * as Koa from 'koa';
import {
  addImage,
} from '../db/queries/image';

const addImageController = async (ctx: Koa.Context) => {
  const image = ctx.request.body;
  ctx.response.body = await addImage(image);
};

const imageControllers = {
  addImageController,
};

export default imageControllers;