import express from 'express';
const routesStory = express.Router();
import storyController from '../controllers/story.js';
import { verificarToken } from '../helpers/autenticacion.js';

routesStory.post('/', verificarToken, storyController.create);
routesStory.get('/my-stories', verificarToken, storyController.getMyStories);
routesStory.get('/:id', verificarToken, storyController.getOne);
routesStory.get('/', verificarToken, storyController.getAll);
routesStory.put('/:id', verificarToken, storyController.update);
routesStory.delete('/:id', verificarToken, storyController.delete);
routesStory.get('/:id/tasks', verificarToken, storyController.getAllOfOne);

export default routesStory;