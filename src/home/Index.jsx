import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>React - CRUD Task with React Hook Form</h1>
            <p>An example app showing how to list, add, edit and delete user records with React</p>
            <p><Link to="users">&gt;&gt;  Users Details</Link></p>
        </div>
    );
}
export { Home };