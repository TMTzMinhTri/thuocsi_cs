import * as React from "react";

export const HeaderBoard: React.FC<any> = React.memo(() =>
    <thead>
        <tr>
            <th style={{ width: '5%' }}>Case</th>
            <th style={{}}>SO</th>
            <th style={{}}>Account</th>
            <th style={{}}>Account bank</th>
            <th style={{}}>Created date</th>
            <th style={{}}>Status</th>
            <th style={{}}>Agent</th>
        </tr>
    </thead>
)