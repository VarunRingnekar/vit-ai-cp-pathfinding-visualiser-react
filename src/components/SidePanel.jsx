import React from "react";
import Select from "./Select";
import Button from "./Button";
import {aStar} from "../algorithms/a-star";

function SidePanel(){
    return <div className="column left">
        <h1>PathFinder</h1>
        <Select 
            algorithms = {['A Star', 
                'Best First Search',
                'Djikstra',
                'Depth First Search',
                'Best First Search']}

            // algorithms = {
            //     [
            //         {
            //             name:"A star",
            //             onClick:aStar
            //         },
            //         {
            //             name:"A star",
            //             onClick:aStar
            //         }
            //     ]
            // }
        />
        <Button text="Visualise"/>
        <Button text="Clear Path"/>
        <Button text="Clear Walls"/>
    </div>
}

export default SidePanel;