import React from 'react'

type Props = {}

const AdminFooter = (props: Props) => {
  return (
    <footer className="bg-white shadow text-gray-700 text-center p-4">
      <p className='text-[15px] font-semibold'>© 2025 [Store]. Tất cả các quyền được bảo lưu.</p>
      <p className='text-[15px] font-semibold'>Liên hệ: <a href="mailto:contact@yourwebsite.com" className="underline">contact@yourwebsite.com</a> | SĐT: 0123 456 789</p>
      <div className="mt-2">
        <a href="/privacy-policy" className="mx-2 hover:underline text-[15px]">Chính sách bảo mật</a> | 
        <a href="/terms" className="mx-2 hover:underline text-[15px]">Điều khoản sử dụng</a>
      </div>
  </footer>
  )
}

export default AdminFooter