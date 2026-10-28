import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { MovieProvider } from "./Components/MovieContext";
import { NavBar } from "./Components/NavBar";
import { Home } from "./Components/Home";
import { Favorites } from "./Components/Favorites";

function App() {
    return (
        <MovieProvider>
            <BrowserRouter>
                <div className="app-layout">
                    <NavBar />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/favorites" element={<Favorites />} />
                        </Routes>
                    </main>
                </div>
            </BrowserRouter>
        </MovieProvider>
    );
}

export default App;
