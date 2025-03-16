import ListProductClient from "../components/listProductClient";
import FooterClient from "./client/footer";
import HeaderClient from "./client/headerClient";
import SlideShows from "./client/slideShows";

const ClientLayout = () => {
  return (
    <main className='w-[100%] mx-auto h-[3560px] bg-[#fff]'>
      <div className="w-full fixed top-0 left-0 z-50">
        <HeaderClient/>
      </div>
      <div className="pt-[130px] ">
        <SlideShows/>
      </div>
      <div className='w-full mx-auto mt-[40px]'>
        <ListProductClient/>
      </div>
      <FooterClient/>
    </main>
  );
};

export default ClientLayout;
