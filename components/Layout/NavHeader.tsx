import * as React from 'react';
import Image from 'next/image';
import { Avatar } from './Avatar/Avatar';


export const NavHeader = () => {
    return (
        
      <nav className="navbar navbar-expand-lg">
        <div className="container">
            <a href="#" className="navbar-brand">
            <Image src="/assets/img/uam.png" alt="Vercel Logo" width={60} height={20} className="d-inline-block align-text-top"/>
            </a>
            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                
                <div className="navbar-nav ms-auto">
                <a className="nav-link active" aria-current="page" href="#">
                        <Image src='/assets/icons/bell.png' alt="notifications" width={15} height={15} />
                    </a>
                    <a className="nav-link" href="#">
                        <Image src='/assets/icons/papernews.png' alt="news" width={15} height={15} />
                    </a>
                  <div className="nav-item dropdown row">
                    <Avatar />
                    <a href="#" className="nav-link dropdown-toggle col" data-bs-toggle="dropdown">
                    Carlos Rodriguez
                    </a>
                    <div className="dropdown-menu">
                        
                        <a href="#" className="dropdown-item">Log Out</a>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </nav>
    );
}
