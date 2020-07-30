import * as React from "react";

export const HeaderBoard: React.FC<any> = React.memo(() =>
    <thead>
        <tr>
            <th style={{ width: "10%" }}>#</th>
            <th style={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "60%",
                maxWidth: "60%"
            }}>Ghi chú</th>
            <th style={{ width: "30%", textAlign: "right" }}>Trạng thái</th>
        </tr>
    </thead>
)