import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';


export const SideBar = () => {
  return (
    <>
    <div className="side-bar col-sm-3">
      <ul className="list-group list-group-flush">
        <li className="list-group-item Active">
        <FontAwesomeIcon icon={["fas", "user"]} /> Profile
        </li>
        <li className="list-group-item">
          <FontAwesomeIcon icon={['fas', 'calendar']} /> Calendar
        </li>
        <li className="list-group-item">
          <FontAwesomeIcon icon={['fas', 'sun']} /> Time Off Request
        </li>
        <li className="list-group-item">
          <FontAwesomeIcon icon={['fas', 'chart-pie']} /> Time Off Summary
        </li>
        <li className="list-group-item">
          
        </li>
      </ul>
    </div>
    <div className='col-sm-1'></div>
    </>
  );
}