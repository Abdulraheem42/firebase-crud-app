import React from 'react';
import SignInForm from './components/auth/SignInForm';
import Menubar from './components/layout/Menubar';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import SignUpForm from './components/auth/SignUpForm';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
        <BrowserRouter>
            <Menubar />
            <Switch>
                <Route exact path='/' component={ SignInForm } />
                <Route path='/signup' component={ SignUpForm } />
                <Route path='/dashboard' component={ Dashboard } />
            </Switch>
        </BrowserRouter>
  );
}

export default App;
