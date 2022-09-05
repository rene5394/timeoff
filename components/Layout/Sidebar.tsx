import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export const SideBar = () => {
  return (
    <>
    <div className="sidebar col-3">
      <ul className="list-group list-group-flush">
        <li className="list-group-item active">
        <Link href={'./profile'} >
          <a className='linkItem light-gray-text'>
            <FontAwesomeIcon icon={["fas", "user"]} /> Profile
          </a>
        </Link>
        
        </li>
        <li className="list-group-item">
          <Link href={'./calendar'} >
          <a className='linkItem light-gray-text'>
            <FontAwesomeIcon icon={['fas', 'calendar']} /> Calendar
          </a>
        </Link>

        </li>
        <li className="list-group-item">
          <Link href={'./time-off-request'} >
            <a className='linkItem light-gray-text'>
              <FontAwesomeIcon icon={['fas', 'sun']} /> Time Off Request
            </a>
          </Link>
        </li>
        
        <li className="list-group-item">
          <Link href={'./time-off-summary'} >
            <a className='linkItem light-gray-text'>
              <FontAwesomeIcon icon={['fas', 'chart-pie']} /> Time Off Summary
            </a>
          </Link>
        </li>
        <li className="list-group-item">
          
        </li>
      </ul>
    </div>
    </>
  );
}