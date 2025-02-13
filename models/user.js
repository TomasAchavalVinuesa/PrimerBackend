import User from '../schemas/user.js';
import mongoose from 'mongoose';

class userModel{

    async create(user){
        return await User.create(user);
    }

    async getAll(){
        return await User.find();
    }

    async getOneById(id){
        return await User.findById(id);
    }

    async getOne(filtro){
        return await User.findOne(filtro);
    }

    async update(id, user){
        return await User.findOneAndUpdate( {_id: new mongoose.Types.ObjectId(id)}, user, { new: true } );
    }

    async delete(id){
        return await User.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }

}

export default new userModel();