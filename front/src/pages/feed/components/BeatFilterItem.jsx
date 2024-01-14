import React, {useEffect, useRef, useState} from 'react'
import { Icon } from '@iconify/react'


function BeatFilterItem({filter, options}) {

    const [isOpen, setIsOpen] = useState(false);

    const menuRef = useRef(null);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        }
    };


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
            <div className="relative inline-block text-left" ref={menuRef}>
                <button
                    onClick={toggleMenu}
                    type="button"
                    className={`inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 focus-visible:ring-gray-300 ${isOpen ? 'ring-2 ring-red-500' : ''}`}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                >
                    {filter.name}
                    {/* Agrega un icono de desplegar, por ejemplo, una flecha hacia abajo */}
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 ml-2 transition-transform ${
                        isOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                    </svg>
                </button>
                {isOpen && options && (
                <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-stone-900 ring-1 ring-white z-40">
                    {options()}
                </div>)}
            </div>
    )
}

export default BeatFilterItem