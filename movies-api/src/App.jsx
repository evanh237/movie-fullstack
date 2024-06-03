import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect, useCallback } from "react";
import Layout from "./Components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/home/Home";
import Header from "./Components/header/Header";
import Trailer from "./Components/trailer/Trailer";
import Reviews from "./Components/reviews/Reviews";
function App() {
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getMovies = async () => {
    try {
      const response = await api.get("api/v1/movies");
      // console.log(response.data);

      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMovieData = useCallback(async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      if (response.status === 200) {
        // console.log("fetched movie data", response.data);
        setMovie(response.data);
        setReviews(response.data.reviews || []);
      } else {
        console.error("failed to fetch movie data!", response.statusText);
      }
    } catch (error) {
      console.error("error fetching movie data:", error);
    }
  }, []);

  // const getMovieData = async (movieId) => {
  //   try {
  //     {
  //       const response = await api.get(`/api/v1/movies/${movieId}`);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="*" element={<Layout />}>
          <Route index element={<Home movies={movies} />}></Route>
          <Route path="Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route
            path="Reviews/:movieId"
            element={
              <Reviews
                getMovieData={getMovieData}
                reviews={reviews}
                setReviews={setReviews}
                movie={movie}
                setMovie={setMovie}
              />
            }
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
