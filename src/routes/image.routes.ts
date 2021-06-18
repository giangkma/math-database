import express from 'express';
import imageController from '../controllers/image.controller';

const router = express.Router();

router.post('/upload', imageController.uploadPicture);

export default router;
