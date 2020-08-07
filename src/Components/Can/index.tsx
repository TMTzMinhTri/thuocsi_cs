import * as React from 'react'
import rules from "./rules.json";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { last, isEmpty, includes } from "lodash";

interface ICanProps extends RouteComponentProps {
    role: string | undefined
    action?: any,
}
type PostalCode = keyof typeof rules

export const CanComponent: React.FC<ICanProps> = React.memo(({ role = "member", children, action, location }) => {
    const currentPage = React.useMemo(() => last(location.pathname.split('/')), [location]) as any
    const check = (): Boolean => {
        if (role) {
            const permissions = rules[role as PostalCode] as any;
            if (!isEmpty(permissions[currentPage]) && includes(permissions[currentPage], action)) {
                return true
            }
            return false
        }
        return false
    }

    return <React.Fragment>
        {check() ? children : null}
    </React.Fragment>
})
export const Can = withRouter(CanComponent)