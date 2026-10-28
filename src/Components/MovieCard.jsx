import { useMovieContext } from "./MovieContext";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie.id);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    };

    const releaseYear = movie.release_date
        ? movie.release_date.split("-")[0]
        : "Sin fecha";

    return (
        <article className="movie-card">
            <div className="movie-poster">
                {movie.poster_path ? (
                    <img
                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        loading="lazy"
                    />
                ) : (
                    <div className="poster-placeholder">
                        <span>Sin póster disponible</span>
                    </div>
                )}
                <div className={`movie-overlay ${favorite ? "is-fav" : ""}`}>
                    <button
                        type="button"
                        className={`favorite-btn ${favorite ? "active" : ""}`}
                        onClick={handleFavoriteClick}
                    >
                        {favorite ? "Quitar de favoritos" : "Guardar en favoritos"}
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3 className="movie-title" title={movie.title}>
                    {movie.title}
                </h3>
                <p className="movie-year">{releaseYear}</p>
            </div>
        </article>
    );
}

export default MovieCard;
