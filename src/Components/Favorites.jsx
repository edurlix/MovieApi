import { Link } from "react-router-dom";
import { useMovieContext } from "./MovieContext";
import { MovieCard } from "./MovieCard";

export function Favorites() {
    const { favorites } = useMovieContext();

    if (favorites.length === 0) {
        return (
            <section className="favorites-page">
                <div className="page-header">
                    <h1>Películas favoritas</h1>
                </div>
                <div className="empty-state">
                    <h2>Todavía no tienes películas guardadas</h2>
                    <p>
                        Añade películas desde el catálogo principal para que aparezcan
                        en esta sección y se conserven entre sesiones.
                    </p>
                    <Link to="/" className="btn-secondary">
                        Explorar catálogo
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="favorites-page">
            <div className="page-header">
                <h1>Películas favoritas</h1>
                <p className="results-count">
                    {favorites.length}{" "}
                    {favorites.length === 1 ? "película guardada" : "películas guardadas"}
                </p>
            </div>
            <div className="movies-grid">
                {favorites.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    );
}

export default Favorites;
