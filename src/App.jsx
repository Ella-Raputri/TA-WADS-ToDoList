import { useState } from 'react'
import { TodoWrapper } from './components/ToDoWrapper';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <h1 className="text-2xl font-bold text-center py-4 fixed top-10 left-0 w-full shadow-md">To Do List</h1>
        <Router>
            <Routes>
                <Route path='/' element={<TodoWrapper />}></Route>
            </Routes>
        </Router>
    </div>
  )
}

export default App