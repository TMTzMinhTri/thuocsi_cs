import * as React from 'react';
import { Link } from 'react-router-dom';

export const TaskManagerScreen: React.FC<{}> = (props) => {
    React.useEffect(() => {
        console.log(props)
    }, [])
    return <div className="container-scroller">
        <Link to="/login">Login</Link>
    TaskManagerScreen
    </div>
}