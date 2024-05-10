import React, { useState } from 'react';
import './Login.css';

function Login({ setLoggedIn, setIsAdmin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username === 'bogh' && password === '0000') {
            setLoggedIn(true);
            setIsAdmin(false);  // It's a regular user
        } else if (username === 'admin' && password === 'admin') {
            setLoggedIn(true);
            setIsAdmin(true);   // It's an admin
        } else {
            alert('ERROR BRO!');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Dashboard</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
