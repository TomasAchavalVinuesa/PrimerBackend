import express from 'express';
const routesTask = express.Router();
import taskController from '../controllers/task.js';
import { verificarToken } from '../helpers/autenticacion.js';

routesTask.post('/', verificarToken, taskController.create);
routesTask.get('/:id', verificarToken, taskController.getOne);
routesTask.get('/', verificarToken, taskController.getAll);
routesTask.put('/:id', verificarToken, taskController.update);
routesTask.delete('/:id', verificarToken, taskController.delete);

export default routesTask;