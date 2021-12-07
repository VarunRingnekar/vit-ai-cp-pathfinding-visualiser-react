import React from "react";
import PathFinder from "./PathFinder";
import Navbar from "./Navbar";
import SidePanel from "./SidePanel";
import AppState from "../context/AppState";

function App() {
    return (
            // <div className="row">
            //     <SidePanel/>
            //     <PathFinder/>
            // </div>
            <AppState>
                <PathFinder/>
            </AppState>
    );
}

export default App;
