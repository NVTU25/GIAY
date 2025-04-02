import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FileText } from "lucide-react";


const OrderSuccess = () => {
  const { id } = useParams();
  const [userOrder, setUserOrder] = useState<any>(null);
  const [status, setStatus] = useState([
    { id: 1, value: "Chờ xác nhận" },
    { id: 2, value: "Đang xử lý" },
    { id: 3, value: "Đang giao" },
    { id: 4, value: "Đã giao" },
]);
  useEffect(() => {
    const getOrderOne = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/orders/${id}`);
        setUserOrder(data);
      } catch (error: any) {
        toast.error("Không thể lấy thông tin đơn hàng!");
      }
    };
    getOrderOne();
  }, [id]);
  const getStatusName = (statusId:number) => {
    const nameStatus = status.find(item => item.id === statusId); 
    return nameStatus ? nameStatus.value : 'Không xác định';
  }
  return (
    <div className="mt-[170px] min-h-[300px] mb-[50px]">
      <div className="w-[650px] border mt-[30px] border-[#ccc] mx-auto flex flex-col items-center p-4">
        <span className="w-full flex flex-col items-center justify-center">
          <img className="w-[80px]" src="../icon-thanh-cong.png" alt="Đặt hàng thành công" />
          <h1 className="text-lg font-bold mt-2">Đặt hàng thành công</h1>
          <p className="text-sm text-gray-600">Cảm ơn bạn đã đồng hành và tin tưởng MyShoes</p>
        </span>

        <div className="mt-4 w-full px-4">
          <h3 className="text-lg font-semibold">📦 Thông tin đơn hàng</h3>
          <p className="text-[14px]">
            Mã đơn hàng: <strong>SKU{id}</strong>
          </p>
          <p className="text-[14px]">
            Trạng thái đơn hàng: <span className={`px-3 py-1 rounded-full text-sm ${userOrder.trangthaiId === 4 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600' }`}>
              {getStatusName(userOrder.trangthaiId)}
            </span>
          </p>

          {/* Danh sách sản phẩm */}
          <div className="mt-2">
            {
              userOrder?.items.map((item: any, index: number) => (
                <div key={index} className="w-full flex items-center justify-between border-b pb-2 mt-2">
                  <div className="flex items-center mt-2.5">
                    <img src={item.imageProduct} alt={item.nameProduct} className="w-[50px] h-[50px] pt-[5px]" />
                    <div className="pt-[7px] pl-[5px]">
                      <p className="text-sm font-semibold">{item.nameProduct} - {item.size}</p>
                      <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="[&_p]:text-sm">
                    <p>Giá sản phẩm: {parseInt(item.priceProduct).toLocaleString()}đ</p>
                  </div>
                </div>
              ))
            }
             <p className="mt-[10px] text-right">Tổng thanh toán: <strong className="text-[16px] text-red-500 font-sans">{parseInt(userOrder?.total).toLocaleString()}đ</strong></p>
          </div>
        </div>

        {/* Thông tin giao hàng */}
        <div className="mt-4 w-full px-4">
          <h3 className="text-lg font-semibold">🚚 Thông tin giao hàng</h3>
          <p className="text-[14px] mt-[5px]"><strong>Người nhận:</strong> {userOrder?.username}</p>
          <p className="text-[14px] mt-[5px]"><strong>Số điện thoại:</strong> {userOrder?.phone}</p>
          <p className="text-[14px] mt-[5px]"><strong>Địa chỉ:</strong> {userOrder?.address}</p>
        </div>

        {/* Phương thức thanh toán */}
        <div className="mt-4 w-full px-4">
          <h3 className="text-lg font-semibold">💳 Phương thức thanh toán</h3>
          <p className="text-[14px] mt-[5px]">{userOrder?.phuongthucthanhtoan}</p>
        </div>
        <button className="flex cursor-pointer ml-[380px] text-[16px] mt-[10px] gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md">
          <FileText size={20} />
          <span>Xuất hóa đơn điện tử</span>
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
