import * as React from 'react'
import { Spinner } from 'reactstrap';
import Logo from "stylesheets/svg/logo_thuocsi.svg";

export const Loading: React.SFC<{}> = () => {
    return <div className="loading-component">
        <img src={Logo} alt="logo" />
        <Spinner color="primary" />
    </div>
}