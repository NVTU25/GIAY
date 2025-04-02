import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus,faRightLeft, faTruckFast, faAward  } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from '../../interface/product';
import { ICategory } from '../../interface/category';

const ProductCategpry = () => {
    const [ products,setProduct ] = useState<IProduct[]>([]);
    const [ category,setCategory ] = useState<ICategory | null>(null);
    const { id } = useParams();
    useEffect(() => {
        const getListProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/products?categoryId=${id}`);
                setProduct(data);
            } catch (error:any) {
                toast.error(error)
            }
        }
        getListProduct();
        const getCategory = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/categorys/${id}`);
                setCategory(data);
            } catch (error:any) {
                toast.error(error)
            }
        }
        getCategory();
    }, [id]);
    return (
        <div className='mt-[130px] w-full mb-[40px]'>
            <span className='w-[full] pl-[30px] h-[40px] bg-[#EEEEEE] flex items-center text-[#555555] text-[13px]'> <Link to={`/`}>Trang chủ</Link> <span className='ml-[10px] mr-[10px]'>{'>'} {category?.nameCategory}</span></span>
            <h1 className='text-[22px] mt-[20px] pl-[30px] font-semibold font-sans'>{category?.nameCategory} chính hãng</h1>
            <img className='ml-[30px] mr-[20px] mt-[10px] w-[96%]' src="/cata.png" alt="" />
            <table className='mt-[20px] w-[96%] mx-auto border border-[#ccc]'>
                <tbody className='[&_td]:text-center [&_td]:border-r [&_td]:border-r-[#ccc] [&_td]:p-[15px_0px]'> 
                    <tr>
                        <td>
                            <div>
                                <FontAwesomeIcon className='p-[5px_5px] rounded-[50%] border-2 border-[#222222]' icon={faRightLeft }/>
                                <p className='text-[13px] font-sans font-medium'>Đổi hàng 30 ngày, bảo hành 12 tháng</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <FontAwesomeIcon className='p-[6px_4px] rounded-[50%] border-2 border-[#222222]' icon={faTruckFast }/>
                                <p className='text-[13px] font-sans font-medium'>Miễn phí giao hàng với đơn {'>'}500k</p>
                            </div>
                        </td>
                        <td>
                            <div>
                                <FontAwesomeIcon className='p-[5px_7px] rounded-[50%] border-2 border-[#222222]' icon={faAward }/>
                                <p className='text-[13px] font-sans font-medium'>Hàng chính hãng 100%</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='w-full grid grid-cols-5 pt-[20px] pl-[20px] pr-[20px]'>
                {
                    products.map((item) => (
                        <Link to={`/product/${item.id}`}>
                            <div className='w-[100%] h-[400px] group flex flex-col items-center cursor-pointer hover:border-[#ccc] hover:shadow-[0px_0px_10px] hover:shadow-[#ccc] transition-all duration-300 mb-[30px]'>
                                <img className='w-[230px] mt-[20px] transition-all duration-300 group-hover:scale-110' src={item.imageProduct.split(',')[0]} alt="" />
                                    <span className='w-[98%] pt-[20px] mx-auto flex flex-col [&_h3]:text-[14px] [&_h3]:font-semibold [&_h3]:text-[#0a437f] [&_h3]:font-[Poppins]'>
                                        <h3 className='w-[250px] mx-auto text-center'>{item.nameProduct}</h3>
                                        <p className='text-center pt-[10px] text-[14px] font-[Poppins] text-red-700'>{Number(item.priceProduct).toLocaleString()} đ</p>
                                    </span>
                                    <span className='w-full pt-[10px] flex justify-between items-center pl-[25px] pr-[25px]'>
                                        <button className='w-[170px] h-[40px] rounded bg-[#0a437f] text-[15px] font-semibold cursor-pointer font-[Poppins] text-[#fff]'>Mua Ngay</button>
                                        <button className='w-[70px] h-[40px] rounded bg-red-500 transition-all duration-300 group hover:bg-red-700 text-[15px] cursor-pointer font-semibold font-[Poppins] text-[#fff]'>
                                            <FontAwesomeIcon icon={faCartPlus}/>
                                        </button>
                                    </span>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
  )
}

export default ProductCategpry