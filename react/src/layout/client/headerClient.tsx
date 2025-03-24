
import { faUser,faMagnifyingGlass, faCartShopping,faEnvelope,faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import { ICategory } from "../../interface/category";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const HeaderClient = () => {
    const [ category, setCategory ] = useState<ICategory[]>([]);
    useEffect(() => {
        const getCategorys = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/categorys`);
                setCategory(data);
            } catch (error:any) {
                toast.error(error)
            }
        }
        getCategorys();
    }, []);
    return (
        <header className="w-full fixed top-0 left-0 z-50 bg-[#0a437f] h-[130px] flex flex-col justify-around">
            <section className="w-full flex items-center justify-between pl-[10px] pr-[30px]">
                <div className='logoWeb [&_img]:w-[170px] [&_img]:pl-[20px] mt-[10px]'>
                    <Link to={'/'}>  
                        <img src="../logo.png" alt="" />
                    </Link>
                </div>
                <form action="" className="relative [&_input]:border-[1.5px] mt-[20px] flex [&_input]:pl-[10px] text-[#fff] [&_input]:border-[#ccc] [&_input]:h-[40px] [&_input]:w-[650px] [&_input]:rounded">
                    <input type="text" placeholder='Tìm kiếm sản phẩm' className="placeholder:text-[#fff] focus:outline-0 text-[14px]"/>
                    <button className='icon absolute right-[15px] top-[10px] text-[#fff]'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>
                <span className="flex items-center mt-[20px] relative">
                    <div className="group relative">
                        <FontAwesomeIcon className="text-[26px] text-[#fff] cursor-pointer ml-[40px]" icon={faUser} />
                        <div className="absolute top-[30px] left-0 w-[160px] bg-[#fff] rounded-md text-black shadow-lg p-2
                                        opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 [&_a]:text-[13px]">
                            <Link to={'./account'}>
                                <a href="" className="block px-3 py-2 text-sm hover:bg-gray-200">Tài khoản của tôi</a>
                            </Link>
                            <Link to={'./signin'} >
                                <a href="" className="block px-3 py-2 text-sm hover:bg-gray-200">Đăng nhập</a>
                            </Link>
                            <Link to={'./signup'}>
                                <a href="" className="block px-3 py-2 text-sm hover:bg-gray-200">Đăng ký</a>
                            </Link>    
                        </div>    
                    </div>
                    <Link to={'/cart'}>
                        <FontAwesomeIcon className="text-[26px] text-[#fff] cursor-pointer ml-[40px]" icon={faCartShopping} />
                    </Link>
                </span>
            </section>
            <nav className="w-[100%] flex justify-between">
                <ul className="flex [&_a]:p-[0px_15px] [&_a]:text-[#fff] [&_a]:text-[15px] font-serif ">
                    {
                        category.map((item) => (
                            <li className="group">
                                <Link to={`/product/category/${item.id}`}>
                                    <a className="transition-all duration-300 group-hover:text-[#bdbcbc]" href="">{item.nameCategory}</a>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <div className=" flex items-center pr-[25px]">
                    <span className="mr-[10px] text-[#fff] text-[15px]">
                        <FontAwesomeIcon icon={faEnvelope}/> <a href="#">Liên hệ</a>
                    </span>
                    <span className=" flex items-center text-[#fff] ml-[20px] text-[15px]">
                        <FontAwesomeIcon icon={faPenToSquare }/> <a href="#">Blog</a>
                    </span>
                </div>
            </nav>
        </header>
    )
}

export default HeaderClient