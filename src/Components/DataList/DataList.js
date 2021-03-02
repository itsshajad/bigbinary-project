import React, { useState } from 'react';
import moment from 'moment';

import DataPopup from './DataPopup';

const DataList = ({ loading, data }) => {
  const [open, setOpen] = useState(false);
  console.log(data);

  const [currentPopup, setCurrentPopup] = useState();

  const handleOpen = (currentPopup) => {
    setOpen(true);
    setCurrentPopup(currentPopup);

    document.querySelector('body').style.overflow = 'hidden';
  };

  const handleClose = () => {
    setOpen(false);
    document.querySelector('body').style.overflow = 'auto';
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
            {data.length > 0 ? (
              data.map((list, key) => (
                <tr key={key} onClick={() => handleOpen(key)}>
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
              ))
            ) : (
              <tr>
                <td className="text-center" colSpan={'7'}>
                  No Result Found for the specific filter
                </td>
              </tr>
            )}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td className="text-center">
                <img
                  src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
                  alt=""
                />
              </td>
            </tr>
          </tbody>
        )}
      </table>
      {open && (
        <DataPopup data={data[currentPopup]} handleClose={handleClose} />
      )}
    </>
  );
};

export default DataList;
