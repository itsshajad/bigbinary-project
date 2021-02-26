import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './AllLaunches.css';
import Header from './Header';
import DataList from './DataList';
import Pagination from './Pagination';

const AllLaunches = (props) => {
  const [data, setData] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [currentPage, SetCurrentPage] = useState(1);
  const [listPerPage] = useState(12);
  const [value, setValue] = useState('all');
  const [newData, setNewData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const url = `https://api.spacexdata.com/v3/launches`;
    const urlValue = new URLSearchParams(window.location.search).get(
      'launches'
    );
    async function loadData() {
      const response = await fetch(url);
      const allData = await response.json();
      setData(allData);
      setNewData(allData);
      SetLoading(false);
      setValue(urlValue);
    }
    loadData();
  }, []);

  useEffect(() => {
    const param = new URLSearchParams();
    if (value) {
      param.append('launches', value);
    } else {
      param.delete('launches');
    }
    history.push({ search: param.toString() });

    if (value) {
      if (value === 'all') {
        return setNewData(data);
      } else if (value === 'upcoming') {
        return setNewData(data.filter((upcoming) => upcoming.upcoming));
      } else if (value === 'successfull') {
        return setNewData(
          data.filter((launch_success) => launch_success?.launch_success)
        );
      } else if (value === 'failed') {
        return setNewData(
          data.filter(
            (launch_success) =>
              !launch_success?.launch_success && !launch_success?.upcoming
          )
        );
      } else {
        setNewData(data);
      }
    } else {
      console.log('nul');
    }
  }, [value, history, data]);

  const lastPage = currentPage * listPerPage;
  const firstPage = lastPage - listPerPage;
  const activePage = newData.slice(firstPage, lastPage);

  const pagination = (pageNumber) => SetCurrentPage(pageNumber);

  return (
    <>
      <Header />

      <div className="mainContainer">
        <div className="filterBar">
          <div>filter</div>

          {/* select option */}
          <div className={'filterDropdown'}>
            <select value={value} onChange={(e) => setValue(e.target.value)}>
              <option value="all">All Launches</option>
              <option value="upcoming">Upcoming Launches</option>
              <option value="successfull">Successful Launches</option>
              <option value="failed">Failed Launches</option>
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
          totalPage={newData.length}
        />
      </div>
    </>
  );
};

export default AllLaunches;
