import express from 'express';
import userController from '../controllers/user.js';
import { verificarToken } from '../helpers/autenticacion.js';

const routesUser = express.Router();


routesUser.get('/profile', verificarToken, userController.profile);
routesUser.get('/', verificarToken, userController.getAll);
routesUser.get('/:id', verificarToken, userController.getOneById);


export default routesUser;
