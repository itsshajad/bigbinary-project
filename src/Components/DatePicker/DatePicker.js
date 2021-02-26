import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const DatePicker = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('past 4 month');

  const handleOpen = () => {
    setOpen(true);
  };

  // const urlValue = new URLSearchParams(window.location.search).get('launches');
  const history = useHistory();
  const param = new URLSearchParams();

  if (value) {
    param.append('filter', value);
  } else {
    param.delete('filter');
  }
  history.push({ search: param.toString() });

  return (
    <div>
      <h3 onClick={handleOpen}>{value}</h3>
      {open && (
        <div>
          <p onClick={() => setValue('past 4 month')}>past 4 month</p>
          <p onClick={() => setValue('past 6 month')}>past 6 month</p>
          <p onClick={() => setValue('past 8 month')}>past 8 month</p>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
