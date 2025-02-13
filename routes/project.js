import express from 'express';
import projectController from '../controllers/project.js';
import { verificarToken } from '../helpers/autenticacion.js';

const routesProject = express.Router();

routesProject.post('/', verificarToken, projectController.create);
routesProject.get('/my-projects', verificarToken, projectController.getMyProjects);
routesProject.get('/:id', verificarToken, projectController.getOne);
routesProject.get('/', verificarToken, projectController.getAll);
routesProject.put('/:id', verificarToken, projectController.update);
routesProject.delete('/:id', verificarToken, projectController.delete);
routesProject.get('/:id/epics', verificarToken, projectController.getAllOfOne);


export default routesProject;
