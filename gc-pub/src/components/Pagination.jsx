export default function Pagination({ page, setPage, totalPage }) {
  const createPageArray = () => {
    let temp = [];
    for (let i = 1; i <= totalPage; i++) {
      temp.push(i);
    }
    return temp;
  };
  const pagination = createPageArray();

  return (
    <div className="container mx-auto flex justify-center items-center space-x-2 py-6">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-200"
      >
        Previous
      </button>

      {pagination.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          className={`px-4 py-2 rounded-lg ${page === pageNumber ? "bg-blue-600 text-white" : "bg-gray-700 text-white hover:bg-gray-600"}`}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPage}
        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-200"
      >
        Next
      </button>
    </div>
  );
}
