import { connectToDB } from "@/utils/database"
import Todo from "@/models/todo";

export const POST = async (req, res) => {
    const formData = await req.json()

    try {
        await connectToDB();
        if (formData.todo === '') {
            return new Error({message: 'Todo cannot be empty!', status: 401})
        }

        const newTodo = await Todo({todo: formData.todo})
        await newTodo.save()
        
        return new Response({message: 'Success', status: 201})
    } catch(error) {
        return new Response({message: error.message, status: 500})
    }
}