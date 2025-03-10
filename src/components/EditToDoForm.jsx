import React, { useState } from 'react'

export const EditTodoForm = ({ editToDo, task }) => {
    const [value, setValue] = useState(task.todo)

    const handleSubmit = e => {
        e.preventDefault();

        editToDo(task.id, value);
    }

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
            <input 
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="px-4 py-2 mb-5 border border-gray-300 rounded mr-8
                focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none transition-colors duration-100"
                placeholder='Update task' />

            <button
                type="submit"
                className='todo-btn rounded 
                    text-white px-4 py-3 bg-indigo-600 hover:bg-indigo-700 mb-5'>
                    Update Task</button>
        </form>
    )
}