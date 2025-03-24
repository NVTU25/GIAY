import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useState } from "react";
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    const [openCategory, setOpenCategory] = useState(false);
    const [openProducts, setOpenProducts] = useState(false);
     return (
        <div className='w-1/5 flex h-[2000px] bg-white'>
            <div className="w-[100%] mx-auto min-h-screen bg-white shadow-lg pl-4 pt-6 pr-4">
                <ul className="space-y-2">    
                    <li>
                        <Link to={`/dashboard`}>
                        <a
                            className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-200 rounded-md transition-all"
                            href="#"
                        >
                        📊 Dashboard
                        </a>
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => setOpenCategory(!openCategory)}
                            className="flex justify-between items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded-md transition-all"
                        >
                            <span>📂 Category</span>
                            <span>{openCategory ? "▲" : "▼"}</span>
                        </button>
                        {openCategory && (
                            <ul className="ml-4 mt-3 bg-gray-100 rounded-md p-2">
                                <li>
                                    <Link to="listCategory">
                                        <a
                                        className="block p-2 text-gray-700 hover:bg-gray-200 rounded-md transition-all"
                                        href="#"
                                        >
                                        📄 List Category
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="addCategory">
                                    <a
                                    className="block p-2 text-gray-700 hover:bg-gray-200 rounded-md transition-all"
                                    href="#"
                                    >
                                    ➕ Add Category
                                    </a>
                                    </Link>
                                </li>
                                <li>
                                    <a
                                    className="block p-2 text-gray-700 hover:bg-gray-200 rounded-md transition-all"
                                    href="#"
                                    >
                                    ✏️ Update Category
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <button
                            onClick={() => setOpenProducts(!openProducts)}
                            className="flex justify-between items-center w-full p-2 text-gray-700 hover:bg-gray-200 rounded-md transition-all"
                        >
                            <span>📦 Products</span>
                            <span>{openProducts ? "▲" : "▼"}</span>
                        </button>
                        {openProducts && (
                            <ul className="ml-4 mt-3 bg-gray-100 rounded-md p-2">
                            <li>
                                <Link to={`listProduct`}>
                                <a
                                className="block p-2 text-gray-700 hover:bg-gray-200 rounded-md transition-all"
                                href="#"
                                >
                                📋 List Products
                                </a>
                                </Link>
                            </li>
                            <li>
                                <Link to={`addProduct`}>
                                <a
                                className="block p-2 text-gray-700 hover:bg-gray-200 rounded-md transition-all"
                                href="#"
                                >
                                ➕ Add Products
                                </a>
                                </Link>
                            </li>
                            <li>
                                <a
                                className="block p-2 text-gray-700 hover:bg-gray-200 rounded-md transition-all"
                                href="#"
                                >
                                ✏️ Update Products
                                </a>
                            </li>
                            </ul>
                        )}
                    </li>                     
                    <li>
                        <Link to={'listUser'}>
                            <a
                                className="flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-200 rounded-md transition-all"
                                href="#"
                            >
                                <FontAwesomeIcon icon={faUser} /> Danh sách user
                            </a>
                        </Link>  
                    </li>
                </ul>
            </div>
        </div>
  )
}

export default AdminSidebar