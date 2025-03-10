import React, { useEffect, useState } from 'react';
import { ToDo } from './ToDo.jsx';
import { ToDoForm } from './ToDoForm.jsx';
import { v4 as uuidv4 } from 'uuid';
import { EditTodoForm } from './EditToDoForm.jsx';
import { toast, ToastContainer } from 'react-toastify';
import db from '../firebase.js';
import 'react-toastify/dist/ReactToastify.css';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

uuidv4();

export const TodoWrapper = () => {
    const [toDos, setToDos] = useState([]);
    const [showCompleted, setShowCompleted] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            const querySnaps = await getDocs(collection(db, 'tasks'));
            const tasks = [];
            querySnaps.forEach((doc) => {
                tasks.push({id: doc.id, ...doc.data()});
            });
            setToDos(tasks);
            console.log(tasks);
        };
        fetchTasks();
    }, []);

    const addToDo = async (toDo) => {
        try{
            const docRef = await addDoc(collection(db, 'tasks'), {
                todo: toDo,
                completed: false,
                isEditing: false, 
            });
            setToDos([...toDos, {id: docRef.id, todo: toDo, completed:false, isEditing:false}])
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
            await updateDoc(doc(db, 'tasks', id), {
                completed : !todo.completed,
            })
            setToDos(toDos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
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
                await deleteDoc(doc(db, 'tasks', id));
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
            await updateDoc(doc(db, 'tasks', id), {
                todo: updatedValue,
                isEditing: false,
            })
            setToDos(toDos.map(todo1 => todo1.id === id ? { ...todo1, todo: updatedValue, isEditing: !todo1.isEditing } : todo1));
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