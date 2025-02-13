import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        minlength: [10, 'La descripción debe tener al menos 10 caracteres.'],
        required: false
    },
    epic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'epic',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false
    },
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false
    }],
    points: {
        type: Number,
        required: false,
        default: 0,
        min: 0,
        max: 5
    },
    created: {
        type: Date,
        default: () => Date.now(),
        required: false
    },
    due: {
        type: Date,
        required: false
    },
    started: {
        type: Date,
        required: false
    },
    finished: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        enum: ['todo', 'running', 'done'],
        required: false,
        default: 'todo'
    },
    icon: {
        type: String,
        required: false
    }   
    }, { collection: 'story' }
);

export default mongoose.model('story', storySchema);