import { useQuery } from "@tanstack/react-query";
import { Button, Image, Popconfirm, Table } from "antd";
import axios from "axios";
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";

function Listproduct() {
    const getAllProduct = async () => {
        const { data } = await axios.get(`http://localhost:3000/products`);
        return data;
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProduct,
    })
    const deleteProduct = async (id:string|number) => {
        try {
            await axios.delete(`http://localhost:3000/products/${id}`);
            toast.success("Xóa thành công")   
            refetch();
        } catch (error:any) {
            toast.error(error)
        }
    }
    const colums: ColumnsType<any>= [
        {
            title: "ID Sản Phẩm",
            dataIndex: "id",
            key: "id",
            align: "center",
        },
        {
            title: "Tên Sản Phẩm",
            dataIndex: "nameProduct",
            key: "nameProduct",
            align: "center",
        },
        {
            title: "Giá Sản Phẩm",
            dataIndex: "priceProduct",
            key: "priceProduct",
            align: "center",
        },
        {
            title: "Ảnh Sản Phẩm",
            dataIndex: "imageProduct",
            key: "imageProduct",
            align: "center" ,
            render: (imageSrc: string) => {
                return <Image src={imageSrc.split(',')[0]} width={130}></Image>
            }
        },
        {
            title: "Id Danh mục",
            dataIndex: "categoryId",
            key: "categoryId",
            align: "center" ,
        },
        {
            title: "Hành Động",
            key: "actions",
            align: "center" ,
            render: (_: any, record: any) => (
                <div className="flex gap-3 justify-center">
                    {/* Nút sửa */}
                    <Link to={`/dashboard/updateProduct/${record.id}`}>
                        <Button type="primary" className="bg-blue-500">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                    </Link>
                    {/* Nút xóa */}
                    <Popconfirm title="Bạn có muốn xóa sản phẩm không" onConfirm={() => deleteProduct(record.id)} okText="Có" cancelText="Hủy">
                        <Button danger>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </Popconfirm>
                </div>
            )
        }
    ];
    return <Table className="w-[97%] mx-auto shadow-lg rounded-lg overflow-hidden [&_th]:text-center"  dataSource={data} columns={colums} loading={isLoading}></Table> 
}

export default Listproduct