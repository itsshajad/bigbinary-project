import React, { useEffect, useState } from 'react';
import moment from 'moment';
const DatePicker = ({ setEnd, setStart, SetLoading }) => {
  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState('Past 6 Month');
  const [filterEndText, setFilterEndText] = useState('');
  const [startDate] = useState(moment().add(-6, 'month').format('YYYY-MM-DD'));
  const [endDate] = useState(moment().format('YYYY-MM-DD'));
  const handleOpen = () => {
    setOpen(!open);
    if (!open) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'auto';
    }
  };

  useEffect(() => {
    const urlValue = new URLSearchParams(window.location.search);

    setEnd(urlValue.get('end') ? urlValue.get('end') : endDate);
    setStart(urlValue.get('start') ? urlValue.get('start') : startDate);
  }, [setEnd, setStart, startDate, endDate]);

  return (
    <div>
      <h3 onClick={handleOpen}>{`${filterText} ${
        filterEndText && ' To ' + filterEndText
      }`}</h3>
      {open && (
        <div className="popupContainer">
          <div className="popupBody">
            <span className={'close'} onClick={handleOpen}>
              &#x2715;
            </span>
            <div className="datePickerBody">
              <div className="leftColumn">
                <ul>
                  <li
                    onClick={() => {
                      setStart(moment().add(-1, 'week').format('YYYY-MM-DD'));
                      setFilterText('Past Week');
                      SetLoading(true);
                      setFilterEndText('');
                    }}
                  >
                    Past Week
                  </li>
                  <li
                    onClick={() => {
                      setStart(moment().add(-1, 'month').format('YYYY-MM-DD'));
                      setFilterText('Past Month');
                      SetLoading(true);
                      setFilterEndText('');
                    }}
                  >
                    Past Month
                  </li>
                  <li
                    onClick={() => {
                      setStart(moment().add(-3, 'month').format('YYYY-MM-DD'));
                      setFilterText('Past 3 Month');
                      SetLoading(true);
                      setFilterEndText('');
                    }}
                  >
                    Past 3 Month
                  </li>
                  <li
                    onClick={() => {
                      setStart(moment().add(-6, 'month').format('YYYY-MM-DD'));
                      setFilterText('Past 6 Month');
                      SetLoading(true);
                      setFilterEndText('');
                    }}
                  >
                    Past 6 Month
                  </li>
                  <li
                    onClick={() => {
                      setStart(moment().add(-1, 'y').format('YYYY-MM-DD'));
                      setFilterText('Past Year');
                      SetLoading(true);
                      setFilterEndText('');
                    }}
                  >
                    Past Year
                  </li>
                  <li
                    onClick={() => {
                      setStart(moment().add(-2, 'y').format('YYYY-MM-DD'));
                      setFilterText('Past 2 Year');
                      SetLoading(true);
                      setFilterEndText('');
                    }}
                  >
                    Past 2 Year
                  </li>
                </ul>
              </div>
              <div className="rightColumn">
                <input
                  type="date"
                  name="start"
                  onChange={(e) => {
                    setStart(e.target.value);
                    setFilterText(e.target.value);
                  }}
                />
                <input
                  type="date"
                  name="end"
                  onChange={(e) => {
                    setEnd(e.target.value);
                    setFilterEndText(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DatePicker;
