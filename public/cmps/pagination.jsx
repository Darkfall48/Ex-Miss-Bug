export function Pagination({ currentPage, totalPages = 5, handlePageChange }) {
  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(0)}>First</button>
      <button onClick={() => handlePageChange(-1)}>Prev</button>
      <span className="curr-page-num">{currentPage + 1}</span>
      <button onClick={() => handlePageChange(1)}>Next</button>
      <button onClick={() => handlePageChange(totalPages - 1)}>Last</button>
    </div>
  )
}
