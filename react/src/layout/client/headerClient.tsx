
import { faUser,faMagnifyingGlass, faCartShopping   } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";
import { ICategory } from "../../interface/category";
import axios from "axios";
import { toast } from "react-toastify";
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
        <header className="w-full bg-[#0a437f] h-[130px] flex flex-col justify-around">
            <section className="w-full flex justify-around ">
                <div className='logoWeb [&_img]:w-[170px] [&_img]:pl-[20px] mt-[10px]'>
                    <img src="./public/logo.png" alt="" />
                </div>
                <form action="" className="relative [&_input]:border-[1.5px] mt-[20px] flex [&_input]:pl-[10px] text-[#fff] [&_input]:border-[#ccc] [&_input]:h-[40px] [&_input]:w-[650px] [&_input]:rounded">
                    <input type="text" placeholder='Tìm kiếm sản phẩm' className="placeholder:text-[#fff] focus:outline-0 text-[14px]"/>
                    <button className='icon absolute right-[15px] top-[10px] text-[#fff]'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </form>
                <div>
                    <span className="flex items-center mt-[20px]">
                        <FontAwesomeIcon className="text-[26px] text-[#fff] cursor-pointer" icon={faUser}/>
                        <div className="[&_p]:text-[#fff] flex flex-col ml-[3px] [&_a]:text-[11px] [&_a]:text-[#fff]">
                            <a href="">Đăng nhập</a>
                            <a href="">Đăng ký</a>
                        </div>
                        <FontAwesomeIcon className="text-[26px] text-[#fff] cursor-pointer ml-[30px]" icon={faCartShopping } />
                    </span>
                </div>
            </section>
            <nav className="w-[90%] mx-auto ">
                <ul className="flex [&_a]:p-[0px_35px] [&_a]:text-[#fff] [&_a]:text-[15px] font-serif ">
                    {
                        category.map((item) => (
                            <li className="group"><a className="transition-all duration-300 group-hover:text-[#bdbcbc]" href="">{item.nameCategory}</a></li>
                        ))
                    }
                </ul>
            </nav>
        </header>
    )
}

export default HeaderClient