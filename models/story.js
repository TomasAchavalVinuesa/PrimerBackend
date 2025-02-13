import Story from '../schemas/story.js';
import Task from '../schemas/task.js';
import mongoose from 'mongoose';

class storyModel{

    async create(story){
        return await Story.create(story);
    }

    async getAll(){
        return await Story.find();
    }

    async getOne(id){
        return await Story.findById(id);
    }

    async update(id, story){
        return await Story.findOneAndUpdate( {_id: new mongoose.Types.ObjectId(id)}, story, { new: true } );
    }

    async delete(id){
        return await Story.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }

    async getAllOfOne(id) {
        return await Task.find({ story: id });    
    }

    async getMyStories(userId) {
        return await Story.find({ $or: [{ assignedTo: userId }, { owner: userId }]  });
    }

}

export default new storyModel();