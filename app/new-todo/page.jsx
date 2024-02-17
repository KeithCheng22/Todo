'use client'
import TodoForm from '@/components/TodoForm'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const newTodo = () => {

  const [formData, setFormData] = useState({
    todo: '',
})

const [error, setError] = useState(false)

function handleChange(e) {
    const {name, value} = e.target;
    setFormData(prevForm => ({
        ...prevForm, 
        [name]: value
    }))
}

  const router = useRouter()

  const addTodo = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/add-todo', {
      method: 'POST',
      body: JSON.stringify({todo: formData.todo}),
      cache: 'no-store'
    })
    if (!res.ok) {
      setError(true)
    } else {
      router.push('/')
    }
    
    

  }

  return (
    <>
    <TodoForm type='Add' handleSubmit={addTodo} handleChange={handleChange} formData={formData}/>
    {error && <h1 className='px-10 text-3xl text-red-300'>Error! Todo cannot be empty!</h1>}
    </>
  )

}

export default newTodo