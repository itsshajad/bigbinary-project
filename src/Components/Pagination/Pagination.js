import React from 'react';
const Pagination = ({ pagination, totalList, listPerPage, currentPage }) => {
  const pageNumber = [];
  const totalPage = Math.ceil(totalList / listPerPage);
  for (let i = 1; i <= totalPage; i++) {
    pageNumber.push(i);
  }
  // page decrement
  const PageDecrease = () => {
    if (currentPage > 1) {
      pagination(currentPage - 1);
    }
  };
  // page increment
  const PageIncrease = () => {
    if (currentPage < pageNumber.length) {
      pagination(currentPage + 1);
    }
  };
  return (
    <div className="pagination">
      {pageNumber.length > 4 && (
        <ul>
          <li
            className={currentPage > 1 ? '' : 'disabledPagination'}
            onClick={PageDecrease}
          >
            {'<'}
          </li>
          <li onClick={() => pagination(currentPage + 1)}>{currentPage + 1}</li>
          {currentPage === totalPage ? (
            <li onClick={() => PageDecrease()}>...</li>
          ) : null}
          <li onClick={() => PageIncrease(currentPage + 2)}>
            {currentPage + 2}
          </li>
          {currentPage < totalPage ? (
            <li onClick={() => PageIncrease()}>...</li>
          ) : null}
          <li onClick={() => pagination(totalPage)}>{totalPage}</li>
          <li
            className={currentPage >= totalPage ? 'disabledPagination' : ''}
            onClick={PageIncrease}
          >
            {'>'}
          </li>
          {/* {pageNumber.map((pageNumber) => (
          <li onClick={() => pagination(pageNumber)} key={pageNumber}>
            {pageNumber}
          </li>
        ))} */}
        </ul>
      )}
    </div>
  );
};
export default Pagination;
