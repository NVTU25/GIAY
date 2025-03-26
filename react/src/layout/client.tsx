import { matchPath, Outlet, useLocation } from "react-router-dom";
import FooterClient from "./client/footer";
import HeaderClient from "./client/headerClient";
import SlideShows from "./client/slideShows";

const ClientLayout = () => {
  const location = useLocation();
  const hideSlideShows = matchPath('/signup/*', location.pathname);
  const hideSlideShowSignin = matchPath('/signin/*', location.pathname);
  const hideSlideShowDetailProduct = matchPath('/product/:id/*', location.pathname);
  const hideSlideShowCart = matchPath('/cart/*', location.pathname);
  const hideSlideShowAccount = matchPath('/account/*', location.pathname);
  const hideSlideShowCheckOut = matchPath('/checkout/*', location.pathname);
  const hideSlideShowOrderSuccsess = matchPath('/ordersuccess/*', location.pathname);
  const hideSlideShowListOrderUser = matchPath('/listOrderUser/:id/*', location.pathname);
  return (
    <main className='w-[100%] mx-auto max-h-[3560px] bg-[#fff]'>
      <HeaderClient/>
      {!hideSlideShows && !hideSlideShowSignin && !hideSlideShowDetailProduct && !hideSlideShowCart && !hideSlideShowAccount && !hideSlideShowCheckOut && !hideSlideShowOrderSuccsess && !hideSlideShowListOrderUser && <SlideShows />}
      <div className='w-full mx-auto mt-[40px]'>
        <Outlet/>
      </div>
      <FooterClient/>
    </main>
  );
};

export default ClientLayout;
