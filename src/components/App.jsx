import React from "react";
import PathFinder from "./PathFinder";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";

function App() {
    return (
            <div className="row">
                <SidePanel/>
                <PathFinder/>
            </div>
    );
}

export default App;
