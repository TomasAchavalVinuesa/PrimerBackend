import express from 'express';
import authController from '../controllers/auth.js';

const routesAuth = express.Router();

routesAuth.post('/register', authController.register);
routesAuth.post('/login', authController.login);
routesAuth.get('/check-email', authController.verificarEmail);
routesAuth.get('/check-username', authController.verificarUsername);
//routesAuth.post('/logout', authController.logout); queda el problema de repetición de tokens ¿que pasa si tengo un token en blackList y tiempo después se vuelve a generar en un login válido?


export default routesAuth;