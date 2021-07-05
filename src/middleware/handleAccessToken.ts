import { NextFunction, Request, Response } from "express"
import configuration from "../config";
import { userHttp } from "../util/axios/userService";
import decodeJwt from "../util/jsonwebtoken/decodeJwt";
import generateAccessToken from "../util/jsonwebtoken/generateAccessToken";
import verifyJwt from "../util/jsonwebtoken/verifyJwt";
export default async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        let authorization: string = req.headers.authorization;
        let accessToken = authorization.split(" ")[1];
        try {
            let payload = <any>verifyJwt(accessToken, configuration.jwt.secret);
            let response = await userHttp.get('/user', { params: { username: payload.username } })
            let { data } = response;
            if (data.result && (data.result.length >= 1)) req.user = data.result[0];
            return next()
        } catch (e) {
            if (e.message == "jwt expired") {
                let payload = decodeJwt(accessToken);
                accessToken = generateAccessToken(payload, configuration.jwt.secret)
                res.set("Authorization", accessToken);
            };
            return next();
        }
    };
    return next();
}