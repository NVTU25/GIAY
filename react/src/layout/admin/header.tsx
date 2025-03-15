import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList,faMagnifyingGlass,faCalendarDays,faGear,faBell,faChevronDown  } from "@fortawesome/free-solid-svg-icons";

type Props = {}

const AdminHeader = (props: Props) => {
  return (
    <header className='bg-white fixed top-0 left-0 w-full h-[80px] flex items-center z-50'>
        <div className='logo w-1/5 pl-[20px] flex items-center'>
            <h1 className='font-semibold font-serif font-pacifico '>PrimeSneaker </h1>
            <div className='icon-list text-[20px] pl-[50px] cursor-pointer text-[#00CED1]'>
                <FontAwesomeIcon icon={faList} />
            </div>
        </div>
        <div className='right-header w-4/5 h-[80px] items-center flex bg-white pr-[30px] justify-between'>
            <form className='w-[700px]  relative [&_input]:w-[700px] [&_input]:h-[45px] rounded pl-[30px] flex items-center'>
                <input className='border-[#00C5CD] bg-transparent border-[2px] rounded-md w-[350px] px-2 py-1 focus:outline-0 text-[#696969] shadow-[#00C5CD] transition-all duration-300 focus:shadow-[0_0_10px_#00C5CD] focus:border-[#00CED1]' type='text' placeholder='Tìm kiếm'/>
                <button className='absolute top-[5px] right-[5px] w-[50px] h-[35px] cursor-pointer rounded bg-[#fff] text-[#00EEEE]'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </form>
            <span className='flex justify-center ml-[50px]'>
                <div className='w-[40px] h-[40px] bg-[#F8F8FF] rounded-[50%] text-[17px] text-[#0066FF] flex justify-center items-center cursor-pointer'>
                    <FontAwesomeIcon icon={faCalendarDays} />
                </div>
                <div className='w-[40px] h-[40px] bg-[#F8F8FF] rounded-[50%] text-[17px] text-red-400 flex justify-center items-center ml-[10px] cursor-pointer'>
                    <FontAwesomeIcon icon={faBell} />
                </div>
                <div className='w-[40px] h-[40px] bg-[#F8F8FF] rounded-[50%] text-[#33CC66] text-[17px] flex justify-center items-center ml-[10px] cursor-pointer'>
                    <FontAwesomeIcon icon={faGear} />
                </div>
                <span className='w-[50px] h-[35px] rounded-[10px] ml-[10px] mt-[3px]'>
                    <img className='w-[50px] h-[35px] rounded-[8px]' src="/vietnam.jpg" alt="" />
                </span>
            </span>
            <span className='contenAdmin w-[170px] h-[55px] rounded-[6px] flex justify-center items-center bg-[#F8F8FF] cursor-pointer'>
                <img className='w-[60px] h-[41px]' src="/avatar.png" alt="" />
                <h5>Admin</h5>
                <p className='text-[16px] pl-[30px] text-[#BBBBBB]'>
                    <FontAwesomeIcon icon={faChevronDown} />
                </p>
            </span>
        </div>
    </header>
  )
}

export default AdminHeader