import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../../../util/error";
import joi_login from "../../../util/joi/login";

export default (req: Request, res: Response, next: NextFunction) => {
    let validation = joi_login.validate(req.body);
    if (validation.error) next(new BadRequest({ message: validation.error.message, details: [validation.error.details] }))
    next();
}