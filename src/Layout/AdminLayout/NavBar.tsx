import * as React from 'react';

export const NavBar: React.SFC<{}> = () => {
    const toggleOffcanvas = () => {
        document.querySelector('.sidebar-offcanvas')?.classList.toggle('active');
    }
    return <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
            <a className="navbar-brand brand-logo-mini align-self-center d-lg-none" href="!#" onClick={evt => evt.preventDefault()}>Logo</a>
            <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
                <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
            <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleOffcanvas}>
                <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
        </div>
    </nav>
}