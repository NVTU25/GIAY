import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query';
import { Button, Image, Popconfirm, Table } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { ColumnsType } from "antd/es/table";

function Listcategory () {
    const getAllCategory = async () => {
        const { data } = await axios.get(`http://localhost:3000/categorys`);
        return (data);
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["categorys"],
        queryFn: getAllCategory,
    })
    const deleteCategory = async (id:string|number) => {
        try {
            await axios.delete(`http://localhost:3000/categorys/${id}`);
            toast.success("Xóa thành công ");
            refetch();
        } catch (error:any) {
            toast.error(error)
        }
    }
    const colums: ColumnsType<any> = [
        {
            title: "ID Danh Mục",
            dataIndex: "id",
            key: "id",
            align: "center",
        }, 
        {
            title: "Tên Danh Mục",
            dataIndex: "nameCategory",
            key: "nameCategory",
            align: "center",
        }, 
        {
            title: "Ảnh Danh Mục",
            dataIndex: "imageCategory",
            key: "imageCategory",
            align: "center",
            render: (imageSrc: string) => {
                return <Image src={imageSrc} width={130}></Image>
            }
        },
        {
            title: "Hành Động",
            key: "actions",
            align: "center",
            render: (_:any, record: any) => (
                <div className='flex gap-3 justify-center'>
                    <Link to={`/dashboard/updateCategory/${record.id}`}>
                        <Button type='primary' className='bg-blue-500'>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                    </Link>
                    <Popconfirm title="Bạn có muốn xóa danh mục" onConfirm={() => deleteCategory(record.id)} okText="Có" cancelText="Hủy">
                        <Button danger>
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </Popconfirm>
                </div>
            )
        }
    ];
    return <Table className='w-[97%] mx-auto shadow-lg rounded-lg overflow-hidden [&_td]:text-center' dataSource={data} columns={colums} loading={isLoading}></Table>
}

export default Listcategory