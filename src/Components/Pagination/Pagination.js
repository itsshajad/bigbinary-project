import React from 'react';
import './Pagination.css';

const Pagination = ({ pagination, totalPage, listPerPage, currentPage }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPage / listPerPage); i++) {
    pageNumber.push(i);
  }
  const PageDecrease = () => {
    if (currentPage > 1) {
      pagination(currentPage - 1);
    }
  };
  const PageIncrease = () => {
    if (currentPage < pageNumber.length) {
      pagination(currentPage + 1);
    }
  };
  return (
    <div className="pagination">
      <ul>
        <li onClick={PageDecrease}> {'<'} </li>
        {pageNumber.map((pageNumber) => (
          <li onClick={() => pagination(pageNumber)} key={pageNumber}>
            {pageNumber}
          </li>
        ))}
        <li onClick={PageIncrease}> {'>'} </li>
      </ul>
    </div>
  );
};

export default Pagination;
