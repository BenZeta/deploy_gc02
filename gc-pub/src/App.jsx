import Home from "./views/Home";
import { BrowserRouter, Routes, Route } from "react-router";
import MovieDetail from "./views/MovieDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/:id"
          element={<MovieDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}
