import react from "react";
import AdminSidebar from "./AdminSidebar";
export default function AdminStudent() {
    return (
        <>
          <div class="flex h-screen overflow-hidden">
             <AdminSidebar />
   <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Header */}
      <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">
            Quản lý học viên
          </h2>
        </div>

        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="relative w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              search
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm học viên..."
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-6">
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative">
              <span className="material-symbols-outlined">
                notifications
              </span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>

            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
              <span className="material-symbols-outlined">
                settings
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">groups</span>
              </div>

              <span className="text-emerald-500 text-sm font-semibold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
                <span className="material-symbols-outlined text-xs">
                  trending_up
                </span>
                +5%
              </span>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Tổng số học viên
            </p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">
              12,450
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Tính từ đầu tháng này
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 bg-accent-yellow/10 rounded-lg flex items-center justify-center text-accent-yellow">
                <span className="material-symbols-outlined">
                  person_add
                </span>
              </div>

              <span className="text-emerald-500 text-sm font-semibold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
                <span className="material-symbols-outlined text-xs">
                  trending_up
                </span>
                +12%
              </span>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Học viên mới
            </p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">
              450
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Trong 30 ngày qua
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                <span className="material-symbols-outlined">
                  sensors
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-emerald-500 text-xs font-bold">
                  Trực tuyến
                </span>
              </div>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Đang học tập
            </p>
            <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">
              1,200
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Học viên đang online
            </p>
          </div>

        </div>
          {/* Filters & Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-600 dark:text-slate-300 focus:ring-primary">
            <option>Tất cả trình độ</option>
            <option>HSK 1</option>
            <option>HSK 2</option>
            <option>HSK 3</option>
            <option>HSK 4</option>
          </select>

          <select className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-600 dark:text-slate-300 focus:ring-primary">
            <option>Trạng thái: Tất cả</option>
            <option>Đang hoạt động</option>
            <option>Tạm khóa</option>
          </select>

          <button className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors px-2 py-2">
            <span className="material-symbols-outlined text-xl">
              filter_list
            </span>
            <span className="text-sm font-medium">
              Bộ lọc nâng cao
            </span>
          </button>
        </div>

        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold shadow-lg shadow-primary/20 transition-all w-full md:w-auto justify-center">
          <span className="material-symbols-outlined">add</span>
          Thêm học viên
        </button>
      </div>

      {/* Student Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Học viên
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Email/SĐT
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Khóa học tham gia
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Tiến độ học
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">
                  Hành động
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

              {/* Row 1 */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBjImCsP4eopc10TT1gzwarkspeJllnIzql_nB4ar5ziSXb6SuTLTFEwx8zUNNvNgeWYr9SefPS2_ws5-Gr4KnW8AiVQthMlAPQl64bhoF6Te7lCYHk_m0s73AUr9ckkv3D56JgyRmDred0hMnoeD0MZQpwn7cb8rwXj_JM9wAclIWMMAt2rjkwTPPbBfs2MZAslpKNbEU4KiRJxN3SNRWQWk2_-owcz6h1N3NTtFMwdfgSP4L-uksgOgYCVYR6lZCI01L0JWll_rk')",
                      }}
                    ></div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        Trần Minh Quân
                      </p>
                      <p className="text-xs text-slate-400">
                        ID: TX-9021
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <p className="text-sm font-medium">
                    quan.tm@gmail.com
                  </p>
                  <p className="text-xs text-slate-400">
                    0902-XXX-XXX
                  </p>
                </td>

                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      HSK 3
                    </span>
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      HSK 2
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="w-40">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-primary uppercase">
                        HSK 3
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        75%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full">
                    Active
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-lg">
                        edit
                      </span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCyK1XYqBwvLJwVre3NfYtZz5dr5B1XM9Tj8br8HwkkwFcHKfuChzQ4kWdK1zw8_0lFZEsw9cgHafdvWWeNIgclHa5vHzvxV1msU5vrXx9De4olxd80WLdbUJRaidm0KaMl_X471YeC1a56QIr3nxCPDCt56hqcZLI8mpGGYzVSmMzlAB78MNlwW8mJ5nZGETVCwCzap09k7yUPWi9cdwWVTQ52kHrsBfW2Q4vhFWVPJIUr7i8YBH42vrET2RQqKcYLR2_GVI143CM')",
                      }}
                    ></div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        Lê Thu Hà
                      </p>
                      <p className="text-xs text-slate-400">
                        ID: TX-8432
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <p className="text-sm font-medium">
                    ha.le9x@yahoo.com
                  </p>
                  <p className="text-xs text-slate-400">
                    0935-XXX-XXX
                  </p>
                </td>

                <td className="px-6 py-4">
                  <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    HSK 1
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="w-40">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-primary uppercase">
                        HSK 1
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        100%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full">
                    Active
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-lg">
                        edit
                      </span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
{/* Row 3 */}
<tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
  <td className="px-6 py-4">
    <div className="flex items-center gap-3">
      <div
        className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB8ig8VYobxLt0ru0H1unnCLNB722LCbzSE7Bgt_RElI6Ncad3ZqhEPIoXv3E4oNqGqvO6bAUlA0QOVmw8lduABZDRAoBI779UjilmBJgKuaVrIge0ib7EYZ6nDqJw7qMr9LDmGVgO5kpVK8rqalGnkA1xDN-fYoHfnyibnTJrykMN-iRhgkZlX2NEAfiG3jBSieQVG41e4uNKFbLQNW5XIaGONYq3zF5L3q7LlpQ0ya61hCV7LCqkI6nvoom3JCG17Xosmaf0YNxU')",
        }}
      ></div>
      <div>
        <p className="font-semibold text-slate-900 dark:text-white">
          Phạm Hoàng Nam
        </p>
        <p className="text-xs text-slate-400">
          ID: TX-7210
        </p>
      </div>
    </div>
  </td>

  <td className="px-6 py-4">
    <p className="text-sm font-medium">
      namph98@outlook.com
    </p>
    <p className="text-xs text-slate-400">
      0821-XXX-XXX
    </p>
  </td>

  <td className="px-6 py-4">
    <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
      HSK 5
    </span>
  </td>

  <td className="px-6 py-4">
    <div className="w-40">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-bold text-primary uppercase">
          HSK 5
        </span>
        <span className="text-[10px] font-bold text-slate-400">
          12%
        </span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary"
          style={{ width: "12%" }}
        ></div>
      </div>
    </div>
  </td>

  <td className="px-6 py-4 text-center">
    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold rounded-full">
      Inactive
    </span>
  </td>

  <td className="px-6 py-4 text-right">
    <div className="flex items-center justify-end gap-2">
      <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
        <span className="material-symbols-outlined text-lg">
          edit
        </span>
      </button>
      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
        <span className="material-symbols-outlined text-lg">
          delete
        </span>
      </button>
    </div>
  </td>
</tr>

{/* Row 4 */}
<tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
  <td className="px-6 py-4">
    <div className="flex items-center gap-3">
      <div
        className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCb_yvnYwq_3oK9Q9Ug38Ll_M8WN2jVkfivIsxyFUbyGS3EqpwQln-RV2kwTh40SpXOExz1VzTkFDfVcc4aaQCYGzJBmVfn7VbfO8kSvUi7qOrNZwchjxbee3Vahjf2dnK0dv125s7QhDopuSOcOGWv4aWtBmIatVtVv7ftMJunlVbEHd9eY9VWuxJ2ko2BmTNhV9nKrlW9W8SGR4h_yvSTfgJLDVBlwQYT6ChHUoe3MoSjxoDFeIDiB9o2FOfPpGmnct2KFAe0kjQ')",
        }}
      ></div>
      <div>
        <p className="font-semibold text-slate-900 dark:text-white">
          Nguyễn Thảo Nguyên
        </p>
        <p className="text-xs text-slate-400">
          ID: TX-3329
        </p>
      </div>
    </div>
  </td>

  <td className="px-6 py-4">
    <p className="text-sm font-medium">
      ntnguyen.edu@gmail.com
    </p>
    <p className="text-xs text-slate-400">
      0708-XXX-XXX
    </p>
  </td>

  <td className="px-6 py-4">
    <div className="flex flex-wrap gap-2">
      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
        HSK 2
      </span>
      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
        Sơ cấp 1
      </span>
    </div>
  </td>

  <td className="px-6 py-4">
    <div className="w-40">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-bold text-primary uppercase">
          HSK 2
        </span>
        <span className="text-[10px] font-bold text-slate-400">
          45%
        </span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary"
          style={{ width: "45%" }}
        ></div>
      </div>
    </div>
  </td>

  <td className="px-6 py-4 text-center">
    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-full">
      Active
    </span>
  </td>

  <td className="px-6 py-4 text-right">
    <div className="flex items-center justify-end gap-2">
      <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
        <span className="material-symbols-outlined text-lg">
          edit
        </span>
      </button>
      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
        <span className="material-symbols-outlined text-lg">
          delete
        </span>
      </button>
    </div>
  </td>
</tr>
            </tbody>
          </table>
        </div>
        {/* Pagination */}
<div className="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
  <p className="text-sm text-slate-500">
    Hiển thị{" "}
    <span className="font-bold text-slate-900 dark:text-white">
      1-10
    </span>{" "}
    trên{" "}
    <span className="font-bold text-slate-900 dark:text-white">
      12,450
    </span>{" "}
    học viên
  </p>

  <div className="flex items-center gap-2">
    <button
      className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
      disabled
    >
      <span className="material-symbols-outlined">
        chevron_left
      </span>
    </button>

    <button className="size-9 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
      1
    </button>

    <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-sm">
      2
    </button>

    <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-sm">
      3
    </button>

    <span className="text-slate-300">...</span>

    <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-sm">
      1245
    </button>

    <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800">
      <span className="material-symbols-outlined">
        chevron_right
      </span>
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