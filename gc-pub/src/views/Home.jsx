import MoviePage from "../components/MoviePage";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Carousell from "../components/Carousell";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [orderBy, setOrderBy] = useState("");

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const validOrderBy = orderBy || "ASC";
      const { data } = await axios.get(
        `https://h8-phase2-gc.vercel.app/apis/pub/movie/movies?q=${search}&limit=12&page=${page}&i=${selectedGenre}&sort=${validOrderBy}`
      );

      setTotalPage(data.data.pagination.totalPage);
      setMovies(data.data.query);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGenre = async () => {
    try {
      const { data } = await axios.get("https://h8-phase2-gc.vercel.app/apis/pub/movie/genres");

      setGenre(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const moviePageRef = useRef(null);

  const goToMoviePage = () => {
    if (moviePageRef.current) {
      moviePageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [search, page, selectedGenre, orderBy]);

  return (
    <>
      <div className="min-w-screen m-0 p-0">
        <Navbar
          setSearch={setSearch}
          genre={genre}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          setOrderBy={setOrderBy}
          orderBy={orderBy}
        />
        <Carousell goToMoviePage={goToMoviePage} />
        {loading ? (
          <p className="text-white text-2xl font-bold flex justify-center">Loading ...</p>
        ) : (
          <div
            className="bg-slate-600"
            ref={moviePageRef}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-center py-8 text-white">Featured Movies</h2>
            <Pagination
              page={page}
              setPage={setPage}
              totalPage={totalPage}
            />
            <MoviePage movies={movies} />
            <Pagination
              page={page}
              setPage={setPage}
              totalPage={totalPage}
            />
          </div>
        )}
      </div>
    </>
  );
}
