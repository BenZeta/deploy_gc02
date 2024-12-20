import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./views/LoginPage";
import BaseLayout from "./views/BaseLayout";
import HomePage from "./views/HomePage";
import MovieDetail from "./views/MovieDetail";
import GenrePage from "./views/GenrePage";
import AddUserPage from "./views/AddUserPage";
import AddMoviePage from "./views/AddMoviePage";
import EditMoviePage from "./views/EditMoviePage";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/login"
					element={<LoginPage />}
				/>
				<Route element={<BaseLayout />}>
					<Route
						index
						path="/"
						element={<HomePage />}
					/>
					<Route
						path="/add-user"
						element={<AddUserPage />}
					/>
					<Route
						path="/add-movies"
						element={<AddMoviePage />}
					/>
					<Route
						path="/genres"
						element={<GenrePage />}
					/>
					<Route
						path="/movie/:id"
						element={<MovieDetail />}
					/>
					<Route
						path="/edit-movie/:id"
						element={<EditMoviePage />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
