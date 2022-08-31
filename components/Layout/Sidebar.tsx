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
          <a>
            <FontAwesomeIcon icon={["fas", "user"]} /> Profile
          </a>
        </Link>
        
        </li>
        <li className="list-group-item">
          
          <Link href={'./Calendar'} >
          <a>
            <FontAwesomeIcon icon={['fas', 'calendar']} /> Calendar
          </a>
        </Link>

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
    <div className='col-1'></div>
    </>
  );
}