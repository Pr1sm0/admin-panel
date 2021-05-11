import * as multer from '@koa/multer';
import * as path from 'path';

const NUMBER_OF_NON_FILE_FIELDS = 10;
const FILE_SIZE_UNIT_BYTES = 2048 * 2048;
const NUMBER_OF_DOCUMENTS = 1;
const RADIX = 16;
const WRONG_FILE_FORMAT_ERROR_MESSAGE = 'Please, upload jpg, jpeg or png file.';


//Upload File Storage Path and File Naming

const storage = multer.diskStorage({
  destination: function (ctx: any, file: any, cb: any) {
    cb(null, path.join(__dirname, '/public/images/'));
  },
  filename: function (ctx: any, file: any, cb: any) {
    let type = file.originalname.split('.')[1];
    cb(null, `${file.fieldname}-${Date.now().toString(RADIX)}.${type}`);
  },
});

//File upload restrictions

const limits = {
  fields: NUMBER_OF_NON_FILE_FIELDS,
  fileSize: FILE_SIZE_UNIT_BYTES,
  files: NUMBER_OF_DOCUMENTS,
};

function fileFilter(ctx: any, file: any, cb: any) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error(WRONG_FILE_FORMAT_ERROR_MESSAGE));
  }
  cb(undefined, true);
}

export const upload = multer({ storage, limits, fileFilter });
