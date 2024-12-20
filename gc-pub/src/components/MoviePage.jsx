/* eslint-disable react/prop-types */
import Card from "./Card";

export default function MoviePage({ movies }) {
  return (
    <div className="text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card movies={movies} />
        </div>
      </div>
    </div>
  );
}
