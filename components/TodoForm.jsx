import React from 'react'
import Link from 'next/link'

const TodoForm = ({ type, handleSubmit, handleChange, formData}) => {

  return (
    <>
    <header className="flex justify-between items-center p-10 text-white">
      <h1 className="text-4xl">{type} TODO</h1>
    </header>

    <form className='p-10 flex flex-col' onSubmit={handleSubmit}>
      <input onChange={handleChange} value={formData.todo} className='bg-transparent border-2 indent-2 outline-none text-white h-10 rounded-md' name='todo' placeholder='Buy Milk...' autoFocus></input>

      <div className='mt-3 flex justify-end gap-3 w-full'>
        <button type='submit' className='border py-1 px-2 hover:bg-white hover:bg-opacity-25 text-white rounded-md'>{type}</button>
        <Link href='..' className='border py-1 px-2 hover:bg-white hover:bg-opacity-25 text-white rounded-md'>Cancel</Link>
      </div>
    </form>
    </>
  )
}

export default TodoForm