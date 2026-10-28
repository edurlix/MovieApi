import { NavLink, Link } from "react-router-dom";
import { useMovieContext } from "./MovieContext";

export function NavBar() {
    const { favorites } = useMovieContext();

    return (
        <header className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    MovieAPI
                </Link>
                <nav className="navbar-links">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Inicio
                    </NavLink>
                    <NavLink
                        to="/favorites"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Favoritos{favorites.length > 0 ? ` (${favorites.length})` : ""}
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;
