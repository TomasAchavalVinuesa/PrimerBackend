import taskModel from '../models/task.js';
import { ObjectId } from 'mongodb';

class taskController{
    constructor(){

    }

    async create(req, res){
        try{
        
            const { name, description, story, dueDate, done } = req.body;
            const formattedStory =  new ObjectId(story);

            const data = await taskModel.create({
                name,
                description,
                story: formattedStory,
                dueDate,
                done
            });
            res.status(201).json(data);
        }catch (e){
            res.status(500).send(e);
        }
    }

    async update(req, res){
        try{
            const { name, description, story, dueDate, done } = req.body;
            const formattedStory =  new ObjectId(story);

            const { id } = req.params
            const data = await taskModel.update(id, {
                name,
                description,
                story: formattedStory,
                dueDate,
                done
            });
            res.status(200).json(data);
        }catch (e){
            res.status(500).send(e);
        }
    }

    async getOne(req, res){
        try{
            const {id} = req.params;
            const data = await taskModel.getOne(id);
            res.status(201).json(data);
        }catch (e){
            res.status(500).send(e);
        }
    }

    async getAll(req, res){
        try{
            const data = await taskModel.getAll();
            res.status(201).json(data);
        }catch (e){
            res.status(500).send(e);
        }
    }

    async delete(req, res){
        try{
            const { id } = req.params
            const data = await taskModel.delete(id, req.body);
            res.status(206).json(data);
        }catch (e){
            res.status(500).send(e);
        }
    }
}

export default new taskController();