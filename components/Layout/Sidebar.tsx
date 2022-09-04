import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';



export const SideBar = () => {
  return (
    <>
    <div className="side-bar col-3">
      <ul className="list-group list-group-flush">
        <li className="list-group-item Active">
        <Link href={'./profile'} >
          <a className='LinkItem light-gray-text'>
            <FontAwesomeIcon icon={["fas", "user"]} /> Profile
          </a>
        </Link>
        
        </li>
        <li className="list-group-item">
          <Link href={'./Calendar'} >
          <a className='LinkItem light-gray-text'>
            <FontAwesomeIcon icon={['fas', 'calendar']} /> Calendar
          </a>
        </Link>

        </li>
        <li className="list-group-item">
          <Link href={'./TimeOffRequest'} >
            <a className='LinkItem light-gray-text'>
              <FontAwesomeIcon icon={['fas', 'sun']} /> Time Off Request
            </a>
          </Link>
        </li>
        
        <li className="list-group-item">
          <Link href={'./TimeOffSummary'} >
            <a className='LinkItem light-gray-text'>
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