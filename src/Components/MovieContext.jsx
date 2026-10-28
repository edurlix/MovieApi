import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        if (storedFavs) {
            try {
                setFavorites(JSON.parse(storedFavs));
            } catch (err) {
                console.error("Error al leer favoritos de localStorage:", err);
            }
        }
        setInitialized(true);
    }, []);

    useEffect(() => {
        if (initialized) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites, initialized]);

    const addToFavorites = (movie) => {
        setFavorites((prev) => {
            if (prev.some((item) => item.id === movie.id)) return prev;
            return [...prev, movie];
        });
    };

    const removeFromFavorites = (movieId) => {
        setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
    };

    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
    };

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};

export { MovieContext };
