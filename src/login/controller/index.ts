import { Request, Response, NextFunction } from "express";
import configuration from "../../config";
import { userHttp } from "../../util/axios/userService";
import passwordCompare from "../../util/bcrypt/compare";
import { InternalError } from "../../util/error";
import generateAccessToken from "../../util/jsonwebtoken/generateAccessToken";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        let response = await userHttp.get('/user', { params: { username: req.body.username } });
        let { data } = response;
        if (data.result && data.result.length > 0) {
            let user = data.result[0];
            if (await passwordCompare(req.body.password, user.password)) {
                let result: any = {
                    name: user.name, primary_number: user.primary_number,
                    secondary_number: user.secondary_number, email: user.email
                }
                try {
                    let payload: object = { username: user.username };
                    let token = generateAccessToken(payload, configuration.jwt.secret, { expiresIn: configuration.jwt.expires });
                    result.accessToken = token;
                    return res.json({ result, message: "successful" });
                } catch (e) {
                    return next(new InternalError({ message: "there was an error", details: [e] }));
                }
            } else {
                return res.json({ error: "password does not match", message: "unsuccessful" })
            }
        }
        return res.json({ error: "no user found", message: "unsuccessful" })
    } catch (e) {
        if (e.response) return res.status(e.response.status).json(e.response.data);
        return next(new InternalError({ message: 'there was an error with user service response', details: [e] }))
    }
}