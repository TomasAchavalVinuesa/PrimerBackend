import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique: true, //añadidos por mi
            trim: true
        },
        username:{
            type:String,
            required:true,
            unique: true, //añadidos por mi
            trim: true
        },
        password:{
            type:String,
            required:true
        },
        name:{
            first:{
                type:String,
                required:false,
                trim: true //añadido por mi
            },
            last:{
                type:String,
                required:false,
                trim: true //añadido por mi
            }
        }
    }, { collection: 'user' }
);

export default mongoose.model('user', userSchema);