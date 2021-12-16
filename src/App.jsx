import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Logins from './pages/Login/login-page';

const App = () => {
    return (
        <div className='container'>
            <Routes>
                {/* <Route path='/' exact component={Logins} /> */}
                <Route exact path='/' element={<Logins/>}></Route>
            </Routes>
        </div>
    )
}

export default App;