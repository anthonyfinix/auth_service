import jwt from 'jsonwebtoken';
const decodeJwt = (token: string) => {
    let result = jwt.decode(token);
    return result;
}

export default decodeJwt;