import storyModel from '../models/story.js';
import userModel from '../models/user.js';
import { ObjectId } from 'mongodb';


class storyController{
    constructor(){

    }

    async create(req, res){
        try{
        
            const { name, description, epic, owner, assignedTo, points, due, started, finished, status, icon } = req.body;
            const formattedEpic =  new ObjectId(epic);
            const formattedOwner =  new ObjectId(owner);
            const formattedAssignedTo = assignedTo.map(id => new ObjectId(id));

            const data = await storyModel.create({
                name,
                description,
                epic: formattedEpic,
                owner: formattedOwner,
                assignedTo: formattedAssignedTo,
                points,
                due,
                started,
                finished,
                status,                
                icon
            });
            res.status(201).json(data);
        }catch (e){
            res.status(500).send(e);
        }
    }

    async update(req, res){
        try{
            const { name, description, epic, owner, assignedTo, points, due, started, finished, status, icon } = req.body;
            const formattedEpic =  new ObjectId(epic);
            const formattedOwner =  new ObjectId(owner);
            const formattedAssignedTo = assignedTo.map(id => new ObjectId(id));
            const { id } = req.params
            const data = await storyModel.update(id, {
                name,
                description,
                epic: formattedEpic,
                owner: formattedOwner,
                assignedTo: formattedAssignedTo,
                points,
                due,
                started,
                finished,
                status,                
                icon
            });
            res.status(200).json(data);
        }catch (e){
            res.status(500).send(e);
        }
    }

    async getOne(req, res){
        try{
            const {id} = req.params;
            const data = await storyModel.getOne(id);
            res.status(201).json(data);
        }catch (e){
            res.status(500).send(e);
        }
    }

    async getAll(req, res){
        try{
            const data = await storyModel.getAll();
            res.status(201).json(data);
        }catch (e){
            res.status(500).send(e);
        }
    }

    async delete(req, res){
        try{
            const { id } = req.params
            const data = await storyModel.delete(id, req.body);
            res.status(206).json(data);
        }catch (e){
            res.status(500).send(e);
        }
    }


    async getAllOfOne(req, res) {
        try {
            const { id } = req.params;
    
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ error: "El ID proporcionado no es válido" });
            }
    
            const data = await storyModel.getAllOfOne(id);
    
            if (data.length === 0) {
                return res.status(200).json([]);
            }
    
            res.status(200).json(data);
        } catch (e) {
            console.error("Error al obtener stories:", e);
            res.status(500).send(e.message || "Error interno del servidor");
        }
    }

    async getMyStories(req, res) {
        try {
            if (!req.usernameConectado) {
                return res.status(400).json({ error: 'No se encontró el usuario en la solicitud' });
            }
    
            const user = await userModel.getOne({ username: req.usernameConectado });
    
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
    
            const userId = user._id; 
            const stories = await storyModel.getMyStories(userId);
    
            res.status(200).json(stories);
        } catch (e) {
            res.status(500).json({ error: 'Error en el servidor', details: e.message });
        }
    }
}

export default new storyController();