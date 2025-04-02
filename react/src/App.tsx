import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Dashboard from "./layout/admin/dashboard";
import AdminLayout from "./layout/admin";
import AddCategory from "./components/admin/addcategory";
import Listcategory from "./components/admin/listcategory";

import AddProduct from "./components/admin/addproduct";
import Listproduct from "./components/admin/listproducts";
import UpdateProduct from "./components/admin/updateproduct";


import SigninClient from "./components/client/signin";

import Cart from "./components/client/cart";
import ClientLayout from "./layout/client";

import Account from "./components/client/account";
import ListUser from "./components/admin/listUser";

import OrderSuccess from "./components/client/orderSuccess";
import ListOrderUser from "./components/client/listOrderUser";
import Updatecategory from "./components/admin/updatecategory";
import ListProductClient from "./components/client/listProductClient";
import SignupClient from "./components/client/signup";
import DetailProduct from "./components/client/detailProduct";
import ProductCategpry from "./components/client/productCategpry";
import Checkout from "./components/client/checkout";
import ListOrder from "./components/admin/listOrder";



function App() {
  const routes = useRoutes([
     {path: 'dashboard', element: <AdminLayout/>, children: [
      {path: '', element: <Dashboard/>} ,
      {path: 'addCategory', element:<AddCategory/>},
      {path: 'listCategory', element:<Listcategory/>},
      {path: 'updateCategory/:id', element:<Updatecategory/>},
      {path: 'addProduct', element:<AddProduct/>},
      {path: 'listProduct', element:<Listproduct/>},
      {path: 'updateProduct/:id', element:<UpdateProduct/>},
      {path: 'listUser', element:<ListUser/>},
      {path: 'listOrder', element:<ListOrder />},
     ]},
     {path: '/', element: <ClientLayout/>, children: [
      {path: '', element: <ListProductClient/> },
      {path: 'signup', element: <SignupClient/> },
      {path: 'signin', element: <SigninClient/> },
      {path: 'product/:id', element: <DetailProduct/> },
      {path: 'cart', element: <Cart/>},
      {path: 'product/category/:id', element: <ProductCategpry/> },
      {path: 'account', element: <Account />},
      {path: 'checkout', element: <Checkout />},
      {path: 'ordersuccess/:id', element: <OrderSuccess />},
      {path: 'listOrderUser/:id', element: <ListOrderUser />}
     ]}
  ]);
  return (
    <>
      {routes}
      <ToastContainer />
    </>
  );
}

export default App;
