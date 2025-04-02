import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const ListOrderUser = () => {
    const [ orders, setOrders] = useState<any[]>([]);
    const { id } = useParams();
    const [status, setStatus] = useState([
        { id: 1, value: "Chờ xác nhận" },
        { id: 2, value: "Đang xử lý" },
        { id: 3, value: "Đang giao" },
        { id: 4, value: "Đã giao" },
    ]);
    useEffect(() => {
        const getAllOrderUser = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/orders?userId=${id}`);
                setOrders(data); 
            } catch (error:any) {
                toast.error(error);
            }
        }
        getAllOrderUser();
    }, [id]);
    const getStatusName = (statusId:number) => {
       const nameStatus = status.find(item => item.id === statusId); 
       return nameStatus ? nameStatus.value : 'Không xác định';
    }
    return (
        <div className='mt-[130px] min-h-[300px] mb-[30px] px-6'>
            <h2 className='text-[22px] font-semibold text-center pt-[30px] pb-[20px]'>🕰 Lịch sử đơn hàng</h2>
            {orders.length > 0 ? (
                <div className='grid gap-4'>
                    {orders.map((order:any) => (
                        <div key={order.id} className='p-4 bg-white shadow-md rounded-lg'>
                            <div className='flex justify-between items-center'>
                                <span className='text-gray-500'>Mã đơn: <strong className='text-black'>SKU{order.id}</strong></span>
                                <span className={`px-3 py-1 rounded-full text-sm ${order.trangthaiId === 4 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {getStatusName(order.trangthaiId)}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div className='mt-4'>
                                    <h3 className='text-[18px] font-semibold text-gray-700'>Sản phẩm trong đơn:</h3>
                                    <ul className='list-disc'>
                                        {order?.items.map((product: any) => (
                                            <li key={product.id} className='flex items-center text-gray-700'>
                                                <img 
                                                    src={product.imageProduct} 
                                                    alt={product.nameProduct} 
                                                    className='w-16 h-16 object-cover mr-4 rounded' 
                                                />
                                                <div>
                                                    {product.nameProduct} - <strong>{product.quantity}</strong> x <span className='text-red-600'>{Number(product.priceProduct).toLocaleString()}đ</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='mt-2 text-gray-700'>
                                    <p>📅 Ngày đặt: {new Date(order.date).toLocaleDateString()}</p>
                                    <p>💰 Tổng tiền: <strong className='text-[17px] text-red-700'>{order.total.toLocaleString()}đ</strong></p>
                                </div>
                                
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className='text-center text-gray-500'>Bạn chưa có đơn hàng nào.</p>
            )}
        </div>
    )
}

export default ListOrderUser