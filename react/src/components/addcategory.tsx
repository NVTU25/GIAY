import { useForm } from "react-hook-form"
import { ICategoryFrom } from "../interface/category"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCategory = () => { 
    const { register,handleSubmit, formState:{errors} } = useForm<ICategoryFrom>();
    const nav = useNavigate();
    const onSubmit = async (category:ICategoryFrom) => {
        try {
            await axios.post(`http://localhost:3000/categorys`,category);
            toast.success("Thêm mới danh mục thành công");
            nav('/dashboard/listCategory');
        } catch (error:any) {
            alert(error.response.data??error.message)
        }
    }
    return (
        <div className="w-[97%] mx-auto mt-[0px]">
            <h1 className="font-[Merriweather] font-semibold text-[30px]">Add Category</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="relative mt-[20px]">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label font-[Poppins] text-[16px]">
                    Tên danh mục <span className="text-red-500">(*) {errors.nameCategory&&<span className="text-[15px] text-red-600">Tên không được để trống !</span>}</span>
                    </label>
                    <input type="text" className="form-control w-full border border-[#B5B5B5] rounded h-[45px] pl-[10px] mt-[10px] focus:outline-[#00C5CD] transition-all duration-300 focus:shadow-[0_0_10px_#00C5CD] focus:border-[#00CED1]" placeholder="Nhập tên danh mục..."
                    {...register("nameCategory", {
                        required: true
                    })}
                    />
                </div>
                <div className="mb-3 mt-[20px]">
                    <label htmlFor="exampleInputPassword1" className="form-label font-[Poppins] text-[16px]">
                    Ảnh danh mục <span className="text-red-500">(*) {errors.imageCategory&&<span className="text-[15px] text-red-600">Ảnh không được để trống !</span>}</span>
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
                    Thêm mới
                </button>
            </form>
        </div>
    )
}
export default AddCategory