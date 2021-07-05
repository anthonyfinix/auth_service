import jwt,{JwtPayload, SignOptions} from 'jsonwebtoken';

export default (payload: JwtPayload, secret: string, options?: SignOptions) => {
    if (!options) options = {};
    return jwt.sign({}, secret, options)
}