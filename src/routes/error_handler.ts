import { Response, Request, ErrorRequestHandler, NextFunction } from "express";
import configuration from "../config";
import { GeneralError, IError } from "../util/error/index";
export default (err: ErrorRequestHandler | Error, req: Request, res: Response, next: NextFunction) => {
    if(configuration.env == "development") console.log(err)
    if (err instanceof GeneralError) return res.status(err.status).json({ error: err.message, details: err.details })
    if (err instanceof SyntaxError) {
        let error: IError = <IError><unknown>err;
        return res.status(error.status ? error.status : 400).json({ error: err.message, details: err })
    }
    return res.status(400).json({ error: err });
}