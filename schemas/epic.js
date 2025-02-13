import mongoose from "mongoose";

const epicSchema = new mongoose.Schema(
    {
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "project",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: false
        }
    }, { collection: 'epic' }
);

export default mongoose.model('epic', epicSchema);