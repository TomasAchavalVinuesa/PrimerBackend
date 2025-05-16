import epicModel from '../models/epic.js';
import { ObjectId } from 'mongodb';


class epicController{
    constructor(){

    }

    async create(req, res){
        try{
        
            const { project, name, description, icon } = req.body;
            const formattedProject = new ObjectId(project);

            const data = await epicModel.create({
                project: formattedProject,
                name,
                description,
                icon
            });
            res.status(201).json(data);
        }catch (e){
            res.status(500).send(e);
        }
    }

    async update(req, res){
        try{
            const { id } = req.params
            if(!ObjectId.isValid(id)){
                return res.status(400).json({error: "ID inválido"});
            } //añadir este if en cada petición que lleve id
            const { project, name, description, icon } = req.body;
            const formattedProject = new ObjectId(project);
            
            const data = await epicModel.update(id, {
                project: formattedProject,
                name,
                description,
                icon
            });
            res.status(200).json(data);
        }catch (e){
            console.log(e);
            res.status(500).send(e);
        }
    }

    async getOne(req, res){
        try{
            const {id} = req.params;
            const data = await epicModel.getOne(id);
            res.status(201).json(data);
        }catch (e){
            res.status(500).send(e);
        }
    }

    async getAll(req, res){
        try{
            const data = await epicModel.getAll();
            res.status(201).json(data);
        }catch (e){
            res.status(500).send(e);
        }
    }

    async delete(req, res){
        try{
            const { id } = req.params
            const data = await epicModel.delete(id, req.body);
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
    
            const data = await epicModel.getAllOfOne(id);
    
            if (data.length === 0) {
                return res.status(200).json([]);
            }
    
            res.status(200).json(data);
        } catch (e) {
            console.error("Error al obtener epics:", e);
            res.status(500).send(e.message || "Error interno del servidor");
        }
    }
}

export default new epicController();