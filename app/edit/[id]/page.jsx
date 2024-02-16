'use client'
import TodoForm from '@/components/TodoForm'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

const newTodo = () => {

    const [formData, setFormData] = useState({
        todo: '',
    })

    const params = useParams();

    useEffect(() => {
        const getTodo = async () => {
            const res = await fetch(`/api/checked/${params.id}`)
            const data = await res.json()
            setFormData({todo: data.todo})
        }
        getTodo();
    }, [])



const [error, setError] = useState(false)

function handleChange(e) {
    const {name, value} = e.target;
    setFormData(prevForm => ({
        ...prevForm, 
        [name]: value
    }))
}

  const router = useRouter()

  const editTodo = async (e) => {
    e.preventDefault()

    const res = await fetch(`/api/checked/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(formData)
    })
    if (!res.ok) {
      setError(true)
    } else {
      router.push('/')
    }

  }

  return (
    <>
    <TodoForm type='Edit' handleSubmit={editTodo} handleChange={handleChange} formData={formData}/>
    {error && <h1 className='px-10 text-3xl text-red-300'>Error! Todo cannot be empty!</h1>}
    </>
  )

}

export default newTodo