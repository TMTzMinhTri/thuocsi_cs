import * as React from 'react';
import { NavLink } from 'react-router-dom';

const ListMenu = [
    {
        name: "Task manager",
        icon: "fa-tasks",
        path: "/admin/task-manager/all-case",
        child: [
            { name: "All case", icon: "fa-tasks", path: "/admin/task-manager/all-case" },
            { name: "My case", icon: "fa-tasks", path: "/admin/task-manager/my-case" },
        ]
    },
    {
        name: "List files",
        icon: "fa-file",
        path: "/admin/files"
    }
]


export const SideBar: React.SFC<{}> = () => {

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

    const onRouteChanged = () => {
        // document.querySelector('#sidebar').classList.remove('active');
        // document.querySelector('#sidebar')?.classList.remove('active')
        // console.log(document.querySelector('#sidebar')?.classList)
    }

    const renderMenuItem = () => {
        return ListMenu.map((menu, index) => {
            const key = `side-menu-${menu.name}-${index}`
            return menuItem(menu, key)
        })
    }

    const menuItem = (menu: any, key: string) => {
        return <li className="nav-item" key={key}>
            {!menu.child
                ? <NavLink to={menu.path} activeClassName="active" className="nav-link" >
                    <i className={`fa ${menu.icon} menu-icon`} aria-hidden="true"></i>
                    <span className="menu-title">{menu.name}</span>
                </NavLink>
                : <React.Fragment>
                    <NavLink to={menu.path} activeClassName="active" className="nav-link" >
                        <i className={`fa ${menu.icon} menu-icon`} aria-hidden="true"></i>
                        <span className="menu-title">{menu.name}</span>
                    </NavLink>
                    <ul className="nav" style={{ marginLeft: "30px" }}>
                        {menu.child.map((menuchild: any, index: number) => {
                            return menuItem(menuchild, `side-menu-child${menuchild.name}-${index}`)
                        })}
                    </ul>
                </React.Fragment>}
        </li>
    }

    return (
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
                <div className="sidebar-brand brand-logo"><Logo /></div>
                <a className="sidebar-brand brand-logo-mini pt-3" href="index.html">
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="19" cy="19" r="17" fill="#00B46E" stroke="#00B46E" strokeWidth="4" />
                        <path d="M26.0834 12.6164V16.3223H19.8033V23.4239C19.8033 24.2759 20.0345 24.9514 20.497 25.4504C20.9717 25.9372 21.6228 26.1806 22.4504 26.1806C23.5701 26.1806 24.7811 25.8459 26.0834 25.1765V29.1016C24.3551 29.8196 22.6816 30.1787 21.0629 30.1787C18.9453 30.1787 17.3022 29.631 16.1338 28.5356C14.9654 27.4403 14.3812 25.8337 14.3812 23.716V16.3223H11.9167V15.2635L19.1278 7.19434H19.8033V12.6164H26.0834Z" fill="white" />
                    </svg>
                </a>
            </div>
            <ul className="nav">
                {renderMenuItem()}
            </ul>
        </nav>
    )
}

const Logo = () => {
    return <svg width="164" height="40" viewBox="0 0 164 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60.6993 15.9458V19.3749H54.8885V25.9458C54.8885 26.7341 55.1024 27.3591 55.5304 27.8208C55.9696 28.2713 56.572 28.4965 57.3378 28.4965C58.3738 28.4965 59.4943 28.1868 60.6993 27.5675V31.1992C59.1002 31.8636 57.5518 32.1958 56.054 32.1958C54.0946 32.1958 52.5743 31.6891 51.4932 30.6756C50.4121 29.662 49.8716 28.1756 49.8716 26.2161V19.3749H47.5912V18.3952L54.2635 10.9289H54.8885V15.9458H60.6993Z" fill="#00B46E" />
        <path d="M68.3851 8.2938V18.2938H68.4527C69.8491 16.5145 71.5326 15.6249 73.5033 15.6249C75.2038 15.6249 76.6002 16.1654 77.6925 17.2465C78.7961 18.3163 79.3479 19.8084 79.3479 21.7229V31.8918H74.331V22.787C74.331 20.4672 73.4696 19.3073 71.7466 19.3073C70.6092 19.3073 69.4887 20.1125 68.3851 21.7229V31.8918H63.3682V8.2938H68.3851Z" fill="#00B46E" />
        <path d="M94.4662 31.8918V29.6114C92.9909 31.3343 91.2736 32.1958 89.3141 32.1958C87.5799 32.1958 86.1723 31.6609 85.0912 30.5911C84.0101 29.5213 83.4696 28.0404 83.4696 26.1485V15.9458H88.4864V25.8107C88.4864 27.8377 89.3254 28.8512 91.0033 28.8512C91.9493 28.8512 92.7545 28.4852 93.4189 27.7533C94.0945 27.01 94.4324 26.4638 94.4324 26.1147V15.9458H99.4831V31.8918H94.4662Z" fill="#00B46E" />
        <path d="M111.865 15.6249C114.365 15.6249 116.482 16.3569 118.216 17.8208C119.962 19.2848 120.834 21.3231 120.834 23.9357C120.834 26.5596 119.95 28.5922 118.182 30.0337C116.414 31.4751 114.309 32.1958 111.865 32.1958C109.218 32.1958 107.051 31.4301 105.361 29.8985C103.684 28.3557 102.845 26.3569 102.845 23.9019C102.845 21.4019 103.7 19.3974 105.412 17.8884C107.135 16.3794 109.286 15.6249 111.865 15.6249ZM111.865 29.2229C114.263 29.2229 115.463 27.4154 115.463 23.8006C115.463 20.3434 114.263 18.6147 111.865 18.6147C110.716 18.6147 109.815 19.0708 109.162 19.983C108.52 20.8952 108.199 22.2015 108.199 23.9019C108.199 27.4492 109.421 29.2229 111.865 29.2229Z" fill="#00B46E" />
        <path d="M138.149 27.5337V31.1316C136.189 31.8411 134.393 32.1958 132.76 32.1958C129.956 32.1958 127.715 31.447 126.037 29.9492C124.359 28.4402 123.52 26.447 123.52 23.9695C123.52 21.5483 124.365 19.5551 126.054 17.9897C127.754 16.4132 129.917 15.6249 132.54 15.6249C134.23 15.6249 136.02 15.974 137.912 16.6722V20.4053C136.527 19.6958 135.164 19.3411 133.824 19.3411C132.327 19.3411 131.127 19.7578 130.226 20.5911C129.325 21.4244 128.875 22.5393 128.875 23.9357C128.875 25.3434 129.314 26.4807 130.193 27.3479C131.071 28.2037 132.225 28.6316 133.655 28.6316C134.714 28.6316 136.212 28.2656 138.149 27.5337Z" fill="#00B46E" />
        <path d="M152.473 16.8073V20.3715C150.558 19.2003 148.785 18.6147 147.152 18.6147C145.947 18.6147 145.345 19.0258 145.345 19.8479C145.345 20.0618 145.468 20.2758 145.716 20.4897C145.975 20.6925 146.949 21.1316 148.638 21.8073C150.328 22.4717 151.521 23.2431 152.22 24.1215C152.918 24.9999 153.267 25.9627 153.267 27.01C153.267 28.6654 152.704 29.9436 151.578 30.8445C150.452 31.7454 148.847 32.1958 146.763 32.1958C144.624 32.1958 142.721 31.8073 141.054 31.0303V27.4999C143.104 28.4008 144.821 28.8512 146.206 28.8512C147.828 28.8512 148.638 28.4571 148.638 27.6688C148.638 27.3647 148.486 27.0776 148.182 26.8073C147.89 26.537 146.887 26.0697 145.176 25.4053C143.464 24.7409 142.293 24.0089 141.662 23.2093C141.031 22.4098 140.716 21.5202 140.716 20.5404C140.716 19.0877 141.319 17.9053 142.524 16.9931C143.74 16.081 145.339 15.6249 147.321 15.6249C149.224 15.6249 150.941 16.019 152.473 16.8073Z" fill="#00B46E" />
        <path d="M156.105 10.76C156.105 9.99425 156.375 9.3411 156.915 8.80056C157.456 8.26002 158.104 7.98975 158.858 7.98975C159.624 7.98975 160.277 8.26002 160.817 8.80056C161.358 9.3411 161.628 9.99425 161.628 10.76C161.628 11.5145 161.358 12.1677 160.817 12.7195C160.277 13.26 159.624 13.5303 158.858 13.5303C158.104 13.5303 157.456 13.26 156.915 12.7195C156.375 12.1677 156.105 11.5145 156.105 10.76ZM161.392 15.9458V31.8918H156.375V15.9458H161.392Z" fill="#00B46E" />
        <circle cx="19" cy="20" r="17" fill="#00B46E" stroke="#00B46E" strokeWidth="4" />
        <path d="M26.0834 13.6164V17.3223H19.8033V24.4239C19.8033 25.2759 20.0345 25.9514 20.497 26.4504C20.9717 26.9372 21.6228 27.1806 22.4504 27.1806C23.5701 27.1806 24.7811 26.8459 26.0834 26.1765V30.1016C24.3551 30.8196 22.6816 31.1787 21.0629 31.1787C18.9453 31.1787 17.3022 30.631 16.1338 29.5356C14.9654 28.4403 14.3812 26.8337 14.3812 24.716V17.3223H11.9167V16.2635L19.1278 8.19434H19.8033V13.6164H26.0834Z" fill="white" />
    </svg>

}