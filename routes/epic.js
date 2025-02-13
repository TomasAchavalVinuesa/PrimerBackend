import express from 'express';
const routesEpic = express.Router();
import epicController from '../controllers/epic.js';
import { verificarToken } from '../helpers/autenticacion.js';

routesEpic.post('/', verificarToken, epicController.create);
routesEpic.get('/:id', verificarToken, epicController.getOne);
routesEpic.get('/', verificarToken, epicController.getAll);
routesEpic.put('/:id', verificarToken, epicController.update);
routesEpic.delete('/:id', verificarToken, epicController.delete);
routesEpic.get('/:id/stories', verificarToken, epicController.getAllOfOne);

export default routesEpic;

