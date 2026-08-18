import React from "react";
import { Link } from 'react-router-dom';

const RegisterButton = () => {
    return(
        <>
            <Link className="bg-[rgba(244,87,128)] hover:bg-[#f23366] py-1.5 px-4 text-white text-sm rounded-[5px]" to="/register">Sign Up</Link>
        </>
    )
}

export default RegisterButton