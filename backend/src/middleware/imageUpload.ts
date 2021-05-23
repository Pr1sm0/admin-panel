import * as multer from '@koa/multer';
import * as Koa from 'koa';
import * as path from 'path';
import * as sharp from 'sharp';

const NUMBER_OF_NON_FILE_FIELDS = 10;
const FILE_SIZE_UNIT_BYTES = 2048 * 2048;
const NUMBER_OF_DOCUMENTS = 1;
const WRONG_FILE_FORMAT_ERROR_MESSAGE = 'Please, upload jpg, jpeg or png file.';

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1; 
const currentDay = date.getDate();
const currentHours = date.getHours();
const currentMinutes = date.getMinutes();
const currentSeconds = date.getSeconds();

//Upload File Storage Path and File Naming

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, path.join(`${__dirname}/../../public/images/original`));
  },
  filename: function (req: any, file: any, cb: any) {
    const imageName = file.originalname;
    cb(null, `original-${currentDay}-${currentMonth}-${currentYear}-${currentHours}-${currentMinutes}-${currentSeconds}-${imageName}`);
  },
});

//File upload restrictions

const limits = {
  fields: NUMBER_OF_NON_FILE_FIELDS,
  fileSize: FILE_SIZE_UNIT_BYTES,
  files: NUMBER_OF_DOCUMENTS,
};

function fileFilter(req: any, file: any, cb: any) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error(WRONG_FILE_FORMAT_ERROR_MESSAGE));
  }
  cb(undefined, true);
}

export const upload = multer({ storage, limits, fileFilter });

export const resizeImage = async (ctx: Koa.Context, next: any) => {
  if (!ctx.request.file) return await next();
  const imageName = ctx.request.file.originalname;
  const largeImageName = `large-${currentDay}-${currentMonth}-${currentYear}-${currentHours}-${currentMinutes}-${currentSeconds}-${imageName}`;
  const smallImageName = `small-${currentDay}-${currentMonth}-${currentYear}-${currentHours}-${currentMinutes}-${currentSeconds}-${imageName}`;

  await sharp(ctx.request.file.path)
    .resize(640, 320)
    .jpeg({ quality: 90 })
    .toFile(path.resolve(ctx.request.file.destination, '../large', largeImageName));
  
  await sharp(ctx.request.file.path)
    .resize(320, 320)
    .jpeg({ quality: 90 })
    .toFile(path.resolve(ctx.request.file.destination, '../small', smallImageName));
    const imageNames = {
      largeImageName,
      smallImageName
    }
  ctx.request.body.images = imageNames;
  await next();
};
