import React from "react";
import SearchBox from "./commom/SearchBox";
import LoginButton from "./commom/LoginButton";
import RegisterButton from "./commom/RegisterButton";

const UnauthHome = () => {
    return(
        <>
            <div className="flex items-center gap-4 p-5">
                <SearchBox/>
                <LoginButton/>
                <RegisterButton/>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-[80%] border border-gray-100">Muktarul moi kam kori asu, toi phone kiyo receive nokora.</div>
                <div className="w-full md:w-[20%]">Mukhtarul toi ki kori asa, toi</div>
            </div>
        </>
       
    )
}

export default UnauthHome;