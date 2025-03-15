import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IProduct } from '../interface/product'
import { toast } from 'react-toastify'

const Listproduct = () => {
    const [ product,setProduct ] = useState<IProduct[]>([]);
    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/products`);
                setProduct(data);
                (data);
            } catch (error) {
                console.log(error);
            }
        }
        getProduct();
    },[]); 
    const deleteProduct = async (id?:string|number) => {
        if(confirm("Bạn có muốn xóa sản phẩm ?")) {
            try {
                await axios.delete(`http://localhost:3000/products/${id}`);
                toast.success("Xóa sản phẩm thành công");
                setProduct(prev => prev.filter(item => item.id !== id));
            } catch (error) {
                console.log(error);
            }
        }
    }
  return (
    <div className='w-[97%] mx-auto mt-[0px] rounded bg-white'>
        <span className='flex justify-between'>
            <h1 className="font-[Merriweather] p-[10px] font-semibold text-[30px] mt-[0px]">Danh sách sản phẩm</h1>
            <Link className='mt-[10px] w-[150px] h-[45px] mr-[12px] bg-blue-500 rounded font-semibold text-white transition-all duration-300 hover:bg-blue-400 flex justify-center items-center' to="/dashboard/addProduct">
                <FontAwesomeIcon className='mr-[5px] mt-[2px]' icon={faPlus}/> AddProduct
            </Link>
        </span>
        <table className="mt-[6px] p-[10px] border border-gray-200 w-[98%] mx-auto border-collapse bg-white shadow-lg rounded-lg overflow-hidden [&_td]:text-center [&_th]:text-[14px] [&_th]:p-[15px] [&_td]:p-[15px] [&_th]:uppercase">
            <thead>
            <tr className="bg-blue-300 [&_th]:text-white">
                <th>ID</th>
                <th>Name Product</th>
                <th>Image</th>
                <th>Price</th>
                <th>CategoryId</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody className='[&_td]:border-b-[1px] [&_td]:border-[#ccc]'>
                {
                    product.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nameProduct}</td>
                        <td className="">
                            <img className="w-[120px] mx-auto rounded" src={item.imageProduct} alt="" />
                        </td>
                        <td>{item.priceProduct}</td>
                        <td>{item.categoryId}</td>
                        <td className="[&_button]:m-2 ">
                        <Link to={`/dashboard/updateProduct/${item.id}`}>
                            <button className="text-blue-500 text-[18px] cursor-pointer transition-all duration-300 hover:scale-110">
                            <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                        </Link>
                        <button onClick={() => deleteProduct(item.id)} className="text-red-600 cursor-pointer transition-all duration-300 hover:scale-110">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        </td>
                    </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Listproduct