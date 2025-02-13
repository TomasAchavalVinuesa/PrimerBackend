import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        }],
        description: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: false
        }
    },{ collection: 'project' }
);

export default mongoose.model('project', projectSchema);