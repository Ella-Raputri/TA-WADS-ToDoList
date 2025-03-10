import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const ToDo = ({ task, toggleComplete, deleteToDo, editToDo }) => {
    return (
        <div className="flex mx-auto items-center mb-6 
            justify-between p-5 rounded-xl shadow-sm bg-gray-800">

            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="peer accent-indigo-500 h-5 w-4"
                    id={`todo-${task.id}`}
                />
                <label htmlFor={`todo-${task.id}`} className="cursor-pointer peer-checked:line-through peer-checked:text-gray-500">
                    {task.todo}
                </label>
            </div>

            <div className="flex gap-3">
                <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="cursor-pointer text-indigo-400 hover:text-indigo-500"
                    onClick={() => editToDo(task.id)}
                />
                <FontAwesomeIcon
                    icon={faTrash}
                    className="cursor-pointer text-gray-400 hover:text-gray-500"
                    onClick={() => deleteToDo(task.id)}
                />
            </div>
        </div>
    );
};
