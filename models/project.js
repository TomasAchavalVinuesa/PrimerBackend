import Project from '../schemas/project.js';
import Epic from '../schemas/epic.js';
import mongoose from 'mongoose';

class projectModel{

    async create(project){
        return await Project.create(project);
    }

    async getAll(){
        return await Project.find();
    }

    async getOne(id){
        return await Project.findById(id);
    }

    async update(id, project){
        return await Project.findOneAndUpdate( {_id: new mongoose.Types.ObjectId(id)}, project, { new: true } );
    }

    async delete(id){
        return await Project.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }

    async getAllOfOne(id) {
        return await Epic.find({ project: id });    
    }

    async getMyProjects(userId) {
        return await Project.find({ members: userId });
    }


}

export default new projectModel();