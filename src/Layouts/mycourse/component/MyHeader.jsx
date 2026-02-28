import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/image/LOGO (1).png'
export default function MyHeader() {
    // const [mobileOpen, setMobileOpen] = useState(false);
    // const toggleMobileMenu = () => setMobileOpen(open => !open);

    return(
        <>
              <div className="w-full">
              {/* Header */}
               <div className="w-full bg-white dark:bg-surface-dark shadow-sm z-50 sticky top-0">
               <div className="sticky top-0 z-50 bg-primary text-white shadow-xl">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-chinese-pattern opacity-10 pointer-events-none"></div>
        
              <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-8 relative z-10">
                {/* LOGO */}
                <Link to="/Home" className="flex items-center gap-3 shrink-0">
                  <img src={logo} alt="TOXI Logo" className="h-12 w-12 rounded-xl shadow-lg" />
                  <div>
                    <h1 className="text-2xl font-black tracking-tighter leading-none">
                      TOXI
                    </h1>
                    <p className="text-[8px] uppercase tracking-widest text-secondary font-bold">
                      学以致用
                    </p>
                  </div>
                </Link>
        
                {/* SEARCH */}
                <div className="flex-1 max-w-2xl hidden md:block">
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm, giáo trình, dụng cụ..."
                      className="w-full pl-12 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-full text-sm focus:ring-2 focus:ring-secondary focus:bg-white focus:text-primary transition-all placeholder-white/60"
                    />
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-primary">
                      search
                    </span>
                  </div>
                </div>
        
                {/* ACTIONS */}
                <div className="flex items-center gap-4">
                  <button className="text-slate-500 hover:text-primary p-2">
                    <span className="material-symbols-outlined">notifications</span>
                  </button>
                  <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-bold text-slate-900">Minh Anh</p>
                </div>
              </div>
            </div>
                 </div>
                 </div>
                    {/* add other links as needed */}
                

                  
                </div>
             
            </div>
        
                
        </>
    )
};