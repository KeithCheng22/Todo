'use client'
import Link from "next/link";
import { useState, useEffect } from "react";
import Todo from "@/components/Todo";
import { useRouter } from "next/navigation";

const LoadingAnimation = () => {
  return <span className="loading-dots p-10 text-2xl text-white mt-2">
      Loading
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </span>;
};

export default function Home() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(true)

  const router = useRouter()

  const onChecked = async (id, isCompleted) => {
    setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo._id === id ? { ...todo, completed: !isCompleted } : todo
    ))

    const res = await fetch(`/api/checked/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({id, isCompleted}),
      cache: 'no-store'
    })
  }

  const handleDelete = async (id) => {
    const res = await fetch(`/api/checked/${id}`, {
      method:'DELETE',
      body: JSON.stringify({id}),
      cache: 'no-store'
    })
    if (res.ok) {
      const filteredTodos = todos.filter(todo => todo._id !== id)
      setTodos(filteredTodos)
    }
  }

  const handleEdit = async (id) => {
    router.push(`edit/${id}`)
  }


  const TodoList = todos.map(todo => <Todo key={todo._id} todo={todo.todo} completed={todo.completed} handleChecked={() => onChecked(todo._id, todo.completed)} handleDelete={() => handleDelete(todo._id)} handleEdit={() => handleEdit(todo._id)}/>)

  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch('/api/get-todo', {cache: 'no-store'})
      const data = await res.json()
      if (!res.ok) {
        console.log(res.status)
      }
      setTodos(data)
      setIsLoading(false)
    }
    getTodos();
  }, [])

  return (
    <main>

      <header className="flex justify-between items-center p-10 text-white">
        <h1 className="text-4xl">TODO</h1>
        <Link className='text-3xl border py-1 px-3 hover:bg-white hover:bg-opacity-25 rounded-md' href='new-todo'>New</Link>
      </header>

      {TodoList.length !== 0 ? todos.filter(todo => !todo.completed).length === 0 ? <h1 className="text-2xl text-green-400 px-10 underline">All done!</h1> : <section>
        <h1 className="text-2xl text-white px-10 underline">Pending Todos: <span className="text-red-400">{todos.filter(todo => !todo.completed).length}</span></h1>
      </section> : ''}

      {isLoading ? <LoadingAnimation /> : TodoList.length === 0 ? <h1 className="text-2xl text-white px-10">No todos yet... ¯\_(ツ)_/¯</h1> :
      <section className="p-10">
        {TodoList}
      </section>}

    </main>
  );
}
