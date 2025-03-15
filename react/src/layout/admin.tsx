import AdminHeader from './admin/header';
import AdminSidebar from './admin/sidebar';
import { Outlet } from 'react-router-dom';
import AdminFooter from './admin/footer';

type Props = {}

const AdminLayout = (props: Props) => {
  return (
    <main className='bg-[#f6f9ff]'>
        <AdminHeader/>
        <div className='flex min-h-screen pt-[80px]'>
            <AdminSidebar/>
            <div className='content w-4/5 mt-[30px]'>
                <Outlet/>
            </div>
        </div>
        <AdminFooter/>
    </main>
  )
}

export default AdminLayout