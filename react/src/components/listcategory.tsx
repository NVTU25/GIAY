import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ICategory } from '../interface/category'
import axios from 'axios'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify'

const Listcategory = () => {
    const [ category,setCategory ] = useState<ICategory[]>([]);
    useEffect(() => {
        const getCategory = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/categorys`);
                setCategory(data);
            } catch (error) {
                console.log(error);
            }
        }
        getCategory();
    },[]); 
    const deleteCategory = async (id?:string|number) => {
        if(confirm("Bạn có muốn xóa danh mục ?")) {
            try {
                await axios.delete(`http://localhost:3000/categorys/${id}`);
                toast.success("Xóa danh mục thành công");
                setCategory(prev => prev.filter(item => item.id !== id));
            } catch (error) {
                console.log(error);
            }
        }
    }
  return (
    <div className='w-[97%] mx-auto mt-[0px] rounded bg-white'>
        <span className='flex justify-between'>
            <h1 className="font-[Merriweather] p-[10px] font-semibold text-[30px] mt-[0px]">Danh sách danh mục</h1>
            <Link className='mt-[10px] w-[150px] h-[45px] mr-[12px] bg-blue-500 rounded font-semibold text-white transition-all duration-300 hover:bg-blue-400 flex justify-center items-center' to="/dashboard/addCategory">
                <FontAwesomeIcon className='mr-[5px] mt-[2px]' icon={faPlus}/> AddCategory
            </Link>
        </span>
        <table className="mt-[6px] p-[10px] border border-gray-200 w-[98%] mx-auto border-collapse bg-white shadow-lg rounded-lg overflow-hidden [&_td]:text-center [&_th]:text-[14px] [&_th]:p-[15px] [&_td]:p-[15px] [&_th]:uppercase">
            <thead>
            <tr className="bg-blue-300 [&_th]:text-white">
                <th>ID</th>
                <th>Name Category</th>
                <th>Image Category</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody className='[&_td]:border-b-[1px] [&_td]:border-[#ccc]'>
                {
                    category.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nameCategory}</td>
                        <td className="">
                        <img className="w-[120px] mx-auto" src={item.imageCategory} alt="" />
                        </td>
                        <td className="[&_button]:m-2 ">
                        <Link to={`/dashboard/updateCategory/${item.id}`}>
                            <button className="text-blue-500 text-[18px] cursor-pointer transition-all duration-300 hover:scale-110">
                            <FontAwesomeIcon icon={faPenToSquare} />
                            </button>
                        </Link>
                        <button onClick={() => deleteCategory(item.id)} className="text-red-600 cursor-pointer transition-all duration-300 hover:scale-110">
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

export default Listcategory