import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        story: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'story',
            required: true
        },
        created: {
            type: Date,
            default: () => Date.now(),
            required: false
        },
        dueDate: {
            type: Date,
            required: false
        },
        done: {
            type: Boolean,
            required: false,
            default: false
        }
    }, { collection: 'task' }
);

export default mongoose.model('task', taskSchema);