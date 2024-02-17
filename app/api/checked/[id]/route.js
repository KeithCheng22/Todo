import Todo from "@/models/todo";
import { connectToDB } from "@/utils/database"

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const todoData = await Todo.findById(params.id)

        return new Response(JSON.stringify(todoData), {status: 200})
    } catch(error) {
        return new Response({message: error.message, status: 500}) 
    }
}

export const PATCH = async (req, res) => {
    const { id, isCompleted } = await req.json()
    try {
        await connectToDB();
        const existingTodo = await Todo.findByIdAndUpdate(id, {completed: !isCompleted})

        return new Response(JSON.stringify(existingTodo), {status: 200})
    } catch(error) {
        return new Response({message: error.message, status: 500}) 
    }
}

export const PUT = async (req, { params }) => {
    const data = await req.json()
    try {
        await connectToDB();
        if (data.todo === '') {
            return new Error({message: 'Todo cannot be empty!', status: 401})
        }

        const existingTodo = await Todo.findByIdAndUpdate(params.id, {todo: data.todo, completed: false})

        return new Response(JSON.stringify(existingTodo), {status: 200})
    } catch(error) {
        return new Response({message: error.message, status: 500}) 
    }
}

export const DELETE = async (req, res) => {
    const { id } = await req.json()
    try {
        await connectToDB();
        const existingTodo = await Todo.findByIdAndDelete(id)

        return new Response(JSON.stringify(existingTodo), {status: 200})
    } catch(error) {
        return new Response({message: error.message, status: 500}) 
    }
}