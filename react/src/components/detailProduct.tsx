import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { IProduct } from '../interface/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar,faCartPlus,faPhone,faDollarSign  } from '@fortawesome/free-solid-svg-icons'


const DetailProduct = () => {
  const [ product,setProduct ] = useState<IProduct | null>(null);
  const [ image,setImage ] = useState<string[]>([]);
  const [ size,setSize ] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [category, setCategory] = useState<any>(null);
  const params = useParams();
  const id = params.id;
  

  useEffect(() => {
    const getProductById = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(data);

        // lấy ra ảnh rồi chọn ảnh
        if (data.imageProduct) {
          const images = data.imageProduct.split(',');
          setImage(images);
          setSelectedImage(images[0]);
        }
        // để lấy ra size giày
        if (data.size) {
          const size = data.size.split(',');
          setSize(size);
          setSelectedSize(size[0]);
        }
        // Call API lấy danh mục sản phẩm
        if (data.categoryId) {
          getCategoryById(data.categoryId);
        }
      } catch (error:any) {
        toast.error(error);
      }
    }

    // call danh mục
    const getCategoryById = async (categoryId:number) => {
      try {
        const { data } = await axios.get(`http://localhost:3000/categorys/${categoryId}`);
        setCategory(data);
      } catch (error:any) {
        toast.error(error)
      }
    }
    getProductById();
  }, [id]);
  // xử lý giỏ hàng
  const addToCart:any = () => {
    if (!product) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Bạn phải đăng nhập để sử dụng chức năng");
      return;
    } 

    // tạo đối tượng sản phẩm để thêm vào giỏ hàng
    const cartItem = {
      id: product.id,
      nameProduct: product.nameProduct,
      price: product.priceProduct,
      image: image[0],
      size: selectedSize,
      quantity: 1,
    };
    
    const cart = JSON.parse(localStorage.getItem(`cart_${token}`) || "[]");
    
    const exitCart = cart.findIndex((item: any) => item.id === product.id && item.size === selectedSize);
    if (exitCart !== -1) {
      cart[exitCart].quantity += 1;
    }else {
      cart.push(cartItem);
    }

    // lưu lại
    localStorage.setItem(`cart_${token}`, JSON.stringify(cart));
    toast.success("Sản phẩm đã được thêm vào giỏ hàng !");
  }
  return (
    <div className='mt-[130px] w-full mb-[40px]'>
      <span className='w-[full] pl-[30px] h-[40px] bg-[#EEEEEE] flex items-center text-[#555555] text-[13px]'> <Link to={`/`}>Trang chủ</Link> <span className='ml-[10px] mr-[10px]'>{'>'} {product?.nameProduct}</span></span>
      <div className='product mt-[30px] ml-[30px] bg-[#fff] rounded-md flex'>
        <div className='product-left w-[55%] flex'>
            <span className='h-[500px]'>
              {
                image.map((item,index) => (
                  <div key={index} className={`w-[85px] h-[85px] gap-10 focus:outline-1 rounded-[10px] m-[10px_0px] flex-col flex justify-center items-center
                    ${selectedImage == item ? 'border border-[#0a437f]' : ''}`}
                    onClick={() => setSelectedImage(item)}
                  >
                  <img className='w-[81px] h-[81px] rounded-md' src={item} alt="" />
                  </div>
                ))
              }
            </span>
            <span className='w-[750px] h-[600px] relative'>
              <img className='w-[700px] h-[600px] ml-[32px] transition-all duration-300' src={selectedImage} alt="" />
              <p className='w-[120px] h-[30px] bg-[#cc041a] justify-center text-[#fff] absolute uppercase top-[10px] left-[32px] text-[13px] font-semibold flex items-center'><FontAwesomeIcon icon={faStar} className='text-yellow-400 mr-[5px]' /> Siêu Sale <FontAwesomeIcon className='text-yellow-400 ml-[5px]' icon={faStar} /></p>
            </span>
        </div>
        {/* cách */}
        <div className='product-right w-[45%] ml-[50px] mr-[20px]'>
          <h3 className='text-[18px] font-sans uppercase font-bold'>{product?.nameProduct}</h3>
          <span className='flex items-center text-[13px] mt-[15px]'>
            <FontAwesomeIcon icon={faStar} className='text-yellow-400 mr-[5px]' />
            <FontAwesomeIcon icon={faStar} className='text-yellow-400 mr-[5px]' />
            <FontAwesomeIcon icon={faStar} className='text-yellow-400 mr-[5px]' />
            <FontAwesomeIcon icon={faStar} className='text-yellow-400 mr-[5px]' />
            <FontAwesomeIcon icon={faStar} className='text-yellow-400 mr-[5px]' />
          </span>
          <div className='w-full mt-[20px] flex items-center border-b-2 border-b-[#ccc]'>
            <p className='price text-[18px] font-semibold font-sans text-red-600'>{Number(product?.priceProduct).toLocaleString()} <sup><u>đ</u></sup></p>
            <p className='block mb-[5px] pl-[40px] h-[60px] border-r-2 border-r-[#ccc]'></p>
            <p className='text-[13px] text-black ml-[10px]'>Kho hàng: <span className='font-bold text-[#00AA00] uppercase text-[11px]'>còn hàng</span></p>
            <span className='mr-[20px] ml-[240px]'>
              <Link to={`/product/category/${category?.id}`}>
                <img className='w-[70px] cursor-pointer' src={category?.imageCategory} alt="" />
              </Link>
            </span>
          </div>
          <div className='w-full mt-[20px]'>
            <p className='w-full text-justify text-[16px] font-sans font-semibold text-[#3a4754]'>
              {product?.shortDescription}
            </p>
          </div>
          <div className='mt-[30px]'>
            <h3 className='font-semibold font-sans text-[15px] mt-[10px]'>Chọn size</h3>
              <span className='flex items-center gap-4'>
                {
                  size.map((item,index) => (
                    <div key={index}>
                      <input type="button" className={`w-[37px] h-[37px] gap-10 border cursor-pointer border-[#ccc] focus:outline-1 m-[10px_0px] flex justify-center items-center
                      ${selectedSize == item ? ' text-[#fff] bg-[#0a437f]' : ''}`}
                      onClick={() => setSelectedSize(item)} value={item}/>
                    </div>
                  ))
                }
              </span>
          </div>
          <span className='mt-[20px] flex items-center text-[13px]'>
            <FontAwesomeIcon className='w-[25px] text-[11px]' icon={faPhone} /> Hotline: <span className='ml-[10px] text-blue-900'>0348 892 533</span> 
          </span>
          <div className='button w-full flex mt-[10px]'>
            <button onClick={addToCart} className='w-[400px] h-[40px] flex cursor-pointer items-center text-[15px] font-semibold font-sans justify-center bg-[#0a437f] text-[#fff]'>
              <FontAwesomeIcon className='mr-[5px]' icon={faCartPlus} /> Thêm vào giỏ hàng
            </button>
            <button className='w-[200px] h-[40px] bg-red-600 text-[#fff] flex cursor-pointer items-center text-[15px] font-semibold font-sans justify-center'>
              <FontAwesomeIcon className='mr-[5px]' icon={faDollarSign} />Mua hàng ngay
            </button>
          </div>
        </div>
      </div>
      <div className='mt-[20px] ml-[30px] banner w-[820px] h-[400px]'>
        <img className='w-[819px]' src="../anh_banner.png" alt="" />
      </div>
      <div className='w-full flex'>
        <div className='w-[50%] ml-[30px] [&_img]:w-[100%]'>
          <h2 className='text-[20px] font-sans font-semibold'>📝 Mô tả sản phẩm</h2>
          <p className='text-justify text-[15px] mt-[5px] w-[100%] font-sans'>
            {product?.discription}
          </p>
          <img className='mt-[20px]' src={image[1]} alt="" />
          <img className='mt-[20px]' src={image[3]} alt="" />
          <div className='w-full mt-[60px]'>
            <h3 className='text-[20px] font-sans font-semibold '>👀 Xem đánh giá</h3>
            <form className='w-full mt-[30px] flex flex-col justify-center' action="">
              <textarea className='w-full border border-[#ccc] pt-[10px] pl-[10px] text-gray-500 font-sans focus:outline-0' name="" placeholder='Đánh giá của bạn' rows={4} id=""></textarea>
              <p className='mt-[10px]'><span className='text-red-500 font-sans font-semibold text-[14px]'>Lưu ý: </span> <span className='text-gray-400 ml-[10px] font-sans text-[15px]'>Không hỗ trợ HTML !</span></p>
              <button className='mt-[20px] group hover:bg-[#0f45ac] transition-all duration-300 w-full h-[40px] bg-[#0a437f] text-[#fff] font-sans font-semibold cursor-pointer'>Tiếp tục</button>
            </form>
          </div>
        </div>
        <div className='w-[50%] [&_img]:w-[100%] ml-[20px] mr-[30px] mt-[5px]'> 
          <img src={image[0]} alt="" />
          <img className='mt-[20px]' src={image[2]} alt="" />
          <img className='mt-[20px]' src={image[4]} alt="" />
        </div>
      </div>
    </div>
    
  )
}

export default DetailProduct;