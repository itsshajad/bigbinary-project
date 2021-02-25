import React, { useState } from 'react';
import moment from 'moment';

import DataPopup from './DataPopup';

const DataList = ({ loading, data }) => {
  const [open, setOpen] = useState(false);
  const [currentPopup, setCurrentPopup] = useState();

  const handleToggle = (currentPopup) => {
    setOpen(true);
    setCurrentPopup(currentPopup);
  };

  const closePopup = () => {
    setOpen(false);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>No:</th>
            <th>Launches (UTC)</th>
            <th>Location</th>
            <th>Mission</th>
            <th>Orbit</th>
            <th>Launches Status</th>
            <th>Rocket</th>
          </tr>
        </thead>

        {!loading ? (
          <tbody>
            {data.map((list, key) => (
              <tr key={key} onClick={() => handleToggle(key)}>
                <td>{list?.flight_number}</td>
                <td>
                  {moment(list?.launch_date_utc).format('DD MMMM YYYY hh:mm')}{' '}
                  at {moment(list?.launch_date_utc).format(' hh:mm')}
                </td>
                <td>{list?.launch_site.site_name}</td>
                <td>{list?.mission_name}</td>
                <td>{list?.rocket?.second_stage?.payloads[0]?.orbit}</td>
                <td>
                  <span
                    className={
                      list?.upcoming
                        ? 'upcoming'
                        : list?.launch_success
                        ? 'success'
                        : 'failed'
                    }
                  >
                    {list?.upcoming
                      ? 'Upcoming'
                      : list?.launch_success
                      ? 'Success'
                      : 'Failed'}
                  </span>
                </td>
                <td>{list?.rocket?.rocket_name}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={'7'} className="loadingBox">
                <img
                  src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
                  alt=""
                />
              </td>
            </tr>
          </tbody>
        )}
      </table>
      {open && <DataPopup data={data[currentPopup]} handleClose={closePopup} />}
    </>
  );
};

export default DataList;
