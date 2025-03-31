import { useQuery } from '@tanstack/react-query'
import { Image, Table } from 'antd'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const ListOrderUser = () => {
    const { id } = useParams();
    const getAllOrderUser = async () => {
        const { data } = await axios.get(`http://localhost:3000/orders?userId=${id}`);
        const itemsList = data.flatMap((order:any) => 
            order.items.map((item:any,index:any) => ({
                key: `${order.id}-${index}`,
                id: order.id,
                username: order.username,
                trangthai: order.trangthai,
                ...item
            }))
        )
    
        return itemsList
    }
    const { data, isLoading } = useQuery({
        queryKey: ["order", id],
        queryFn: getAllOrderUser,
    })
    const columns = [
        {
            title: "Mã đơn hàng",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Ảnh",
            dataIndex: "imageProduct",
            key: "image",
            render: (imageSrc: string) => {
                return <Image src={imageSrc} width={130}></Image>
            }
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "nameProduct",
            key: "nameproduct"
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantyti"
        },
        {
            title: "Giá sản phẩm",
            dataIndex: "priceProduct",
            key: "priceproduct"
        },
        {
            title: "Người đặt hàng",
            dataIndex: "username",
            key: "username"
        },
        {
            title: "Trạng thái hàng",
            dataIndex: "trangthai",
            key: "trangthai"
        },
    ] 
    return (
        <div className='mt-[130px] min-h-[300px] mb-[30px]'>
            <h2 className='pl-[30px] text-[22px] font-sans font-semibold text-center pt-[30px] pb-[30px]'>🕰 Lịch sử đơn hàng</h2>
            <Table className='w-[95%] mx-auto' dataSource={data} loading={isLoading} columns={columns}></Table>
        </div>
    )
}

export default ListOrderUser