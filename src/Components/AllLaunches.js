import React, { useEffect, useState } from 'react';

import './AllLaunches.css';
import Header from './Header';
import DataList from './DataList';
import Pagination from './Pagination';

const AllLaunches = (props) => {
  const [data, setData] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [currentPage, SetCurrentPage] = useState(1);
  const [listPerPage] = useState(12);
  const [apiParameter, setApiParameter] = useState('');

  const url = `https://api.spacexdata.com/v3/launches${apiParameter}`;

  useEffect(() => {
    async function loadData() {
      const response = await fetch(url);
      const allData = await response.json();
      setData(allData);
      SetLoading(false);
    }
    loadData();
  }, []);

  // get current post

  const lastPage = currentPage * listPerPage;
  const firstPage = lastPage - listPerPage;
  const activePage = data.slice(firstPage, lastPage);

  const pagination = (pageNumber) => SetCurrentPage(pageNumber);

  const change = (e) => {
    console.log(e);
  };

  return (
    <>
      <Header />

      <div className="mainContainer">
        <div className="filterBar">
          <div>filter</div>
          <div>
            <select name="" id="" onChange={change}>
              <option value="">All Launches</option>
              <option value="">Upcoming Launches</option>
              <option value="">Successful Launches</option>
              <option value="">Failed Launches</option>
            </select>
          </div>
        </div>
        <div className="dataContainer">
          <DataList loading={loading} data={activePage} />
        </div>
        <Pagination
          listPerPage={listPerPage}
          pagination={pagination}
          currentPage={currentPage}
          totalPage={data.length}
        />
      </div>
    </>
  );
};

export default AllLaunches;
