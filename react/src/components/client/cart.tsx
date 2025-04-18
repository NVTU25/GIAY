import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
    const [ cart, setCart ] = useState<any[]>([]);
    useEffect(() => {
        const getOrderId = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            } 
            const userInfo = jwtDecode(token);
            const userId:any = userInfo.sub;
            const { data } = await axios.get(`http://localhost:3000/carts?userId=${userId}`);
            setCart(data);
        }
        getOrderId();
    }, []);
    // khi click vào nút tăng sản phẩm
    const tangQuantity = async (id:any, size:any) => {
        setCart(prevCart => {
            return prevCart.map(item => 
                item.id === id && item.size === size
                ? { ...item, quantity: item.quantity + 1}
                : item
            );
        });
        try {
            const item = cart.find(item => item.id === id && item.size === size);
            if (item) {
                await saveCart({...item, quantity: item.quantity + 1}, id);
            }
        } catch (error:any) {
            toast.error(error);
        }
    }
    // đây là giảm sản phẩmphẩm
    const giamQuantity = async (id:any, size:any) => {
        setCart(prevCart => {
            return prevCart.map(item => 
                item.id === id && item.size === size
                ? {...item, quantity: item.quantity - 1}
                : item
            );
        });
        try {
            const item = cart.find(item => item.id === id && item.size === size);
            if (item) {
                await saveCart({...item, quantity: item.quantity - 1}, id);
            }
        } catch (error:any) {
            toast.error(error);
        }
    }
    // đây là khi nhập số lượng
    const handleInput = async (e:any, id:any, size:any) => {
        const newQuantity = parseInt(e.target.value);
        if ( newQuantity > 1) {
            setCart(prevCart => {
                return prevCart.map(item => 
                    item.id === id && item.size === size
                    ? {...item, quantity: newQuantity}
                    : item
                )
            });
        };
        try {
            const item = cart.find(item => item.id === id && item.size === size);
            if (item) {
                await saveCart({...item, quantity: newQuantity}, id)
            }
        } catch (error:any) {
            toast.error(error);
        }
    }
    
    // đây là xóa
    const removeItem = async (id:any) => {
        if(confirm("Bạn chắc chứ ?")) {
            await axios.delete(`http://localhost:3000/carts/${id}`);
            toast.success('Xóa thành công');
            setCart(prev => prev.filter(item => item.id !== id));
        }
    };
    // tổng tiền
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const saveCart = async (values:any,id:any) => {
        await axios.patch(`http://localhost:3000/carts/${id}`,values);
    }
    return (
        <div className='mt-[130px] min-h-[300px]'>
            <div className='w-full h-[70px] flex items-center bg-[#EEEEEE]'>
                <h1 className='pl-[30px] text-[22px] font-sans font-semibold pt-[30px] pb-[30px]'>🛒 Giỏ hàng của bạn</h1>
            </div>
            <div className='w-full bg-[#fff] shadow-md'>
                <div className='product w-full mt-[20px] pb-[20px]'>
                    {cart.length === 0 ? (
                        <p className='flex ml-[30px] items-center'>Giỏ hàng trống . <Link to={'/'}><span className='text-[#0f3a9c]'>Quay lại mua sắm</span></Link></p> 
                    ) : (
                        <div>
                            <div className='w-full flex'>
                                <table className='cart-list w-[70%] ml-[30px] border border-[#ccc]'>
                                    <thead className='border-b border-b-[#ccc] w-full [&_th]:text-[14px] [&_th]:font-medium'>
                                        <tr>
                                            <th className="text-left p-[10px]">Hình ảnh</th>
                                            <th className="text-left p-[10px]">Tên sản phẩm</th>
                                            <th className="text-left p-[10px]">Số lượng</th>
                                            <th className="text-left p-[10px]">Đơn giá</th>
                                            <th className="text-left p-[10px]">Tổng cộng</th>
                                        </tr>
                                    </thead>
                                    {cart.map((item, index) => (
                                    <tbody className='w-full'>
                                        <tr key={index} className='[&_td]:text-left [&_td]:p-[10px]'>
                                            <td className='[&_img]:w-[90px] [&_img]:ml-[10px]'>
                                                <img src={item.image} alt="" />
                                            </td>
                                            <td className='[&_p]:text-[14px] '>
                                                <Link to={`/product/${item.productId}`}>
                                                    <p className='text-[#0f3a9c] cursor-pointer'>{item.nameProduct}</p>
                                                </Link>
                                                <p className='mt-[0px]'>Chọn size: {item.size}</p>
                                            </td>
                                            <td>
                                                <form  className='flex items-center' action="">
                                                    {/* Ô nhập số lượng */}
                                                    <input 
                                                        className="w-[50px] h-[40px] text-center border border-[#ccc] focus:outline-none"
                                                        type="number" 
                                                        value={item.quantity} 
                                                        onChange={(e) => handleInput(e, item.id, item.size)} 
                                                    />
                                                    <span>
                                                        <button onClick={() => tangQuantity(item.id, item.size)} type="button" className="w-[30px] text-[12px] h-[20px] border border-[#ccc] flex items-center justify-center bg-gray-100 hover:bg-gray-200">
                                                             ▲
                                                        </button>
                                                        <button onClick={() => giamQuantity(item.id, item.size)} type="button" className="w-[30px] text-[12px] h-[20px] border border-[#ccc] flex items-center justify-center bg-gray-100 hover:bg-gray-200">
                                                            ▼
                                                        </button>
                                                    </span> 
                                                    {/* Nút cập nhật */}
                                                    <button type="submit" className="w-[40px] h-[40px] border-r border-[#ccc] flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600"
                                                    >
                                                        🔄
                                                    </button>
                                                    {/* Nút xóa sản phẩm */}
                                                    <button 
                                                        type="button"
                                                        className="w-[40px] text-[13px] h-[40px] flex cursor-pointer items-center justify-center bg-red-500 text-white hover:bg-red-600"
                                                        onClick={() => removeItem(item.id)}
                                                    >
                                                        ✖
                                                    </button>
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
                                    <div className='tong w-[25%] border border-[#ccc] ml-[30px]'>
                                        <span className='[&_p]:pl-[30px] [&_p]:mt-[20px]'>
                                            <p className='font-semibold text-[14px]'>Thành tiền: <span className='ml-[150px] font-medium'>{totalPrice.toLocaleString()}<u>đ</u></span></p>
                                        </span>
                                        <span className='[&_p]:pl-[30px] [&_p]:mt-[10px]'>
                                            <p className='font-semibold text-[14px]'>Tổng thanh toán: <span className='ml-[110px]'>{totalPrice.toLocaleString()}<u>đ</u></span></p>
                                        </span>
                                        <Link to={`/checkOut`}>
                                            <button className='mt-[30px] mb-[30px] ml-[30px] mr-[30px] w-[320px] h-[45px] cursor-pointer text-[#fff] font-sans font-semibold bg-[#cc041a] transition-all duration-300 group hover:bg-[#e2293d] border'>
                                                Thanh toán
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                           
                        </div>
                        
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart