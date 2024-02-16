import { Schema, models, model } from "mongoose";

const todoSchema = new Schema({
    todo: {
        type: String,
        required: [true, 'Todo is required!']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Todo = models.Todo || model('Todo', todoSchema)
export default Todo