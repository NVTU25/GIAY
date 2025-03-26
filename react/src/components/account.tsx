import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Account = () => {
  const [ userOne,setUserOne ] = useState<any>(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Không có token");
      return;
    }
    const userInfo = jwtDecode(token);
    const userId:any = userInfo.sub;
    const getOneUser = async (id:number|string) => {
      try {
        const { data } = await axios.get(`http://localhost:3000/users/${id}`);
        setUserOne(data);
      } catch (error:any) {
        toast.error(error)
      }
    }
    getOneUser(userId);
  }, []);
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className="bg-white mt-[130px] mb-[60px] p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Tài khoản của tôi</h1>
        <form className="space-y-4 mb-[20px]">
          {/* Họ tên */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Họ tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"    
              value={userOne?.username} readOnly 
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"    
              value={userOne?.email} readOnly 
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={userOne?.phone} readOnly 
            />
          </div>
          {/* Địa chỉ */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Địa chỉ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={userOne?.address} readOnly 
            />
          </div>
          <div className="flex justify-between mt-[10px]">
            <a href="" className="text-[12px] font-sans group hover:underline">Cập nhập tài khoản</a>
            <Link to={`/listOrderUser/${userOne?.id}`}>
             <a href="" className="text-[12px] font-sans group hover:underline">Lịch sử đặt hàng</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Account