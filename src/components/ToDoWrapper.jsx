import React, { useEffect, useState } from 'react';
import { ToDo } from './ToDo.jsx';
import { ToDoForm } from './ToDoForm.jsx';
import { EditTodoForm } from './EditToDoForm.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;


export const TodoWrapper = () => {
    const [toDos, setToDos] = useState([]);
    const [showCompleted, setShowCompleted] = useState(false);

    const fetchTasks = async () => {
        try {
            const res = await axios.get(
                `${API_BASE_URL}/api/task/getTasks`, 
                { withCredentials: true }
            )
            setToDos(res.data.tasks);
        } 
        catch (err) {
            console.error('Error fetching tasks:', err);
            toast.error('Failed to load tasks.');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addToDo = async (toDo) => {
        try{
            const res = await axios.post(`${API_BASE_URL}/api/task/createTask`, { todo: toDo }, { withCredentials: true });
            setToDos([...toDos, res.data.task]);
            toast.success("Task added successfully!");
        }
        catch(err){
            console.error("Error add task: ", err);
            toast.error("Failed adding task.")
        }
    }

    const toggleComplete = async (id) => {
        try{
            const todo = toDos.find(todo => todo.id === id);
            const updated = { completed: !todo.completed };
            const res = await axios.put(`${API_BASE_URL}/api/task/updateTask/${id}`, updated, { withCredentials: true });
            setToDos(toDos.map(t => t.id === id ? res.data.task : t));
            toast.success("Task status updated.");
        }
        catch(err){
            console.error('Error update: ', err);
            toast.error("Failed to update task.")
        }
    }

    const deleteToDo = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this task?");
        if (confirm) {
            try{
                await axios.delete(`${API_BASE_URL}/api/task/deleteTask/${id}`, { withCredentials: true });
                setToDos(toDos.filter(todo => todo.id !== id));
                toast.success("Task deleted successfully!");
            }
            catch(err){
                console.error('Error deleting: ', err);
                toast.error("Failed to delete task.")
            }
        }
    }

    const editToDo = id => {
        setToDos(toDos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    }

    const editTask = async (id, updatedValue) => {
        try{
            const res = await axios.put(`${API_BASE_URL}/api/task/updateTask/${id}`, {
                todo: updatedValue,
                isEditing: false
            }, { withCredentials: true });
            setToDos(toDos.map(todo => todo.id === id ? res.data.task : todo));
            toast.success("Task edited successfully!");
        }
        catch(err){
            console.error('Error editing: ', err);
            toast.error("Failed to edit task.")
        }
    }

    const toggleCompletedFilter = () => {
        setShowCompleted(!showCompleted);
    };

    const filteredTasks = showCompleted
        ? toDos.filter(todo => todo.completed)
        : toDos;

    const handleToggle = (todoId) => {
        setToDos(prevToDos =>
            prevToDos.map(todo =>
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-950 py-10">
            <h1 className="text-2xl mt-10 font-bold text-center py-4 bg-gray-950 shadow-md">To Do List</h1>
            <div className="TodoWrapper p-4">
                <button onClick={toggleCompletedFilter}
                    className={`px-4 py-2 rounded border transition-colors duration-300 ${
                        showCompleted ? 'bg-neutral-300 text-neutral-900 border-black hover:bg-neutral-400' : 
                        'bg-neutral-900 text-white border-white hover:bg-neutral-700'
                    }`}>
                    {showCompleted ? 'Show All' : 'Show Completed'}
                </button>

                <ToDoForm addToDo={addToDo} />
                <div className="mt-4 h-96 overflow-y-auto px-6 md:px-12">
                    {filteredTasks.map((todo) => (
                        todo.isEditing ? (
                            <EditTodoForm editToDo={editTask} task={todo} key={todo.id} />
                        ) : (
                            <ToDo
                                task={todo}
                                toggleComplete={toggleComplete}
                                deleteToDo={deleteToDo}
                                editToDo={editToDo}
                                onToggle={handleToggle}
                                key={todo.id}
                            />
                        )
                    ))}
                </div>
            </div>
            <ToastContainer position='bottom-right' autoClose={1000} hideProgressBar />
        </div>
    );
}