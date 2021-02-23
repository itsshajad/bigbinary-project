import React from 'react';

const DataPopup = ({ handleClose, data }) => {
  return (
    <div className="container">
      <div className="popupBody">
        <span className={'close'} onClick={handleClose}>
          &#x2715;
        </span>

        <div className="popupHeader">
          <div>
            <img width="80" src={data?.links?.mission_patch_small} alt="" />
          </div>

          <div>
            <h3>{data?.mission_name}</h3>
            <p>{data?.rocket?.rocket_name}</p>

            <div>
              <div className="social">
                <a href={data?.links?.article_link}>
                  <img
                    src="https://i.pinimg.com/originals/8a/b7/99/8ab799381ae659b76b79b747e26ac981.png"
                    alt=""
                  />
                </a>
                <a href={data?.links?.wikipedia}>
                  <img
                    src="https://image.flaticon.com/icons/png/512/226/226240.png"
                    alt=""
                  />
                </a>
                <a
                  href={`"https://www.youtube.com/watch?"${data?.links?.youtube_id}`}
                >
                  <img
                    src="https://cdn0.iconfinder.com/data/icons/social-media-2049/512/youtube-512.png"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
          <div
            className={
              data?.upcoming
                ? 'upcoming'
                : data?.launch_success
                ? 'success'
                : 'failed'
            }
          >
            {data?.upcoming
              ? 'Upcoming'
              : data?.launch_success
              ? 'Success'
              : 'Failed'}
          </div>
        </div>

        <p>
          {data?.details}{' '}
          {data?.links?.wikipedia && (
            <a href={data?.links?.wikipedia}>Wikipedia</a>
          )}
        </p>
        <ul className="popupList">
          <li>Flight Number {data?.flight_number}</li>
          <li>Mission Name {data?.mission_name}</li>
          <li>Rocket Type {data?.rocket?.rocket_type}</li>
          <li>rocket_name {data?.rocket?.rocket_name}</li>
          <li>
            Manufacturer {data?.rocket?.second_stage?.payloads[0]?.manufacturer}
          </li>
          <li>
            Nationality {data?.rocket?.second_stage?.payloads[0]?.nationality}
          </li>
          <li>Launch Date {data?.launch_date_utc}</li>
          <li>
            Payload Type {data?.rocket?.second_stage?.payloads[0]?.payload_type}
          </li>
          <li>Orbit {data?.launch_site?.site_name}</li>
        </ul>
      </div>
    </div>
  );
};

export default DataPopup;
