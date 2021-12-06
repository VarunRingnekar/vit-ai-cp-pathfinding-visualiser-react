import React from "react";

function Select(props){
    return <select className="select">
        <option>Select Algorithm</option>
        {props.algorithms.map(algorithm=>{
            return <option>{algorithm}</option>
        })};
    </select>
}

export default Select;