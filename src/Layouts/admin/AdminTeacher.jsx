import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
export default function AdminTeacher() {
     const instructors = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nva@toxi.edu.vn",
      specialty: "HSK 6 Expert",
      courses: 12,
      rating: 96,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCE0IkIv6-qOT3gkjbBAHQPNEmja_WYK1pDpRmyuodlusaqbGPT1usNtFohEKCYbnoL9SqZf3RcEr_Q9-yz_-5pQzaD_uYR5EP8SVhYx_AOATOtHCRs6fsQQR6uz5ayjDqu9WX3edztddK5McTuJPZAClS-E1ScT-vEnEnfS9i3fXKhtNrFUZek3F_ocJC_cAeL5rPp6Av7dwDF0JWRfkxY7OAGkMeumfGCXalsb7j0IWGslAX7lo1eEoQALD-Gl6DCXxJQ4SxxvvU",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "ttb@toxi.edu.vn",
      specialty: "Business Chinese",
      courses: 8,
      rating: 92,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCQLhVrtG65E3-eWqr1je7PNwgl8wmYYHmceHhK81NEpNJzXMHINyJO2AkPG8fYDr4XEz0asTdQOM3oGvnJVAOJhROOiS1QJQSz1FAggJo0vS1Flc3kbkKVp2CXGhEEeYVbCAZFIQbcp2GaOdSmHRgi60a8YoUhSMemcWiFsMoO5hiAfDt3unKbHLw-neN6MNOPKi-eV3PiJwiJORXq79X27PnYqKRt4ftxmZS-OvpdIacqsP_KhUJHbSZTqtGXqlxuGd5yaxItrUg",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "lvc@toxi.edu.vn",
      specialty: "Communication",
      courses: 15,
      rating: 88,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA9DNlnnO3--If9-U06kMuYfrUjwXtXEbKLIRrmoRWFpaSfGeXSmK1jIVM0WC1x-cNkTuMrrCb8oDt0pM_jDYYNZVoel4xd22yGWjlwkVzTHV6i6EdptTpPMf3k4WR3V0YhvC9yXTkQS6_LYNpizntktYwYlzotAUm_CcEv5YolnpdlmsKHeah2UIKdEAPfxMax2izH9eTDMiPMeV_lWOqU_h9-gwfmZlSpnk7tsdKPfxnNcatlCI5g1sZRftyVgR8_6cg1cIqtQ3M",
        
    },
    {
  id: 4,
  name: "Phạm Minh D",
  email: "pmd@toxi.edu.vn",
  specialty: "HSK 4 Beginner",
  courses: 10,
  rating: 94,
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAEz3EjG5MHierrNwV-pimK8DoWRQRWLoGaOkhyNxtgrKlpA80sM-kHnxGvTkwbMKWaHHK8YhNM_ObSq69-ehvLVBLJbbzPJW2HBOP5aNV_VF_CHmKNY_jPzZrWFkJ7bbkN8_-uad0tqmG3zi4XhDda08-Rr0BvSvk_uQ8WRAyEyfWPTb0dVLDEjGt_MdeZAv4TV5JJgzrqpngeAFlqOE5STQCpsuMdGpF9o454n3EfD50_9SJSXzEs-_HE4WJLSgo2D73Q7fjMCGw",
}
  ];
  const [currentPage, setCurrentPage] = useState(1);
const instructorsPerPage = 2; // mỗi trang 2 giáo viên

const totalPages = Math.ceil(instructors.length / instructorsPerPage);

const indexOfLast = currentPage * instructorsPerPage;
const indexOfFirst = indexOfLast - instructorsPerPage;

const currentInstructors = instructors.slice(indexOfFirst, indexOfLast);

    return(
        <>
            <div className="flex h-screen overflow-hidden ">
                    <AdminSidebar />
                    {/* Main Content */}
<main className="flex-1 flex flex-col overflow-hidden chinese-pattern">
  {/* Header */}
  <div className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0">
    
    <div className="flex items-center gap-4">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        Quản lý Giáo viên
      </h2>
    </div>

    <div className="flex items-center gap-6">
      
      <div className="relative w-72 group">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
          search
        </span>
        <input
          type="text"
          placeholder="Tìm kiếm giáo viên..."
          className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

    <Link
  to="/adminAddNewTeacher"
  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all"
>
  <span className="material-symbols-outlined">add</span>
  Add New Instructor
</Link>
      <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-700 ml-2 pl-6">
        
        <button className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-primary">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        <div className="size-10 rounded-full bg-toxi-blue overflow-hidden border-2 border-primary/20">
          <img
            className="w-full h-full object-cover"
            alt="Admin user profile picture"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiLlVubMaK7EUUkNyckciiHmrVrYEFflykgOqhy1C60u3wb0o1dnz4hIYqt6n87FxVC7nMruf3UwpXnw-XLiIm8Q8heqnu8flx4a4x9YfLHwIpYxzM5YINiazRa8f_6C4SNcKEtXSOxKRPqRh5rr8zB9kwg2k4yXU5ZavRki44OTyh6VAQHP3cnt72Q9Omygue9pD07T392aMShZicAd2n383KDRGSf43mjTSvZ1E669G5QCkLYWUS3mo-H70aH8nnw2JUs-c4rj0"
          />
        </div>

      </div>
    </div>

  </div>
  {/* Content Area */}
<div className="flex-1 overflow-y-auto p-8">
  
  {/* Statistics */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    
    {/* Card 1 */}
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
      <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>

      <div className="flex flex-col">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
          Total Instructors
        </span>

        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold text-slate-900 dark:text-white leading-none">
            124
          </span>

          <span className="text-emerald-500 text-sm font-bold flex items-center mb-1">
            <span className="material-symbols-outlined text-sm">
              trending_up
            </span>
            12%
          </span>
        </div>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
      <div className="absolute right-0 top-0 w-24 h-24 bg-toxi-gold/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>

      <div className="flex flex-col">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
          Active Instructors
        </span>

        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold text-slate-900 dark:text-white leading-none">
            118
          </span>

          <span className="text-emerald-500 text-sm font-bold flex items-center mb-1">
            <span className="material-symbols-outlined text-sm">
              trending_up
            </span>
            5%
          </span>
        </div>
      </div>
    </div>
  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
  
  <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>

  <div className="flex flex-col">
    
    <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
      Average Rating
    </span>

    <div className="flex items-end gap-3">
      
      <span className="text-3xl font-bold text-slate-900 dark:text-white leading-none">
        4.8/5.0
      </span>

      <div className="flex text-toxi-gold mb-1">
        <span className="material-symbols-outlined text-lg fill-1">
          star
        </span>
      </div>

    </div>
  </div>
</div>
  </div>
  {/* Table Container */}
<div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
  
  <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-white/5">
    <h3 className="font-bold text-slate-900 dark:text-white">
      Danh sách Giảng viên
    </h3>

    <div className="flex gap-2">
      
      <button className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">
          filter_list
        </span>
        Filter
      </button>

      <button className="px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-2">
        <span className="material-symbols-outlined text-sm">
          file_download
        </span>
        Export
      </button>

    </div>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-left">
      
      <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
        <tr>
          <th className="px-6 py-4">Name</th>
          <th className="px-6 py-4">Specialty</th>
          <th className="px-6 py-4">Courses</th>
          <th className="px-6 py-4">Student Rating</th>
          <th className="px-6 py-4 text-right">Actions</th>
        </tr>
      </thead>
 <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
      {currentInstructors.map((teacher) => (
        <tr
          key={teacher.id}
          className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
        >
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                <img
                  className="w-full h-full object-cover"
                  src={teacher.avatar}
                  alt={teacher.name}
                />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {teacher.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {teacher.email}
                </p>
              </div>
            </div>
          </td>

          <td className="px-6 py-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary uppercase">
              {teacher.specialty}
            </span>
          </td>

          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 font-medium">
            {teacher.courses} Courses
          </td>

          <td className="px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full w-24 overflow-hidden">
                <div
                  className="h-full bg-toxi-gold rounded-full"
                  style={{ width: `${teacher.rating}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                {teacher.rating}
              </span>
            </div>
          </td>

          <td className="px-6 py-4 text-right">
            <div className="flex justify-end gap-1">
              <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">
                  visibility
                </span>
              </button>
              <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">edit</span>
              </button>
              <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                <span className="material-symbols-outlined text-lg">delete</span>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
    </table>
  </div>
   {/* Pagination */}
<div className="p-4 bg-gray-50 border-t border-[#e7ebf3] flex items-center justify-between">

  <p className="text-sm text-[#4c669a]">
    Page <span className="font-bold text-[#0d121b]">{currentPage}</span> of{" "}
    <span className="font-bold text-[#0d121b]">{totalPages}</span>
  </p>

  <div className="flex items-center gap-2">

    {/* Prev */}
    <button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Prev
    </button>

    {/* Page Numbers */}
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => setCurrentPage(index + 1)}
        className={`px-3 py-1 rounded ${
          currentPage === index + 1
            ? "bg-primary text-white"
            : "bg-white border"
        }`}
      >
        {index + 1}
      </button>
    ))}

    {/* Next */}
    <button
      onClick={() =>
        setCurrentPage((prev) =>
          Math.min(prev + 1, totalPages)
        )
      }
      disabled={currentPage === totalPages}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Next
    </button>

  </div>
</div>
</div>
</div>
</main>
                    </div>
        </>
    )
};