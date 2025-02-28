import { useState } from 'react'
import { TodoWrapper } from './components/ToDoWrapper';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Homepage } from './components/Homepage';
import { ProfilePage } from './components/ProfilePage';

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path='/' element={<Homepage />}></Route>
                <Route path='/todo' element={<TodoWrapper />}></Route>
                <Route path='/profile' element={<ProfilePage />}></Route>
            </Routes>
        </Router>
    </div>
  )
}

export default App