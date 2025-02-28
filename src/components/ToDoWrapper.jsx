import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToDo } from './ToDo.jsx';
import { ToDoForm } from './ToDoForm.jsx';
import { v4 as uuidv4 } from 'uuid';
import { EditTodoForm } from './EditToDoForm.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


uuidv4();

export const TodoWrapper = () => {
    const [toDos, setToDos] = useState([])
    const [showCompleted, setShowCompleted] = useState(false);
    const navigate = useNavigate();

    const addToDo = toDo => {
        setToDos([...toDos, {
            id: uuidv4(),
            task: toDo,
            completed: false,
            isEditing: false
        }]);

        console.log(toDos);
    }

    const toggleComplete = id => {
        setToDos(toDos.map(todo => todo.id === id ? {...
        todo, completed: !todo.completed} : todo ))
    }

    const deleteToDo = id => {
        const confirm = window.confirm("Are you sure you want to delete this task?")
        if(confirm) {
           setToDos(toDos.filter(todo => todo.id !== id));
           toast.success("Task deleted successfully!") 
        }
        
    }

    const editToDo = id => {
        setToDos(toDos.map((todo) => todo.id === id ? {...
            todo, isEditing: !todo.isEditing} : todo));
    }

    const editTask = (id, updatedValue) => {
        setToDos(toDos.map(todo => todo.id === id ? {...
            todo, task: updatedValue, isEditing: !todo.isEditing} : todo));
        toast.success("Task edited successfully!") 
    }

    const toggleCompletedFilter = () => {
        setShowCompleted(!showCompleted);
    };

    const filteredTasks = showCompleted
        ? toDos.filter((todo) => todo.completed)
        : toDos;

    const handleToggle = (todoId) => {
        setToDos((prevToDos) =>
            prevToDos.map((todo) =>
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const showProfile = () => {
        navigate('/profile')
    }

    return (
        <div>
        <h1 className="text-2xl font-bold text-center py-4 fixed top-10 left-0 w-full shadow-md">To Do List</h1>
        <div className="TodoWrapper mt-20 fixed top-20 left-0 w-full">
            <button onClick={toggleCompletedFilter}
                className={`px-4 py-4 rounded border transition-colors duration-300  ${
                    showCompleted ? 'bg-neutral-300 text-neutral-900 border-black hover:bg-neutral-400': 
                    'bg-neutral-900 text-white border-white hover:bg-neutral-700'                     
                }`}>
                {showCompleted ? 'Show All' : 'Show Completed'}
            </button>

            <ToDoForm addToDo={addToDo}/>
            <div className="max-h-100 w-4/5 mx-auto p-4 rounded shadow-sm overflow-y-auto">
                {filteredTasks.map((todo) => (
                    todo.isEditing ? (
                        <EditTodoForm editToDo={editTask} task={todo} />
                    ) : (
                        <ToDo
                            task={todo}
                            toggleComplete={toggleComplete}
                            deleteToDo={deleteToDo}
                            editToDo={editToDo}
                            onToggle={handleToggle}
                        />
                    )
                ))}
            </div>

            <ToastContainer position='top-right' autoClose={1000} hideProgressBar />
        </div>
        
        </div>
    )
}