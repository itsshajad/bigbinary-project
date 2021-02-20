import React, { useEffect, useState } from 'react';

import './AllLaunches.css';

const AllLaunches = (props) => {
  const [data, setData] = useState([]);
  const [loading, SetLoading] = useState(true);

  const url = 'https://api.spacexdata.com/v3/launches/upcoming';

  useEffect(() => {
    async function loadData() {
      const response = await fetch(url);
      const allData = await response.json();
      setData(allData);
      SetLoading(false);
    }
    loadData();
  }, []);

  return (
    <div style={{ height: '450px', boxShadow: '0 2px 5px 5px solid grey' }}>
      <table>
        <tr>
          <th>No:</th>
          <th>Launches (UTC):</th>
          <th>Location</th>
          <th>Mission</th>
          <th>Orbit</th>
          <th>Launches Status</th>
          <th>Rocket</th>
        </tr>

        {!loading ? (
          <>
            {data.map((val, key) => (
              <tr key={key}>
                <td>{val.flight_number}</td>
                <td>{val.launch_date_utc}</td>
                <td>{val.launch_site.site_name}</td>
                <td>{val.mission_name}</td>
                <td>{val.rocket.second_stage.payloads[0].orbit}</td>
                <td>{val.launch_success ? 'Success' : 'Failed'}</td>
                <td>{val.rocket.rocket_name}</td>
              </tr>
            ))}
          </>
        ) : (
          <div>loading...</div>
        )}
      </table>
    </div>
  );
};

export default AllLaunches;
