import { useState, useEffect, useCallback } from "react";
import { MovieCard } from "./MovieCard";

const BASE_URL = "https://api.themoviedb.org/3";

function buildHeadersAndUrl(endpoint, apiKey) {
    const cleanKey = apiKey ? apiKey.trim() : "";
    const isBearer = cleanKey.length > 50 || cleanKey.startsWith("eyJ");

    if (isBearer) {
        return {
            url: `${BASE_URL}${endpoint}`,
            options: {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${cleanKey}`,
                },
            },
        };
    }

    const separator = endpoint.includes("?") ? "&" : "?";
    return {
        url: `${BASE_URL}${endpoint}${separator}api_key=${encodeURIComponent(cleanKey)}`,
        options: {
            headers: {
                accept: "application/json",
            },
        },
    };
}

export function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSearch, setActiveSearch] = useState("");

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    const loadPopularMovies = useCallback(async () => {
        if (!apiKey || !apiKey.trim()) {
            setError(
                "No se ha configurado la clave de API. Añade VITE_TMDB_API_KEY en el archivo .env en la raíz del proyecto y reinicia el servidor."
            );
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        setActiveSearch("");

        try {
            const { url, options } = buildHeadersAndUrl(
                "/movie/popular?language=es-ES&page=1",
                apiKey
            );
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(
                    `Error al conectar con TMDB (código ${response.status}). Verifica que tu API Key sea válida.`
                );
            }

            const data = await response.json();
            setMovies(data.results || []);
        } catch (err) {
            setError(
                err.message || "No se pudieron cargar las películas populares."
            );
        } finally {
            setLoading(false);
        }
    }, [apiKey]);

    useEffect(() => {
        loadPopularMovies();
    }, [loadPopularMovies]);

    const handleSearch = async (e) => {
        e.preventDefault();

        const trimmedQuery = searchQuery.trim();
        if (!trimmedQuery) {
            loadPopularMovies();
            return;
        }

        if (!apiKey || !apiKey.trim()) {
            setError(
                "No se ha configurado la clave de API. Añade VITE_TMDB_API_KEY en el archivo .env."
            );
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { url, options } = buildHeadersAndUrl(
                `/search/movie?query=${encodeURIComponent(trimmedQuery)}&language=es-ES&page=1`,
                apiKey
            );
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(
                    `Error al realizar la búsqueda (código ${response.status}).`
                );
            }

            const data = await response.json();
            setMovies(data.results || []);
            setActiveSearch(trimmedQuery);
        } catch (err) {
            setError(
                err.message || "Ha ocurrido un error al buscar las películas."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSearchQuery("");
        loadPopularMovies();
    };

    return (
        <section className="home-page">
            <div className="search-section">
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Buscar película por título..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                        Buscar
                    </button>
                    {activeSearch && (
                        <button
                            type="button"
                            className="reset-button"
                            onClick={handleReset}
                        >
                            Ver populares
                        </button>
                    )}
                </form>
            </div>

            <div className="page-header">
                <h1>
                    {activeSearch
                        ? `Resultados para "${activeSearch}"`
                        : "Películas populares"}
                </h1>
            </div>

            {error && (
                <div className="error-banner" role="alert">
                    <p>{error}</p>
                </div>
            )}

            {loading ? (
                <div className="loading-container">
                    <p className="loading-text">Cargando películas...</p>
                </div>
            ) : (
                <>
                    {!error && movies.length === 0 ? (
                        <div className="empty-state">
                            <h2>No se encontraron resultados</h2>
                            <p>
                                Prueba con otro término de búsqueda o vuelve al listado
                                de películas populares.
                            </p>
                        </div>
                    ) : (
                        <div className="movies-grid">
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

export default Home;
