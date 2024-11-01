import React, { useState } from 'react';
import Login from './Components/Login';
import MoviesList from './Components/MoviesList';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Thêm state để theo dõi trạng thái đăng nhập

    const handleLoginSuccess = () => {
        setIsLoggedIn(true); // Cập nhật trạng thái khi đăng nhập thành công
    };

    return (
        <div className="App">
            {!isLoggedIn ? (
                <Login onLoginSuccess={handleLoginSuccess} />
            ) : (
                <MoviesList />
            )}
        </div>
    );
}

export default App;

