import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { findOneTeamByCoachUserJWT } from '../../../lib/api/team/team';

export const SideBarAdmin = () => {
  const [isCoach, setIsCoach] = React.useState<boolean>(false);
  const router = useRouter();

  React.useEffect(() => {
    const checkIfUserIsCoach = async() => {
      const result = await findOneTeamByCoachUserJWT();
      if (result) {
        setIsCoach(true);
      }
    };
    checkIfUserIsCoach();
  }, [])
  
  return (
    <>
    <div id="sidebar" className = "sidebar col-3 px-2">
      <ul className = "list-group list-group-flush">
        <li className = {`list-group-item ${router.pathname == '/admin/profile' ? 'sidebar-item-active' : ''}`}>
        <Link href = {'./profile'} >
          <a className = 'linkItem light-gray-text'>
            <FontAwesomeIcon icon = {["fas", "user"]} /> Profile
          </a>
        </Link>
        
        </li>
        <li className = {`list-group-item ${router.pathname == '/admin/calendar' ? 'sidebar-item-active' : ''}`}>
          <Link href = {'./calendar'} >
          <a className = 'linkItem light-gray-text'>
            <FontAwesomeIcon icon = {['fas', 'calendar']} /> Calendar
          </a>
        </Link>

        </li>
        <li className = {`list-group-item ${router.pathname == '/admin/time-off-request' ? 'sidebar-item-active' : ''}`}>
          <Link href = {'./time-off-request'} >
            <a className = 'linkItem light-gray-text'>
              <FontAwesomeIcon icon = {['fas', 'sun']} /> Time Off Request
            </a>
          </Link>
        </li>
        
        <li className = {`list-group-item ${router.pathname == '/admin/time-off-summary' ? 'sidebar-item-active' : ''}`}>
          <Link href = {'./time-off-summary'} >
            <a className = 'linkItem light-gray-text'>
              <FontAwesomeIcon icon = {['fas', 'chart-pie']} /> Time Off Summary
            </a>
          </Link>
        </li>

        <li className = {`list-group-item ${router.pathname == '/admin/staff-directory' ? 'sidebar-item-active' : ''}`}>
          <Link href = {'./staff-directory'} >
            <a className = 'linkItem light-gray-text'>
              <FontAwesomeIcon icon = {['fas', 'chart-pie']} /> Staff Directory
            </a>
          </Link>
        </li>

        <li className = {`list-group-item ${router.pathname == '/admin/request-overview' ? 'sidebar-item-active' : ''}`}>
          <Link href = {'./request-overview'} >
            <a className = 'linkItem light-gray-text'>
              <FontAwesomeIcon icon = {['fas', 'chart-pie']} /> Request Overview
            </a>
          </Link>
        </li>

        {isCoach && 
          <li className = {`list-group-item ${router.pathname == '/admin/team-request-overview' ? 'sidebar-item-active' : ''}`}>
          <Link href = {'./team-request-overview'} >
            <a className = 'linkItem light-gray-text'>
              <FontAwesomeIcon icon = {['fas', 'chart-pie']} /> Team Request Overview
            </a>
          </Link>
        </li>
        }

        <li className = "list-group-item">
          
        </li>
      </ul>
    </div>
    </>
  );
}