import * as React from 'react';
import Image from 'next/image';


export const NavHeader = () => {
    return (
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <a className="navbar-brand" href="#">
                <Image src="/assets/img/uam.png" alt="Vercel Logo" width={30} height={24} className="d-inline-block align-text-top"/>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                        <Image src='/assets/icons/bell.png' alt="notifications" width={30} height={30} />
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <Image src='/assets/icons/papernews.png' alt="news" width={30} height={30} />
                    </a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
}
