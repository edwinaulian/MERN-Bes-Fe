import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Logins from './pages/Login/login-page';

const App = () => {
    return (
        <div className='container'>
            <Switch>
                <Route path='/' exact component={Logins} />
                {/* <Route exact path='/' element={<Logins/>}></Route> */}
                <Redirect to='/' />
            </Switch>
        </div>
    )
}

export default App;