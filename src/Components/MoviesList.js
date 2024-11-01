import React, { useEffect, useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const token = localStorage.getItem('token'); // Lấy token từ local storage
                const response = await fetch(`${API_BASE_URL}/Movies`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Thêm token vào header
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                setError('Error fetching movies.');
            }
        };

        fetchMovies();
    }, []); // Chỉ gọi một lần khi component được render

    return (
        <div>
            <h2>Movies List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>{movie.title} - {movie.genre}</li>
                ))}
            </ul>
        </div>
    );
};

export default MoviesList;

