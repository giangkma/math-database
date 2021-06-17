import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { fileNamePictures } from '../config';
import imageController from '../controllers/image.controller';

const router = express.Router();

const uploadImage = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            const path = `${process.cwd()}/public/${fileNamePictures}`;
            try {
                fs.lstatSync(path).isDirectory();
            } catch (e) {
                if (e.code === 'ENOENT') {
                    fs.mkdirSync(path, { recursive: true });
                } else {
                    throw e;
                }
            }
            callback(null, path);
        },
        filename: (req, file, callback) => {
            if (
                file.mimetype !== 'image/png' &&
                file.mimetype !== 'image/jpeg'
            ) {
                return callback(new Error('Only picture are allowed.'), null);
            }
            const _filename = `${
                file.originalname.split('.')[0]
            }_${new Date().getTime()}${path.extname(file.originalname)}`;
            return callback(null, _filename);
        },
    }),
});

const uploadPictureFile = uploadImage.single('file');

router.post('/upload', uploadPictureFile, imageController.uploadPicture);

export default router;
