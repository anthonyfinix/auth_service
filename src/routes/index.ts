import express, { Router } from 'express';
// utility routes
import error from './error_handler';
import not_found from './not_found';
// entities
import login from '../login/controller/index';
import register from '../register/controller/index';
import accessToken from '../accessToken/controller/index';
import refreshToken from '../refreshToken/controller/index';
import expressJson from '../middleware/expressJson';
import urlEncoded from '../middleware/urlEncoded';
import currentUser from '../currentUser/index';
import post from '../login/validator/post/post';
import error_handler from './error_handler';

const router: Router = express.Router();
router.get('/', (req, res) => { res.send('auth_service') })
router.post('/login', urlEncoded(), error_handler, expressJson(), post, login);
router.post('/register', register)
router.get('/accessToken', accessToken)
router.get('/refreshToken', refreshToken)
router.get('/currentUser',currentUser);
router.use(not_found);
router.use(error);

export default router;