import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { IProduct } from '../../interface/product';

const ListProductClient = () => {
    const [ productNew,setProductNew ] = useState<IProduct[]>([]);
    useEffect(() => {
        const getProductNew = async () => {
            try {
                const { data } = await axios.get(` http://localhost:3000/products?tinhtrang=1`);
                setProductNew(data);
            } catch (error:any) {
                toast.error(error)
            }
        }
        getProductNew();
    }, []);
    const [ productNB,setProductNB ] = useState<IProduct[]>([]);
    useEffect(() => {
        const getProductNB = async () => {
            try {
                const { data } = await axios.get(` http://localhost:3000/products?tinhtrang=2`);
                setProductNB(data);
            } catch (error:any) {
                toast.error(error)
            }
        }
        getProductNB();
    }, []);
    const [ thuoghieu,setProductTH ] = useState<IProduct[]>([]);
    useEffect(() => {
        const getProductTH = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/products?categoryId=3`);
                setProductTH(data);
            } catch (error:any) {
                toast.error(error)
            }
        }
        getProductTH();
    }, []);
    return (
        <main>
            <div className='w-full bg-[#fff] p-[0px_20px] min-h-[600px]'>
                <span className='text-center'>
                    <h1 className='text-[26px] font-bold text-[#004400] pt-[10px] font-[Poppins]'>Sản phẩm mới</h1>
                    <p className='mx-auto w-[195px] rounded-[15px_15px_15px_15px] h-[4px] bg-red-800'></p>
                    <p className='text-[#3a4754] mt-[10px]'>#NEW</p>
                </span>
                <div className='w-full grid grid-cols-5 pt-[20px]'>
                    {
                        productNew.map((item) => (
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
            <div className='w-full bg-[#fff] p-[0px_20px] mt-[10px] min-h-[600px]'>
                <span className='text-center'>
                    <h1 className='text-[26px] font-bold text-[#004400] pt-[10px] font-[Poppins]'>Sản phẩm nổi bật</h1>
                    <p className='mx-auto w-[215px] rounded-[15px_15px_15px_15px] h-[4px] bg-red-800'></p>
                    <p className='text-[#3a4754] mt-[10px]'>#FEATURE</p>
                </span>
                <div className='w-full grid grid-cols-5 pt-[20px]'>
                    {
                        productNB.map((item) => (
                            <Link to={`/product/${item.id}`}>
                                <div className='w-[100%] h-[400px] group flex flex-col items-center cursor-pointer hover:border-[#ccc] hover:shadow-[0px_0px_10px] hover:shadow-[#ccc] transition-all duration-300'>
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
            <div className='w-full bg-[#fff] p-[0px_20px] mt-[30px] min-h-[600px]'>
                <span className='text-center'>
                    <h1 className='text-[26px] font-bold text-[#004400] pt-[10px] font-[Poppins]'>Thương hiệu nổi bật</h1>
                    <p className='mx-auto w-[245px] rounded-[15px_15px_15px_15px] h-[4px] bg-red-800'></p>
                    <p className='text-[#3a4754] mt-[10px]'>#BRAND</p>
                </span>
                <div className='w-full flex'>
                    <div className='relative w-[35%] [&_img]:h-[820px] [&_img]:w-full pt-[20px] [&_img]:pb-[20px]'>
                        <img src="./thuonghieu.jpg" alt="" />
                        <h3 className='absolute top-[40px] left-[20px] w-[150px] h-[35px] bg-red-700 text-[#fff] font-semibold text-[16px] uppercase text-center flex justify-center items-center'>Giày Chính Hãng</h3>
                    </div>
                    <div className='w-full grid grid-cols-4 pl-[20px] pt-[20px]'>
                        {
                            thuoghieu.map((item) => (
                                <Link to={`/product/${item.id}`}>
                                    <div className='w-[100%] h-[400px] mb-[20px] group flex flex-col items-center cursor-pointer hover:border-[#ccc] hover:shadow-[0px_0px_10px] hover:shadow-[#ccc] transition-all duration-300'>
                                        <img className='w-[230px] mt-[20px] transition-all duration-300 group-hover:scale-110' src={item.imageProduct.split(',')[0]} alt="" />
                                        <span className='w-[98%] pt-[20px] mx-auto flex flex-col [&_h3]:text-[14px] [&_h3]:font-semibold [&_h3]:text-[#0a437f] [&_h3]:font-[Poppins]'>
                                            <h3 className='w-[250px] mx-auto text-center'>{item.nameProduct}</h3>
                                            <p className='text-center pt-[10px] text-[14px] font-[Poppins] text-red-700'>{Number(item.priceProduct).toLocaleString()} đ</p>
                                        </span>
                                        <span className='w-full pt-[10px] flex justify-between items-center pl-[15px] pr-[15px]'>
                                            <button className='w-[160px] h-[40px] rounded bg-[#0a437f] text-[15px] font-semibold cursor-pointer font-[Poppins] text-[#fff]'>Mua Ngay</button>
                                            <button className='w-[60px] h-[40px] rounded bg-red-500 transition-all duration-300 group hover:bg-red-700 text-[15px] cursor-pointer font-semibold font-[Poppins] text-[#fff]'>
                                                <FontAwesomeIcon icon={faCartPlus}/>
                                            </button>
                                        </span>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
  )
}

export default ListProductClient