import * as React from "react";
import Logo from 'stylesheets/svg/logo_thuocsi.svg';
import { Nav, NavItem, UncontrolledCollapse } from "reactstrap";
import { NavLink } from "react-router-dom";

export const SideBar: React.FC<{}> = () => {
    const ListMenu = React.useMemo(() => [
        {
            name: "Task manager",
            icon: "fa-tasks",
            path: "/task/task-manager/all-case",
            child: [
                { name: "All case", icon: "fa-tasks", path: "/task/task-manager/all-case" },
                { name: "My case", icon: "fa-tasks", path: "/task/task-manager/my-case" },
            ]
        },
        {
            name: "List files",
            icon: "fa-file",
            path: "/task/files"
        }
    ], [])
    const renderMenuItem = () => {
        return ListMenu.map((menu, index) => {
            const key = `side-menu-${menu.name}-${index}`
            return menuItem(menu, key)
        })
    }
    const menuItem = (menu: any, key: string) => {
        return <NavItem key={key}>
            {!menu.child
                ? <NavLink to={menu.path} activeClassName="active" className="nav-link" >
                    <i className={`fa ${menu.icon} menu-icon`} aria-hidden="true"></i>
                    <span className="task-sidebar__menu-title">{menu.name}</span>
                </NavLink>
                : <React.Fragment>
                    <div id="toggler" className="task-sidebar__menu-toggle">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <i className={`fa ${menu.icon} menu-icon`} aria-hidden="true"></i>
                                <span className="task-sidebar__menu-title">{menu.name}</span>
                            </div>
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                    </div>
                    <UncontrolledCollapse toggler="#toggler">
                        <Nav vertical className="nav-child">
                            {menu.child.map((menuchild: any, index: number) => {
                                return menuItem(menuchild, `side-menu-child${menuchild.name}-${index}`)
                            })}
                        </Nav>
                    </UncontrolledCollapse>
                </React.Fragment>}
        </NavItem>
    }

    return <div className="task-sidebar">
        <div className="task-sidebar__brand-wrapper">
            <a href="/">
                <span className="task-sidebar__brand-logo">
                    <img src={Logo} alt="Logo" />
                </span>
            </a>
        </div>
        <Nav vertical>
            {renderMenuItem()}
        </Nav>
    </div>
}
