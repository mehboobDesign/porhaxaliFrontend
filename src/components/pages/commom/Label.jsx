import React from "react";
const Label = ({ htmlFor, nameOfLabel, validRule }) => {

    return (
        <>
            <label className="block tracking-wide text-gray-700 text-xs font-bold mb-1" htmlFor={htmlFor}>

                <span className={validRule ? "text-slate-700 duration-300" : "text-red-400 duration-300"}>
                    {nameOfLabel}
                </span>
            </label>
        </>
    );
}
export default Label;