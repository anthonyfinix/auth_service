import { Request, Response, NextFunction } from 'express';
import { NotFound } from '../util/error/index';
export default (req: Request, res: Response, next: NextFunction) => {
    return next(new NotFound({}));
}