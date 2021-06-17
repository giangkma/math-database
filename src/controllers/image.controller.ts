import { Request, Response } from 'express';
import { fileNamePictures } from '../config';
import { responseBadRequest, responseSuccess } from '../helpers/response';

const uploadPicture = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { file } = req;
        // Return new path of uploaded file
        file.path = `${req.protocol}://${req.get('host')}/${fileNamePictures}/${
            file.filename
        }`;
        return responseSuccess(res, file);
    } catch (error) {
        return responseBadRequest(res, error.message ?? error);
    }
};

export default {
    uploadPicture,
};
