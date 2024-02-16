'use client'
import Trash from '../assets/images/trash-can-solid.svg'
import Pencil from '../assets/images/pencil-solid.svg'
import Image from 'next/image'

const Todo = ({ todo, handleChecked, completed, handleDelete, handleEdit}) => {

  return (
    <div className='text-white text-2xl border-2 p-2 mb-2 rounded-lg'>
        <form className='flex items-center justify-between group'> 
          <div>
            <input type='checkbox' name='todo' className='peer cursor-pointer group' onChange={handleChecked} checked={completed} ></input>
            <label className='p-2 peer-checked:text-slate-500 peer-checked:line-through outline-none' htmlFor='todo'>{todo}</label>
          </div>
          <div className='flex gap-2'>
          <Image src={Pencil} width={16} height={16} className='inline-block cursor-pointer scale-0 group-hover:scale-100' onClick={handleEdit} alt='pencil'/>
          <Image src={Trash} width={16} height={16} className='inline-block cursor-pointer scale-0 group-hover:scale-100' onClick={handleDelete} alt='trash can'/>
          </div>
        </form>
    </div>
  )
}

export default Todo