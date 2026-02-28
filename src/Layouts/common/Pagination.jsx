import react from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
export default function Pagination({ currentPage, totalPages, onPageChange }) {

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-10">

      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center size-10 rounded-lg border border-[#e7f3f0] bg-white hover:border-primary"
      >
        <span className="material-symbols-outlined text-sm">
          arrow_back_ios_new
        </span>
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex items-center justify-center size-10 rounded-lg font-bold
          ${
            currentPage === page
              ? "bg-primary text-white"
              : "border border-[#e7f3f0] bg-white hover:border-primary"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center size-10 rounded-lg border border-[#e7f3f0] bg-white hover:border-primary"
      >
        <span className="material-symbols-outlined text-sm">
          arrow_forward_ios
        </span>
      </button>

    </div>
  );
}