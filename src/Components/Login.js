﻿import React, { useState } from 'react';

// Sử dụng biến môi trường để gọi API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/login/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password
                }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json(); // Nhận token từ phản hồi
            localStorage.setItem('token', data.token); // Lưu token vào local storage

            // Gọi hàm onLoginSuccess khi đăng nhập thành công
            onLoginSuccess();
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
