import jwt from 'jsonwebtoken';
const verifyJwt = (token: string, secret: string) => {
    let result = jwt.verify(token, secret);
    return result;
}

export default verifyJwt;