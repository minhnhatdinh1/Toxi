import React, { useState,useEffect   } from 'react';
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";
export default function AdminCourse() {

  
 const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");
  const fetchCourses = () => {
    fetch("http://localhost:8080/api/admin/courses", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
    .then((data) => {
  setCourses(data || []);
  setCurrentPage(1); // reset về trang đầu
})
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa khóa học này?")) return;

    await fetch(`http://localhost:8080/api/admin/courses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    fetchCourses(); // reload lại danh sách
  };
const [currentPage, setCurrentPage] = useState(1);
const coursesPerPage = 5; // mỗi trang 5 khóa học
 const totalPages = Math.ceil(courses.length / coursesPerPage);
 const indexOfLastCourse = currentPage * coursesPerPage;
const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

const paginated = courses.slice(
  indexOfFirstCourse,
  indexOfLastCourse
);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Header */}
          <header className="h-20 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-8 shrink-0">
            <div className="flex flex-col">
              <h2 className="text-2xl font-black text-primary dark:text-accent tracking-tight uppercase">
                Course Management
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your active and draft curriculum
              </p>
            </div>

            <div className="flex items-center gap-4">


              <Link
                to="/addnewCourse"
                className="bg-accent hover:bg-yellow-400 text-primary px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-accent/20 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined font-bold">add</span>
                Add New Course
              </Link>
            </div>
          </header>

          {/* Table Section */}
          <div className="flex-1 overflow-auto p-8">
            {/* Tabs */}
            <div className="flex gap-8 mb-6 border-b border-gray-200 dark:border-white/10">
              <button className="pb-4 text-primary dark:text-accent font-bold border-b-2 border-primary dark:border-accent flex items-center gap-2">
                All Courses
                <span className="bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent px-2 py-0.5 rounded text-xs">
                  24
                </span>
              </button>

              <button className="pb-4 text-gray-400 font-medium hover:text-primary dark:hover:text-accent transition-colors">
                Active
              </button>

              <button className="pb-4 text-gray-400 font-medium hover:text-primary dark:hover:text-accent transition-colors">
                Draft
              </button>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-white/5">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Course Name
                    </th>
                      <th className="text-left">Course Type</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Students Enrolled
                    </th>
                       <th className="text-left">Price</th>
                     <th className="text-left">Discount Price</th>
                   <th className="text-left">Thumbnail</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

           <tbody className="divide-y divide-gray-100 dark:divide-white/5">
  {paginated.map((course) => (
    <tr
      key={course.courseId}
      className="hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
    >
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">
              menu_book
            </span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">
            {course.title}
          </span>
        </div>
      </td>

      <td className="px-6 py-5">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
          {course.courseType}
        </span>
      </td>

      <td className="px-6 py-5 text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-gray-400 text-sm">
            person
          </span>
        {(course.enrolled || 0).toLocaleString()}
        </div>
      </td>
      <td className="px-6 py-5 text-gray-900 dark:text-white font-semibold">
      ${(course.price || 0).toLocaleString()}
      </td>
      <td className="px-6 py-5 text-gray-900 dark:text-white font-semibold">
    ${(course.discountPrice || 0).toLocaleString()}
      </td>
       <td>
      <img
        src={course.thumbnailUrl}
        width="80"
        alt={course.title}
      />
    </td>
      <td className="px-6 py-5">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
            course.status === "Active"
              ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
              : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400"
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${
              course.status === "Active"
                ? "bg-green-500"
                : "bg-gray-400"
            }`}
          ></span>
          {course.status}
        </span>
      </td>


      <td className="px-6 py-5 text-right">
        <div className="flex justify-end gap-2">
         <Link to={`/editCourse/${course.courseId}`} className="p-2 text-gray-400 hover:text-primary">
                            <span className="material-symbols-outlined">edit</span>
                          </Link>
        
          <button  onClick={() => handleDelete(course.courseId)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
            <span className="material-symbols-outlined text-xl">
              delete
            </span>
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
        </main>
      </div>
    </>
  )
};