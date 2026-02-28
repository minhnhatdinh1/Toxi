import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/image/LOGO (1).png';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark p-6">
      <img src={logo} alt="TOXI" className="w-24 h-24 mb-6" />
      <h1 className="text-6xl font-black text-primary mb-4">404</h1>
      <p className="text-xl text-slate-700 dark:text-slate-300 mb-6">
        Trang bạn tìm không tồn tại hoặc đã bị xóa.
      </p>
      <Link
        to="/home"
        className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}
