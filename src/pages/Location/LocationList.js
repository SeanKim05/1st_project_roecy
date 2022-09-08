import React from 'react';
import '../Location/LocationList.scss';

const LocationList = ({ data, onClick }) => {
  const { name, address, phone } = data;
  console.log(onClick);

  return (
    <li className="store_box" onClick={onClick}>
      <span className="pin_icon">
        <img src="/image/pin.png" />
      </span>
      <div className="location_info">
        <p className="store_name">{name}</p>
        <p className="store_address">{address}</p>
        <a className="phone_number">{phone}</a>
      </div>
    </li>
  );
};

export default LocationList;
