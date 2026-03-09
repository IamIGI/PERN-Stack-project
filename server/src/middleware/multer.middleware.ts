import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join('public', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // set the directory where uploaded file will be stored
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    //set the name of the uploaded file
    const uniqueSuffix =
      Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = `${uniqueSuffix}-${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter: multer.Options['fileFilter'] = (
  req,
  file,
  callback,
) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    return callback(null, true);
  }

  callback(
    new Error('Only PNG, JPG, JPEG images are allowed'),
  );
};

const upload = multer({ storage, fileFilter });

export default upload;
