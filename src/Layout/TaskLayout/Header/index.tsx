import * as React from "react";
import * as Components from "Components";
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import { connect } from "react-redux";
import { RootState } from "Store";
import { Dispatch, bindActionCreators } from "redux";
import { RootAction } from "Interface/Store/index.types";
import Logo from 'stylesheets/svg/logo_thuocsi.svg';
import { signOut } from 'Store/actions/layout.actions';


const mapState = (state: RootState) => ({
    user: state.layout.user
})

const mapAction = (dispatch: Dispatch<RootAction>) => bindActionCreators({
    signOut
}, dispatch)

type IProps = ReturnType<typeof mapState> & ReturnType<typeof mapAction>

export const HeaderComponent: React.FC<IProps> = ({ user, signOut }) => {
    return user ? <div className="task-header">
        <div className="task-header__left">
        </div>
        <Button onClick={() => document.body.classList.toggle('mini_sidebar')} className='task-header__navbar-toggle'>
            <img src={Logo} alt="Logo" />
        </Button>
        <UncontrolledDropdown className="task-header__profile">
            <DropdownToggle caret>
                <Components.Avata name={user.name} target={`profile_${user.id}`} classNames="mr-1" />
                <span>{user.name}</span>
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem onClick={signOut}>Đăng xuất</DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    </div> : null
}

export const Header = connect(mapState, mapAction)(HeaderComponent)