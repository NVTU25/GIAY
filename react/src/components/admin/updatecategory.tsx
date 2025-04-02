import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ICategoryFrom } from '../../interface/category'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Updatecategory = () => {
    const { register,handleSubmit, formState:{errors},reset } = useForm<ICategoryFrom>();
    const params = useParams();
    const id = params.id;
    const nav = useNavigate();
    useEffect(() => {
        const getCategoryId = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/categorys/${id}`);
                reset(data);
            } catch (error) {
                console.log(error);
            }
        }
        getCategoryId();
    }, []);
    const onSubmit = async (category:ICategoryFrom) => {
        try {
            await axios.put(`http://localhost:3000/categorys/${id}`,category);
            toast.success("Cập nhập thành công")
            nav('/dashboard/listCategory');
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div>
        <div className="w-[97%] mx-auto mt-[0px]">
            <h1 className="font-[Merriweather] font-semibold text-[30px]">Update Category</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="relative mt-[20px]">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label font-[Poppins] text-[16px]">
                    Tên danh mục <span className="text-red-500">(*) {errors.nameCategory&&<span className="text-[15px] text-red-600">Tên không được để trống !</span>}</span>
                    </label>
                    <input type="text" className="form-control w-full border border-[#B5B5B5] rounded h-[45px] pl-[10px] mt-[10px] focus:outline-[#00C5CD] transition-all duration-300 focus:shadow-[0_0_10px_#00C5CD] focus:border-[#00CED1]'" placeholder="Nhập tên danh mục..."
                    {...register("nameCategory", {
                        required: true
                    })}
                    />
                </div>
                <div className="mb-3 mt-[20px]">
                    <label htmlFor="exampleInputPassword1" className="form-label font-[Poppins] text-[16px]">
                    Ảnh danh mục <span className="text-red-500">(*)   {errors.imageCategory&&<span className="text-[15px] text-red-600">Ảnh không được để trống !</span>}</span>
                    </label>
                    <input
                    type="text"
                    className="w-full border border-[#B5B5B5] rounded h-[45px] pl-[10px] mt-[10px] focus:outline-[#00C5CD] transition-all duration-300 focus:shadow-[0_0_10px_#00C5CD] focus:border-[#00CED1]'" placeholder="Nhập ảnh danh mục"
                    {...register("imageCategory", {
                        required: true,
                    })}
                    />
                </div>
                <button type="submit" className="absolute right-0 bg-[#00CDCD] font-serif cursor-pointer w-[150px] rounded text-[#fff] h-[40px]">
                    Cập nhập
                </button>
            </form>
        </div>
    </div>
  )
}

export default Updatecategory