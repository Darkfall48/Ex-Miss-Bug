export function Pagination({ currentPage, totalPages = 5, handlePageChange }) {
  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    // <nav>
    //   <ul className="pagination">
    //     {pageNumbers.map(number => (
    //       <li key={number} className={number - 1 === currentPage ? 'active' : ''} onClick={() => handlePageChange(number - 1)}>
    //         {number}
    //       </li>
    //     ))}
    //   </ul>
    // </nav>
    <div className='pagination'>
      <button onClick={() => handlePageChange(-1)}>Prev</button>
      <span className='curr-page-num'>{currentPage + 1}</span>
      <button onClick={() => handlePageChange(1)}>Next</button>
    </div>
  )
}
