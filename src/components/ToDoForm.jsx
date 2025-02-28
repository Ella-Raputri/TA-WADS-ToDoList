import React, { useState } from 'react'

export const ToDoForm = ({addToDo}) => {
    const [value, setValue] = useState("")

    const handleSubmit = e => {
        e.preventDefault();
        addToDo(value);
        setValue("");
    }

    return(
        <div className='mt-20 mb-10'>
        <form onSubmit={handleSubmit} className="ToDoForm">
            <input type="text" 
                className="todo-input border px-2 py-3 mr-4 rounded w-1/2" 
                value={value}
                placeholder="Enter task: "
                onChange={(e) => setValue(e.target.value)}/>

        <button type="submit" 
            className="todo-btn rounded border-2 border-indigo-600 border-solid 
                    text-white px-4 py-3 bg-indigo-600 hover:bg-indigo-700">
            Add Task
        </button>

        </form>
        </div>
    )


}