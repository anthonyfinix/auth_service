import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    let { user } = <any>req;
    if (user) return res.json({ message: "success", result: user })
    res.json({ error: "not user token found", details: [] })
}