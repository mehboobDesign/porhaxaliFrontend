import React,{useState,useEffect} from "react";

const DynamicModal = ({isOpen, onClose, title, children}) => {
    //if (!isOpen) return null;

    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (isOpen) {
          setShouldRender(true);
        } else {
          const timer = setTimeout(() => setShouldRender(false), 300); // Matches duration-300
          return () => clearTimeout(timer);
        }
      }, [isOpen]);
    
      if (!shouldRender) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className={`w-full max-w-md rounded-lg bg-white p-6 shadow-xl transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100':'opacity-0'}`}>
                <div className="flex items-center justify-between pb-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <button 
                        onClick={onClose}
                        className="text-pink-600 pl-2 pr-2 bg-gray-200 rounded-full hover:cursor-pointer hover:text-gray-600 font-bold text-3xl"
                        // className={`transition-opacity duration-300 ease-in-out ${
                        //     isOpen ? 'opacity-100' : 'opacity-0'
                        //   }`}
                    >
                        &times;
                    </button>
                </div>
                {/* <div className="py-4">
                    {children}
                </div> */}
                <div
                className={`py-4 transform transition-all duration-300 ease-out ${
            isOpen 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-4'
          }`}>
            {children}
          </div>
            </div>
        </div>
    );
}
export default DynamicModal;