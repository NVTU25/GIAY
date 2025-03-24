import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Dashboard from "./layout/admin/dashboard";
import AdminLayout from "./layout/admin";
import AddCategory from "./components/addcategory";
import Listcategory from "./components/listcategory";
import Updatecategory from "./components/updatecategory";
import AddProduct from "./components/addproduct";
import Listproduct from "./components/listproducts";
import UpdateProduct from "./components/updateproduct";

import ListProductClient from "./components/listProductClient";
import SingupClient from "./components/signup";
import SigninClient from "./components/signin";
import DetailProduct from "./components/detailProduct";
import Cart from "./components/cart";
import ClientLayout from "./layout/client";
import ProductCategpry from "./components/productCategpry";
import Account from "./components/account";



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
     ]},
     {path: '/', element: <ClientLayout/>, children: [
      {path: '', element: <ListProductClient/> },
      {path: 'signup', element: <SingupClient/> },
      {path: 'signin', element: <SigninClient/> },
      {path: 'product/:id', element: <DetailProduct/> },
      {path: 'cart', element: <Cart/>},
      {path: 'product/category/:id', element: <ProductCategpry/> },
      {path: 'account', element: <Account />},
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
