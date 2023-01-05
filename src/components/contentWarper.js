import React from "react";
import "./contentWarper.css"
import SideNav from "./sideNav";

const ContentWarper = ({children}) => {
    return(
        <main className="flex relative justify-between w-full">
            <SideNav />
            <div className="content-warper p-4" style={{minHeight:"1000px"}}>
                <div id="content" className="min-h-screen">
                    {children}
                </div>
            </div>
        </main>
    )
}

export default ContentWarper