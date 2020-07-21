import * as React from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';



export const SideBar: React.SFC<{}> = () => {
    let location = useLocation();
    let { url } = useRouteMatch();
    console.log(location)
    React.useEffect(() => {
        onRouteChanged()
        const body = document.querySelector('body');
        document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
            el.addEventListener('mouseover', function () {
                if (body && body.classList.contains('sidebar-icon-only')) {
                    el.classList.add('hover-open');
                }
            });
            el.addEventListener('mouseout', function () {
                if (body && body.classList.contains('sidebar-icon-only')) {
                    el.classList.remove('hover-open');
                }
            });
        })
    }, [])
    const isPathActive = (path: string): Boolean => {
        return location.pathname.startsWith(path)
    }
    const onRouteChanged = () => {
        // document.querySelector('#sidebar').classList.remove('active');
        // document.querySelector('#sidebar')?.classList.remove('active')
        console.log(document.querySelector('#sidebar')?.classList)
    }

    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
                {/* <a className="sidebar-brand brand-logo" href="index.html"><img src={require("../../assets/images/logo.svg")} alt="logo" /></a> */}
                <a className="sidebar-brand brand-logo-mini pt-3" href="index.html">
                    Minh tri
                </a>
            </div>
            <ul className="nav">
                <li className={isPathActive('/') ? 'nav-item active' : 'nav-item'}>
                    <Link className="nav-link" to={`${url}`}>
                        <i className="fa fa-paper-plane menu-icon" aria-hidden="true"></i>
                        <span className="menu-title">Form Elements</span>
                    </Link>
                </li>
                <li className={isPathActive('/tables') ? 'nav-item active' : 'nav-item'}>
                    <Link className="nav-link" to={`${url}/abc`}>
                        <i className="fa fa-paper-plane menu-icon" aria-hidden="true"></i>
                        <span className="menu-title">Tables</span>
                    </Link>
                </li>
                <li className={isPathActive('/icons') ? 'nav-item active' : 'nav-item'}>
                    <Link className="nav-link" to={`${url}/minhtri`}>
                        <i className="fa fa-paper-plane menu-icon" aria-hidden="true"></i>
                        <span className="menu-title">Icons</span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}