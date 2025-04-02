import { faTruckFast } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IOrderForm } from '../../interface/order';



const Checkout = () => {
    const [ cart,setCart ] = useState<any[]>([]);
    const nav = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("Không có token");
            return;
        }
        const userInfo = jwtDecode(token);
        const userId:any = userInfo.sub;
        const getCart= async () => {
            const { data } = await axios.get(`http://localhost:3000/carts?userId=${userId}`);
            setCart(data);
        }
        getCart();
    }, []);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    // đặt hàng
    const { register,handleSubmit } = useForm<IOrderForm>();
    const onSubmit = async (order:IOrderForm) => {
        try {
            const token:any = localStorage.getItem("token");
            const userInfo = jwtDecode(token);
            const userId:any = userInfo.sub;
            const newOrder = 
            {
                ...order, 
                userId: userId, 
                trangthaiId: 1,  
                items: cart.map(item => ({
                    nameProduct: item.nameProduct,
                    imageProduct: item.image,
                    priceProduct: item.price,
                    quantity: item.quantity,
                    size: item.size
                })), 
                total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
                date: Date.now()
            };
            const { data } = await axios.post(`http://localhost:3000/orders`, newOrder);
            toast.success("Đặt hàng thành công!");
            nav(`/orderSuccess/${data.id}`);
            // xóa sản phẩm khỏ giỏ hàng
            await Promise.all(cart.map(item => axios.delete(`http://localhost:3000/carts/${item.id}`)));
            setCart([]);
        } catch (error) {
            toast.error('Đặt hàng thất bại');
        }
    }
    return (
        <div className='mt-[130px] min-h-[300px]'>
            <div className='w-full h-[70px] flex items-center bg-[#EEEEEE]'>
                <h1 className='pl-[30px] text-[22px] font-sans font-semibold pt-[30px] pb-[30px]'>Thông tin đặt hàng</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} action="">
                <div className='w-full flex'> 
                    <div className='w-[30%]'>
                        <div className='w-[400px] ml-[30px] border border-[#ccc] mt-[30px] h-[400px] flex flex-col items-center [&_label]:text-[14px]'>
                            <h4 className='mt-[20px] font-sans font-semibold text-[18px] text-center'>Nhập thông tin khách hàng</h4>
                            <div className='flex flex-col w-[100%] [&_input]:pl-[10px] [&_input:focus]:outline-0 [&_input]:border-[#ccc]'>
                                <div className='flex flex-col w-[85%] mt-[20px] mx-auto [&_input]:border [&_input]:w-full [&_input]:h-[40px]'>
                                    <label htmlFor="">Họ và tên <span className='text-[14px] text-red-500'>(*)</span>
                                        <input type="text" {...register("username")}/>
                                    </label>
                                </div>
                                <div className='flex flex-col mt-[20px] w-[85%] mx-auto [&_input]:border [&_input]:w-full [&_input]:h-[40px]'>
                                    <label htmlFor="">Số điện thoại <span className='text-[14px] text-red-500'>(*)</span>
                                        <input type="number" {...register("phone")}/>
                                    </label>
                                </div>

                                <div className='flex flex-col mt-[20px] w-[85%] mx-auto  [&_input]:border [&_input]:w-full [&_input]:h-[40px]'>
                                    <label htmlFor="">Địa chỉ giao hàng <span className='text-[14px] text-red-500'>(*)</span>
                                        <input type="text" {...register("address")}/>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[70%] ml-[20px]'>
                        <div className='w-full '>
                            <span className='ml-[300px]'>
                                <h3>PHƯƠNG THỨC THANH TOÁN</h3>
                                <input className='cursor-pointer' type="radio" id='thanhtoan' value={'Thanh toán khi nhận hàng'} {...register("phuongthucthanhtoan")}/> <label htmlFor=""><FontAwesomeIcon icon={faTruckFast} /> Thanh toán khi nhận hàng</label>
                            </span>
                        </div>
                        <table className='w-[97%] mt-[50px] border border-[#ccc]'>
                            <thead className='border-b border-b-[#ccc] w-full [&_th]:text-[14px] [&_th]:font-medium'>
                                <tr>
                                    <th className="text-left p-[10px]">Hình ảnh</th>
                                    <th className="text-left p-[10px]">Tên sản phẩm</th>
                                    <th className="text-left p-[10px]">Mã sản phẩm</th>
                                    <th className="text-left p-[10px]">Số lượng </th>
                                    <th className="text-left p-[10px]">Giá</th>
                                    <th className="text-left p-[10px]">Tổng</th>
                                </tr>
                            </thead>
                            {cart.map((item, index) => (
                                <tbody className='w-full'>
                                    <tr key={index} className='[&_td]:text-left [&_td]:p-[10px]'>
                                        <td className='[&_img]:w-[90px] [&_img]:ml-[10px]'>
                                            <img src={item.image} alt="" />
                                        </td>
                                        <td className='[&_p]:text-[14px] '>
                                            <Link to={`/product/${item.id}`}>
                                                    <p className='text-[#0f3a9c] cursor-pointer'>{item.nameProduct}</p>
                                            </Link>
                                            <p className='mt-[0px]'>Chọn size: {item.size}</p>
                                        </td>
                                        <td>
                                            <p>{item.id}</p>
                                        </td>
                                        <td>
                                            <form  className='flex items-center' action="">
                                                {/* Ô nhập số lượng */}
                                                <input 
                                                    className="w-[50px] h-[40px] text-center border border-[#ccc] focus:outline-none"
                                                    type="number" 
                                                    value={item.quantity} 
                                                />   
                                            </form>
                                            </td>
                                            <td className='text-[15px] text-gray-500'>
                                                {parseInt(item.price).toLocaleString()} <u>đ</u>
                                            </td>
                                            <td className='text-[15px] text-gray-500'>
                                                {(Number(item.price * item.quantity)).toLocaleString()} <u>đ</u>
                                            </td>
                                        </tr> 
                                </tbody>
                            ))}
                        </table>
                        <div className='tong w-[97%] border border-[#ccc] ml-[0px] mt-[20px] mb-[20px]'>
                            <span className='[&_p]:pl-[30px] [&_p]:mt-[20px]'>
                                <p className='font-semibold text-[14px] ml-[700px]'>Thành tiền: <span className='ml-[70px] font-medium'>{totalPrice.toLocaleString()}<u>đ</u></span></p>
                            </span>
                            <span className='[&_p]:pl-[30px] [&_p]:mt-[10px]'>
                                <p className='font-semibold text-[14px] ml-[700px]'>Tổng thanh toán: <span className='ml-[32px]'>{totalPrice.toLocaleString()}<u>đ</u></span></p>
                            </span>
                            <button type='submit' className='mt-[30px] mb-[30px] ml-[30px] mr-[30px] w-[940px] h-[45px] cursor-pointer text-[#fff] font-sans font-semibold bg-[#cc041a] transition-all duration-300 group hover:bg-[#e2293d] border'>
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Checkout