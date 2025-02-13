import Epic from '../schemas/epic.js';
import Story from '../schemas/story.js';
import mongoose from 'mongoose';

class epicModel{

    async create(epic){
        return await Epic.create(epic);
    }

    async getAll(){
        return await Epic.find();
    }

    async getOne(id){
        return await Epic.findById(id);
    }

    async update(id, epic){
        return await Epic.findOneAndUpdate( {_id: new mongoose.Types.ObjectId(id)}, epic, { new: true } );
    }

    async delete(id){
        return await Epic.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }

    async getAllOfOne(id) {
        return await Story.find({ epic: id });    
    }

}

export default new epicModel();