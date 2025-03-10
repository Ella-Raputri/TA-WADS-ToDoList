import { useState } from 'react'
import { TodoWrapper } from './components/ToDoWrapper';
import './App.css'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { Homepage } from './components/Homepage';
import { ProfilePage } from './components/ProfilePage';
import Navbar from './components/Navbar';
import { Login } from './components/Login';
import { Register } from './components/Register';

function App() {
  const [page, setPage] = useState("Home");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
        
        <Router>
            <Navbar page={page} setPage={setPage} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <Routes>
                <Route path='/' element={<Homepage setPage={setPage} />}></Route>
                <Route
                    path="/todo"
                    element={loggedIn ? <TodoWrapper /> : <Navigate to="/login" />}
                />
                <Route
                    path="/profile"
                    element={loggedIn ? <ProfilePage /> : <Navigate to="/login" />}
                />
                <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
                <Route path="/register" element={<Register setLoggedIn={setLoggedIn} />} />
            </Routes>
        </Router>
    </div>
  )
}

export default App