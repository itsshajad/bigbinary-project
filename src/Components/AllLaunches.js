import React, { useEffect, useState } from 'react';

import './AllLaunches.css';
import Pagination from './Pagination';

const AllLaunches = (props) => {
  const [data, setData] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [currentPage, SetCurrentPage] = useState(1);

  const url = 'https://api.spacexdata.com/v3/launches';

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

  const firstPost = 1 * 12;
  const lastPost = firstPost - 12;
  const currentPost = data.slice(1, 12);
  console.log(
    firstPost,
    lastPost,
    currentPost,
    'length is ' + Math.floor(data.length / 12)
  );

  return (
    <div className="dataContainer">
      <>
        <table>
          <thead>
            <tr>
              <th>No:</th>
              <th>Launches (UTC):</th>
              <th>Location</th>
              <th>Mission</th>
              <th>Orbit</th>
              <th>Launches Status</th>
              <th>Rocket</th>
            </tr>
          </thead>

          {!loading ? (
            <tbody>
              {currentPost.map((post, key) => (
                <tr key={key}>
                  <td>{post.flight_number}</td>
                  <td>{post.launch_date_utc}</td>
                  <td>{post.launch_site.site_name}</td>
                  <td>{post.mission_name}</td>
                  <td>{post.rocket.second_stage.payloads[0].orbit}</td>
                  <td>{post.launch_success ? 'Success' : 'Failed'}</td>
                  <td>{post.rocket.rocket_name}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={'7'} className="loadingBox">
                  <img src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif" />
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </>
      <Pagination />
    </div>
  );
};

export default AllLaunches;
