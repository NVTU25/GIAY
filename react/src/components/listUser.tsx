import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery } from '@tanstack/react-query'
import { Button, Popconfirm, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import axios from 'axios'
import { toast } from 'react-toastify'

function ListUser() {
    const getAllUser = async () => {
        const { data } = await axios.get(`http://localhost:3000/users`);
        return (data);
    }
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["allUsers"],
        queryFn: getAllUser,
    })
    const onConfirm = async (id:number|string) => {
        try {
            await axios.delete(`http://localhost:3000/users/${id}`);
            toast.success('Xóa thành công ');
            refetch();
        } catch (error:any) {
            toast.error(error)
        }
    }
    const columns:ColumnsType<any> = [
        {
            title: "ID User",
            dataIndex: "id",
            key: "id",
            align: "center"
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            align: "center"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: "center"
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            align: "center"
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            align: "center"
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            align: "center"
        },
        {
            title: "Hành động",
            key: "action",
            align: 'center',
            render: (_:any, record:any) => (
                <Popconfirm title="Bạn chắc chứ" onConfirm={() => onConfirm(record.id)}  okText="Ok" cancelText="Hủy">
                    <Button danger>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </Popconfirm>
            )
        }
    ]
    return <Table className='w-[97%] mx-auto shadow-lg rounded-ld overflow-hidden [&_td]:text-center' dataSource={data} loading={isLoading} columns={columns}></Table>
}

export default ListUser