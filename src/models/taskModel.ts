import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    owner: String,
    name: String,
    description: String,
    category: String
});

export const taskModel = mongoose.model('tasks', taskSchema);