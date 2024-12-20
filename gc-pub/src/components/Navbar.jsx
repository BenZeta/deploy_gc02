/* eslint-disable react/prop-types */
export default function Navbar({ setSearch, genre, selectedGenre, setSelectedGenre, setOrderBy, orderBy }) {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gray-800 bg-opacity-70 backdrop-blur-lg text-white shadow-md z-50">
        <div className="flex items-center justify-between py-4 px-6 mx-5">
          <a
            href="#"
            className="text-2xl font-bold hover:text-blue-400 transition-colors duration-200"
          >
            MovieWorld
          </a>
          <form>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search movies..."
                  className="px-4 py-2 rounded-lg bg-gray-700 bg-opacity-80 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 w-max"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="relative">
                <select
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-gray-700 bg-opacity-80 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={selectedGenre}
                >
                  <option
                    value=""
                    disabled
                    hidden
                  >
                    Genre
                  </option>
                  {genre.map((el) => (
                    <option
                      key={el.id}
                      value={el.name}
                      className="bg-gray-700"
                    >
                      {el.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <select
                  onChange={(e) => setOrderBy(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-gray-700 bg-opacity-80 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={orderBy}
                >
                  <option
                    value=""
                    disabled
                    hidden
                  >
                    Order By
                  </option>
                  <option
                    value="ASC"
                    className="bg-gray-700"
                  >
                    Ascending
                  </option>
                  <option
                    value="DESC"
                    className="bg-gray-700"
                  >
                    Descending
                  </option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </nav>
    </>
  );
}
