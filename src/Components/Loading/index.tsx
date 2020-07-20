import * as React from 'react'
import { Spinner } from 'reactstrap';

export const Loading: React.SFC<{}> = () => {
    return <div>
        <Spinner color="primary" />
    </div>
}