import * as React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { RootState } from 'Store';
import { Dispatch, bindActionCreators } from 'redux';
import { RootAction } from 'Interface/Store/index.types';
import { connect } from 'react-redux';
import { signOut } from 'Store/actions/layout.actions';

const mapState = (state: RootState) => ({
    user: state.layout.user
})
const mapAction = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    signOut
}, dispatch)

type Iprops = ReturnType<typeof mapState> & ReturnType<typeof mapAction>

export const NavBarComponent: React.SFC<Iprops> = ({ user, signOut }) => {
    const toggleOffcanvas = () => {
        document.querySelector('.sidebar-offcanvas')?.classList.toggle('active');
    }

    return <nav className="navbar col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
            <a className="navbar-brand brand-logo-mini align-self-center d-lg-none" href="!#" onClick={evt => evt.preventDefault()}>Logo</a>
            <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
                <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
            <ul className="navbar-nav navbar-nav-right ml-lg-auto">
                <li className="nav-item  nav-profile border-0">
                    <UncontrolledDropdown>
                        <DropdownToggle className="bg-transparent">
                            <span className="profile-text toast-body mr-1">{user && user.name}</span>
                            <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                        </DropdownToggle>
                        <DropdownMenu className="preview-list navbar-dropdown pb-3" right>
                            <DropdownItem className="dropdown-item mt-2" onClick={signOut}>Đăng xuất</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </li>
            </ul>
            <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleOffcanvas}>
                <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
        </div>
    </nav>
}
export const NavBar = connect(mapState, mapAction)(NavBarComponent)