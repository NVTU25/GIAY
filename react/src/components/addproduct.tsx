import { IProductForm } from "../interface/product";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { ICategory } from "../interface/category";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ITinhtrang } from "../interface/tinhtrang";

const AddProduct = () => {
  const { register,handleSubmit,formState:{errors} } = useForm<IProductForm>();
  const nav = useNavigate();
  const onSubmit = async (product:IProductForm) => {
    try {
      await axios.post(`http://localhost:3000/products`, product);
      toast.success("Thêm mới sản phẩm thành công");
      nav('/dashboard/listProduct');
    } catch (error:any) {
      alert(error.response.data??error.message)
    }
  }
  // lấy ra danh mục
  const [ category,setCategory ] = useState<ICategory[]>([]);
  useEffect(() => {
   const getCategoryById = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/categorys`);
      setCategory(data); 
    } catch (error:any) {
      alert(error.response.data??error.message)
    }
   } 
   getCategoryById();
  },[]);
  // lấy ra tình trạng
  const [ tinhtrang,setTinhtrang ] = useState<ITinhtrang[]>([]);
  useEffect(() => {
    const getTinhtrang = async () => {
        try {
            const { data } = await axios.get(` http://localhost:3000/tinhtrang`);
            setTinhtrang(data);
        } catch (error:any) {
            toast.error(error)
        }
    }
    getTinhtrang();
  }, []);
  return (
        <div className="w-[97%] mx-auto mt-[0px]">
            <h1 className="font-[Merriweather] font-semibold text-[30px]">AddProduct</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="relative mt-[20px]">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label font-[Poppins] text-[16px]">
                        Tên sản phẩm <span className="text-red-500">(*) {errors.nameProduct&&<span className="text-[15px] text-red-600">Tên không được để trống !</span>}</span>
                    </label>
                    <input type="text" className="form-control w-full border border-[#B5B5B5] rounded h-[45px] pl-[10px] mt-[10px] focus:outline-[#00C5CD] transition-all duration-300 focus:shadow-[0_0_10px_#00C5CD] focus:border-[#00CED1]" placeholder="Nhập tên sản phẩmphẩm..."
                        {...register("nameProduct", {
                        required: true
                        })}
                    />
                </div>
                <div className="mb-3 flex flex-col">
                    <label htmlFor="exampleInputEmail1" className="form-label font-[Poppins] text-[16px]">
                        Tình trạng sản phẩm <span className="text-red-500">(*) {errors.nameProduct&&<span className="text-[15px] text-red-600">Tên không được để trống !</span>}</span>
                    </label>
                    <span className="w-full flex items-center mt-[10px] gap-8">
                        {
                            tinhtrang.map((item) => (
                                <span className="flex">
                                    <label htmlFor="" className="even:pl-[20px] text-[14px] font-[Poppins]"> {item.tinhtrang} </label>
                                    <input type="radio" id={`tinhtrang-${item.id}`} className="w-[12px] form-control border border-[#B5B5B5] pt-[5px] rounded ml-[4px] mt-[0px] focus:outline-[#00C5CD] transition-all duration-300 focus:shadow-[0_0_10px_#00C5CD] focus:border-[#00CED1]" value={item.id}
                                        {...register("tinhtrang", {
                                            required: true
                                        })}
                                    />
                                </span>
                            ))
                        }
                    </span>
                </div>
                <div className="mb-3 mt-[20px]">
                    <label htmlFor="exampleInputPassword1" className="form-label font-[Poppins] text-[16px]">
                    Giá sản phẩm <span className="text-red-500">(*) {errors.priceProduct&&<span className="text-[15px] text-red-600">Giá không được để trống và {'>'} 0 !</span>}</span>
                    </label>
                    <input
                    type="number"
                    className="w-full border border-[#B5B5B5] rounded h-[45px] pl-[10px] mt-[10px] focus:outline-[#00C5CD] transition-all duration-300 focus:shadow-[0_0_10px_#00C5CD] focus:border-[#00CED1]" placeholder="Nhập giá sản phẩm"
                    {...register("priceProduct", {
                        required: true,
                        min: 0
                    })}
                    />
                </div>
                <div className="mb-3 mt-[20px]">
                    <label htmlFor="exampleInputPassword1" className="form-label font-[Poppins] text-[16px]">
                    Ảnh sản phẩm <span className="text-red-500">(*)  {errors.imageProduct&&<span className="text-[15px] text-red-600">Ảnh không được để trống</span>}</span>
                    </label>
                    <input
                    type="text"
                    className="w-full border border-[#B5B5B5] rounded h-[45px] pl-[10px] mt-[10px] focus:outline-[#00C5CD] transition-all duration-300 focus:shadow-[0_0_10px_#00C5CD] focus:border-[#00CED1]" placeholder="Nhập ảnh sản phẩm"
                    {...register("imageProduct", {
                        required: true,
                    })}
                    />
                </div>
                <div className="mb-3 mt-[20px]">
                    <label htmlFor="exampleInputPassword1" className="form-label font-[Poppins] text-[16px]">
                    Mô tả sản phẩm <span className="text-red-500">(*) {errors.discription&&<span className="text-[15px] text-red-600">Mô tả không được để trống !</span>}</span>
                    </label> <br />
                    <textarea rows={4} className="w-full border border-[#B5B5B5] rounded pl-[10px] pt-[10px] focus:outline-[#00C5CD] transition-all duration-300 focus:shadow-[0_0_10px_#00C5CD] focus:border-[#00CED1]" placeholder="Nhập mô tả sản phẩm..." {...register("discription", {
                    required: true,
                    min: 0
                    })}>
                    </textarea>
                </div>
                <div className="mb-3 mt-[20px]">
                    <label className="form-label font-[Poppins] text-[16px]">
                        Mô tả ngắn sản phẩm <span className="text-red-500">(*) {errors.discription&&<span className="text-[15px] text-red-600">Mô tả không được để trống !</span>}</span>
                    </label> <br />
                    <textarea rows={4} className="w-full border border-[#B5B5B5] rounded pl-[10px] pt-[10px] focus:outline-[#00C5CD] transition-all duration-300 focus:shadow-[0_0_10px_#00C5CD] focus:border-[#00CED1]" placeholder="Nhập mô tả sản phẩm..." {...register("shortDescription", {
                        required: true,
                        min: 0
                    })}>
                    </textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label font-[Poppins] text-[16px]">
                        Danh mục sản phẩm <span className="text-red-500">(*)</span>
                    </label>
                    <select className="w-full border rounded p-2 border-[#B5B5B5] focus:outline-[#00C5CD] transition-all duration-300 focus:shadow-[0_0_10px_#00C5CD] focus:border-[#00CED1]" {...register("categoryId")}>
                        <option value={''}></option>
                        {
                            category.map((item) => (
                                <option key={item.id} value={Number(item.id)}>{item.nameCategory}</option>
                            ))
                        }
                    </select>
                </div>
                <button type="submit" className="absolute right-0 bg-[#00CDCD] font-serif cursor-pointer w-[150px] rounded text-[#fff] h-[40px]">
                    Thêm mới
                </button>
            </form>
        </div>    
  )
}

export default AddProduct;