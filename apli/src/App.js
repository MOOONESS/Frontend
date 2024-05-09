import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <div className="App">
            {!loggedIn ? (
                <Login setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin} />
            ) : isAdmin ? (
                <AdminDashboard />
            ) : (
                <Dashboard />
            )}
        </div>
    );
}

export default App;
