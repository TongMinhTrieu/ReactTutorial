import React, { useState, useEffect } from 'react';

function MoviesList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await fetch('http://localhost:2112/api/Movies'); // Thay bằng URL API của bạn
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            console.log("Fetched movies:", data); // Kiểm tra dữ liệu phim
            setMovies(data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>Movies List</h2>
            <ul>
                {movies.map((movie) => (
                    <li key={movie.id}>
                        {movie.title} - {movie.genre} - {new Date(movie.releaseDay).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MoviesList;
