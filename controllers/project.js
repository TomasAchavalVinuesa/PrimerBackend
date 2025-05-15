import projectModel from '../models/project.js';
import { ObjectId } from 'mongodb';
import userModel from '../models/user.js';


class projectController{
    constructor(){

    }

    async create(req, res){
        try{
        
            const { members, name, description, icon } = req.body;
            const formattedMembers = members.map(id => new ObjectId(id));

            const data = await projectModel.create({
                members: formattedMembers,
                name,
                description,
                icon,
            });
            res.status(201).json(data);
        }catch (e){
            res.status(500).send(e);
        }
    }

    async update(req, res){
        try{
            const { members, name, description, icon } = req.body;
            const formattedMembers = members.map(id => new ObjectId(id));
            const { id } = req.params
            const data = await projectModel.update(id, {
                members: formattedMembers,
                name,
                description,
                icon,
            });
            res.status(200).json(data);
        }catch (e){
            res.status(500).send(e);
        }
    }

    async getOne(req, res){
        try{
            const {id} = req.params;
            const data = await projectModel.getOne(id);
            res.status(201).json(data);
        }catch (e){
            res.status(500).send(e);
        }
    }

    async getAll(req, res){
        try{
            const data = await projectModel.getAll();
            res.status(201).json(data);
        }catch (e){
            res.status(500).send(e);
        }
    }

    async delete(req, res){
        try{
            const { id } = req.params
            const data = await projectModel.delete(id, req.body);
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
    
            const data = await projectModel.getAllOfOne(id);
    
            if (data.length === 0) {
                return res.status(200).json([]);
            }
    
            res.status(200).json(data);
        } catch (e) {
            console.error("Error al obtener epics:", e);
            res.status(500).send(e.message || "Error interno del servidor");
        }
    }

    async getMyProjects(req, res) {
        try {
            if (!req.usernameConectado) {
                return res.status(400).json({ error: 'No se encontró el usuario en la solicitud' });
            }
    
            const user = await userModel.getOne({ username: req.usernameConectado });
    
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
    
            const userId = user._id; 
            const projects = await projectModel.getMyProjects(userId);
    
            res.status(200).json(projects);
        } catch (e) {
            res.status(500).json({ error: 'Error en el servidor', details: e.message });
        }
    }
}

export default new projectController();