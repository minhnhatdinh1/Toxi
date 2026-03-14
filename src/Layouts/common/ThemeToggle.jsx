import React, { useState, useEffect } from 'react';

export default function ThemeToggle() {
  // 1. Khởi tạo state: Kiểm tra xem trước đó user đã chọn dark mode chưa
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Lấy trạng thái từ localStorage để giữ lại thiết lập khi load lại trang
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // 2. Xử lý logic thêm/xóa class 'dark' vào thẻ <html>
  useEffect(() => {
    const root = window.document.documentElement; // Truy cập vào thẻ <html>

    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Lưu lại vào bộ nhớ trình duyệt
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]); // useEffect chạy lại mỗi khi isDarkMode thay đổi

  // 3. Render nút bấm
  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 transition-colors duration-200"
    >
      {isDarkMode ? 'Chuyển sang ☀️' : 'Chuyển sang 🌙'}
    </button>
  );
}