import React from "react";
import { SlBookOpen } from "react-icons/sl";
import { FaHome, FaFirefoxBrowser, FaBroadcastTower } from "react-icons/fa";
import { MdMenuBook } from 'react-icons/md';
import { LuMedal } from "react-icons/lu";

const Sidebar = () => {
    return(
        <>
            <ul>
                <li className="text-[rgba(244,87,128)] flex items-center gap-2 p-4 font-black text-2xl">
                    <span><SlBookOpen/></span>
                    <span>Porhaxali</span>
                </li>
                <li className="flex items-center gap-2 p-5 bg-fuchsia-200 hover:bg-fuchsia-200 duration-100">
                    <span><FaHome/></span>
                    <span>Home</span>
                </li>
                <li className="flex items-center gap-2 p-5 hover:bg-fuchsia-200 duration-100">
                    <span><FaFirefoxBrowser/></span>
                    <span>Browse Courses</span>
                </li>
                <li className="flex items-center gap-2 p-5 hover:bg-fuchsia-200 duration-100">
                    <span><FaBroadcastTower/></span>
                    <span>Live Sessions</span>
                </li>
                <li className="flex items-center gap-2 p-5 hover:bg-fuchsia-200 duration-100">
                    <span><MdMenuBook/></span>
                    <span>Notes</span>
                </li>
                <li className="flex items-center gap-2 p-5 hover:bg-fuchsia-200 duration-100">
                    <span><LuMedal/></span>
                    <span>Certificate</span>
                </li>
            </ul>
        </>
    );
}

export default Sidebar;