import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa,faCcMastercard,faCcPaypal,faCcDiscover } from "@fortawesome/free-brands-svg-icons";

const FooterClient = () => {
  return (
    <div className='w-full bg-[#0f3057] h-[640px]'>
        <div className='flex justify-between h-[170px] items-center gap-44 pl-[20px] pr-[20px] border-b border-[#33FFFF]'>
            <span>
                <h1 className='text-[23px] font-semibold font-[Poppins] text-[#fff]'>Đăng ký nhận thông tin</h1>
                <p className='w-[800px] mt-[10px] text-[15px] font-[Poppins] text-[#fff]'>Đăng ký ngay để được cập nhật sớm nhất những thông tin hữu ích, ữu đãi vô cùng hấp dẫn và những món quà bất ngờ từ Myshoes.vn! </p>
            </span>
            <form action="" className="mt-[10px] flex items-center [&_input]:w-[450px] [&_input]:h-[45px] [&_input]:bg-[#fff]">
                <input className='relative placeholder:text-[14px] pl-[10px] focus:outline-0' type="text" placeholder='Nhập email của bạn'/>
                <button className='cursor-pointer w-[100px] h-[45px] bg-red-700 text-[#fff] absolute uppercase right-[20px]'>Đăng Ký</button>
            </form>
        </div>
        <div className="w-full flex mt-[30px] justify-between h-[320px] border-b border-[#33FFFF] pl-[20px] pr-[20px]">
            <span className="w-[40%]">
                <h3 className="text-[18px] text-[#fff] uppercase">Myshoes.vn - Giày Chính Hãng</h3>
                <span className="flex items-center mt-[20px]">
                    <img className="w-[90px] h-[90px]" src="./logomy.png" alt="" />
                    <span className="ml-[10px]">
                        <p className="text-[#fff] text-[14px] ">Myshoes.vn được định hướng trở thành hệ thống thương mại điện tử bán giày chính hãng hàng đầu Việt Nam.</p>
                        <p className="text-[#fff] text-[14px] mt-[5px]">Showroom: 249 Xã Đàn, Hà Nội</p>
                        <p className="text-[#fff] text-[14px] mt-[5px]">Hotline: 0973711868</p>
                    </span>
                </span>
            </span>
            <span className="flex flex-col">
                <h3 className="text-[18px] text-[#fff] uppercase">Về Chúng Tôi</h3>
                <ul className="mt-[10px] [&_li]:pt-[5px] [&_a]:text-[14px] [&_a]:text-[#fff] group [&_a]:transition-all duration-300 [&_a:hover]:text-red-500">
                    <li><a href="">Giới thiệu</a></li>
                    <li><a href="">Điều khoản sử dụng</a></li>
                    <li><a href="">Chính sách bảo mật</a></li>
                    <li><a href="">Tin tức Myshoes</a></li>
                    <li><a href="">Cơ hội việc làm</a></li>
                    <li><a href="">Liên hệ</a></li>
                </ul>
            </span>
            <span className="flex flex-col">
                <h3 className="text-[18px] text-[#fff] uppercase">Khách Hàng</h3>
                <ul className="mt-[10px] [&_li]:pt-[5px] [&_a]:text-[14px] [&_a]:text-[#fff] group [&_a]:transition-all duration-300 [&_a:hover]:text-red-500">
                    <li><a href="">Hướng dẫn mua hàng</a></li>
                    <li><a href="">Chính sách đổi tra</a></li>
                    <li><a href="">Chính sách bảo hành</a></li>
                    <li><a href="">Khách hàng thân thiết</a></li>
                    <li><a href="">Hướng dẫn chọn size</a></li>
                    <li><a href="">Chương trình khuyến mại</a></li>
                </ul>
            </span>
            <span>
                <h3 className="text-center text-[18px] text-[#fff] uppercase">Chứng nhận</h3>
                <span className="flex mt-[20px] flex-col items-center">
                    <img className="w-[140px]" src="./dmca.png" alt="" />
                    <img className="w-[210px] mt-[20px]" src="./bct.png" alt="" />
                </span>
            </span>
        </div>
        <div className="w-full flex mt-[10px] items-center h-[100px] justify-between pl-[20px] pr-[20px]">
            <span className="flex flex-col justify-center">
                <h2 className="text-[15px] text-[#fff] font-semibold font-[Poppins]">Công ty cổ phần đầu tư và công nghệ Mygroup</h2>
                <address className="text-[14px] mt-[3px] text-[#fff]">Địa chỉ: 249 Xã Đàn, Nam Đồng, Đống Đa, Hà Nội</address>
                <p className="text-[14px] mt-[3px] text-[#fff]">GPĐKKD: 0108085873. © 2016 - 2024 Myshoes.vn</p>
            </span>
            <span className="flex flex-col items-center">
                <h2 className="text-[17px] text-[#fff] font-semibold font-[Poppins]">Kết nối với Myshoes.vn</h2>
                <span className="flex [&_img]:w-[35px] [&_img]:pl-2 mt-[5px]">
                    <img src="./fb.png" alt="" />
                    <img src="./yu.png" alt="" />
                    <img src="./tiktok.png" alt="" />
                    <img src="./in.png" alt="" />
                    <img src="./tw.png" alt="" />
                </span>
            </span>
            <span className=" flex items-center gap-4">
                <FontAwesomeIcon className="text-[35px] text-[#ccc]" icon={faCcVisa}/>
                <FontAwesomeIcon className="text-[35px] text-[#ccc]" icon={faCcMastercard}/>
                <FontAwesomeIcon className="text-[35px] text-[#ccc]" icon={faCcPaypal}/>
                <FontAwesomeIcon className="text-[35px] text-[#ccc]" icon={faCcDiscover}/>
            </span>
        </div>
    </div>
  )
}

export default FooterClient