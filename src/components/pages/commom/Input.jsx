import React from "react";
import { FaInfoCircle } from "react-icons/fa";

const Input = ({ id, type, value, placeHolder, autoComplete, onChange, aria_invalid, aria_describedby, onFocus, onBlur, disabled, focusValue, validValue, errorMesg }) => {
    return (
        <>
            <input
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition shadow-sm"
                type={type}
                id={id}
                value={value}
                placeholder={placeHolder}
                autoComplete={autoComplete}
                onChange={onChange}
                required
                aria-invalid={aria_invalid}
                aria-describedby={aria_describedby}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={disabled}
            />{
                errorMesg && <p id={aria_describedby} className={`${focusValue && !validValue
                    ? "text-red-400 duration-300" : "hidden duration-300"}`}>
                    <span className="flex flex-wrap text-sm"><FaInfoCircle />&nbsp;{errorMesg}</span>
                </p>
            }
            
        </>
    );
}
export default Input;