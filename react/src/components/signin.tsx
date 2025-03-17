import { Link, useNavigate } from "react-router-dom";
import { ILoginForm } from "../interface/user";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SigninClient = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>();
  const nav = useNavigate();
  const onSubmit = async (user: ILoginForm) => {
    try {
      const newUser = { ...user, role: "user"}
      await axios.post(`http://localhost:3000/login`,newUser);
      toast.success("Đăng nhập thành công!");
      nav("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white mt-[60px] mb-[60px] p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Đăng nhập</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">Vui lòng nhập email hợp lệ.</p>}
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">Mật khẩu ít nhất 6 ký tự.</p>}
          </div>
          {/* Nút Đăng ký */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Đăng nhập
          </button>

          {/* Link Đăng nhập */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Chưa có tài khoản?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SigninClient;