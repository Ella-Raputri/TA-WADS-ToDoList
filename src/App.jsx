import { useState } from 'react'
import { TodoWrapper } from './components/ToDoWrapper';
import './App.css'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Homepage } from './components/Homepage';
import { ProfilePage } from './components/ProfilePage';
import Navbar from './components/Navbar';

function App() {
  const [page, setPage] = useState("Home");

  return (
    <div className="App">
        
        <Router>
            <Navbar page={page} setPage={setPage}/>
            <Routes>
                <Route path='/' element={<Homepage setPage={setPage} />}></Route>
                <Route path='/todo' element={<TodoWrapper />}></Route>
                <Route path='/profile' element={<ProfilePage />}></Route>
            </Routes>
        </Router>
    </div>
  )
}

export default App