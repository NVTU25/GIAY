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
import ClientLayout from "./layout/client";
import ListProductClient from "./components/listProductClient";
import SingupClinet from "./components/signup";
import SigninClient from "./components/signin";
<<<<<<< HEAD
import DetailProduct from "./components/detailProduct";
import Cart from "./components/cart";
=======
>>>>>>> 1b95aa443e990a244ae842f28fe41e24777231d3



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
      {path: 'signup', element: <SingupClinet/> },
      {path: 'signin', element: <SigninClient/> },
<<<<<<< HEAD
      {path: 'product/:id', element: <DetailProduct/> },
      {path: 'cart', element: <Cart/>},
=======
>>>>>>> 1b95aa443e990a244ae842f28fe41e24777231d3
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
