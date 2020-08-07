import React from "react";
import { UncontrolledTooltip } from "reactstrap";
import Utils from "Utils";
import { words } from "lodash";


interface IAvataProps {
    name: string,
    target: string,
    classNames?: string
}

export const Avata: React.FC<IAvataProps> = React.memo(({ name, target, classNames }) => {
    function generateName(name: string) {
        let shortname: string = "";
        if (!name) {
            return shortname = "KH"
        }
        let arrayNames = words(name)
        if (arrayNames.length > 2) {
            shortname = arrayNames[arrayNames.length - 2].charAt(0) + arrayNames[arrayNames.length - 1].charAt(0)
        }
        else {
            shortname = arrayNames[0].charAt(0) + arrayNames[1].charAt(0)
        }
        return shortname
    }
    return <div className={classNames}>
        <div style={{ backgroundColor: Utils.stringToHslColor(name), height: "30px", width: "30px", lineHeight: "30px", fontSize: "12px" }}
            className="rounded-circle text-center cursor-pointer" id={target}>
            {generateName(name)}
        </div>
        <UncontrolledTooltip placement="top" target={target}>
            {name ? name : "Khách hàng"}
        </UncontrolledTooltip>
    </div>
})