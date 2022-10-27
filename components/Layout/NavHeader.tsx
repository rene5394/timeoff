import * as React from 'react';
import Image from 'next/image';
import { Avatar } from './Avatar/Avatar';
import { IUser } from '../../lib/domain/team/IUser';
import { findOneUserByJWT } from '../../lib/api/team/user';
import { logout } from '../../lib/api/auth/auth';
import { AppUrl } from '../../common/constants/app';

const toLogout = async() => {
  const result = await logout();

  if (result.status === 200) {
    window.location.href = `${AppUrl}/login`;
  }
}

export const NavHeader = () => {
  const [user, setUser] = React.useState<IUser>();

  React.useEffect(() => {
    const fillUser = async() => {
      const result = await findOneUserByJWT();
      setUser(result);
    };
    fillUser();
  },[])

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a href="#" className="navbar-brand">
          <Image src="/assets/img/uam.png" alt="UAM Logo" width={60} height={30} className="d-inline-block align-text-top"/>
        </a>
        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto">
            <a className="nav-link active d-none" aria-current="page" href="#">
              <Image src='/assets/icons/bell.png' alt="notifications" width={15} height={15} />
            </a>
            <a className="nav-link d-none" href="#">
              <Image src='/assets/icons/papernews.png' alt="news" width={15} height={15} />
            </a>
            <div className="nav-item dropdown row">
              <Avatar />
              <a href="#" className="nav-link dropdown-toggle col" data-bs-toggle="dropdown">
                {user?.firstname} {user?.lastname}
              </a>
              <div className="dropdown-menu">
                <a href="#" className="dropdown-item" onClick={toLogout}>Log Out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
