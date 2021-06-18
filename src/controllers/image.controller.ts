/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary from 'cloudinary';
import { Request, Response } from 'express';
import { responseBadRequest, responseSuccess } from '../helpers/response';

const uploadPicture = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { file } = req.files as any;
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            return responseBadRequest(
                res,
                'File không đúng định dạng png|jpeg !',
            );
        }
        cloudinary.v2.uploader.upload(
            file.tempFilePath,
            (err: any, result: any) => {
                return responseSuccess(res, {
                    success: true,
                    file: {
                        width: result.width,
                        height: result.height,
                        url: result.url,
                    },
                });
            },
        );
    } catch (error) {
        return responseBadRequest(res, error.message ?? error);
    }
};

export default {
    uploadPicture,
};
