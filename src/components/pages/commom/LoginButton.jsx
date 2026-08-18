import React from "react";
import { Link } from "react-router-dom";

const LoginButton = () => {
    return(
        <>
            {/* <Link className="bg-[rgba(244,87,128)] hover:bg-[#f23366] py-1.5 px-4 text-white text-sm rounded-[5px]" to="/login">Login</Link> */}
            <Link className="text-sm font-semibold px-5 py-2.5 rounded-xl border transition-colors duration-300 ease-in-out hover:text-white bg-linear-to-r from-blue-600 to-blue-600 bg-size-[0%_100%] bg-left bg-no-repeat hover:bg-size-[100%_100%] text-slate-700 " to="/login">Login</Link>
        </>
    );
}

export default LoginButton;