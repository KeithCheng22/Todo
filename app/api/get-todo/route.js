import { connectToDB } from "@/utils/database";
import Todo from "@/models/todo";

// GET REQUEST
export const GET = async (res, req) => {
    try {
        await connectToDB();
        const allTodos = await Todo.find().sort({completed: 1})
        res.setHeader(
            "Cache-Control",
            "no-cache, no-store, max-age=0, must-revalidate"
          );

        return new Response(JSON.stringify(allTodos), {status: 200})
    } catch(error) {
        return new Response({message: error.message, status: 500}) }
}