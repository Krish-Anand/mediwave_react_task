import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Nav } from '@/_components';
import { Home } from '@/home';
import { Users } from '@/users';

function App() {
    const { pathname } = useLocation();  
    console.log(pathname, 'pathname');

    return (
        <div className="app-container bg-light">
            <Nav />
            <div className="container pt-4 pb-4">
                <Switch>
                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                    <Route exact path="/" component={Home} />
                    <Route path="/users" component={Users} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        </div>
    );
}

export { App }; 