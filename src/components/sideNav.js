import React, { useState, useEffect } from "react";
import "./sideNav.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useLocation } from "react-router-dom";
import routes from "./navData";
import MenuIcon from '@mui/icons-material/Menu';

const SideNav = () => {
    const location = useLocation()
    const [sideBarActive, setSideBarActive] = useState(false);

    const sideBarToggle = () => {
        setSideBarActive(!sideBarActive)
        console.log(sideBarActive)
    }
    useEffect(() => {
        console.log(location.pathname.split('/')[1])
    }, [])
    return(
        <aside className={`fixed side-nav-width ease-in-out duration-500 side-nav-z-index ${sideBarActive ? "side-nav-acticve" : "side-nav"}`}>
            <button id="sideBarToggle" className="md:hidden absolute right-auto bg-orange-500 rounded p-1 m-2" onClick={sideBarToggle}><MenuIcon className="text-white" /></button>
            <div className="fixed shadow-2xl overflow-y-scroll bg-white side-nav-height side-nav-width pt-2">
                {routes.map(route => {
                    return (
                        <div className="pb-6 group" key={route.id}>
                            <div>
                                <Link to={route.link} key={route.nama} className={`relative flex px-4 items-center w-full group-hover:bg-slate-100 font-bold ${location.pathname.split('/')[1] === route.link ? `text-orange-500` : `text-black`}`}>{route.nama}
                                {route.subMenu.length !== 0 && <KeyboardArrowDownIcon className="absolute float-right rotate-180 left-auto right-2"/> }
                                </Link>
                            </div>
                            {route.subMenu.map(subMenu => {
                                return(
                                    <Link to={`/${route.link}/${subMenu.link}`} key={subMenu.nama} className={`flex px-6 ${location.pathname.split('/')[1] === route.link && location.pathname.split('/')[2] === subMenu.link ? `text-orange-500` : `text-black`}`}>{subMenu.nama}</Link>
                                )
                            })}
                        </div>
                    )
                })} 
            </div>
        </aside>
    )
}

export default SideNav