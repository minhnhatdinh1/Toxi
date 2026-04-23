import {useEffect,useState} from "react";
import AdminSidebar from "./AdminSidebar";
import {
    getAllCategories,
    createCategories,
    updateCategories,
    deleteCategories
} from "./api/apiCategory";
export default function AdminCategory(){

const [categories,setCategories] = useState([]);
const [name,setName] = useState("");
const [editingId,setEditingId] = useState(null);
const [loading ,setLoading] = useState(false);
const [error,setError] = useState(" ");
 const loadCategories = async () => {
    try {
        setLoading(true);
        const data = await     getAllCategories();
        setCategories(data);
    } catch (err) {
        console.error(err);
        setError("Không tải được danh mục ");

    } finally {
        setLoading(false);
        }

 };

 useEffect(() => {
    loadCategories();
 },[]);

   const resetForm = () => {
    setName("");
    setEditingId(null);
setError("");

};

const handleSubmit = async () => {
    if (!name.trim()) {
        setError("Tên danh mục không được bỏ trống");
        return ;
    }

    try {
        setLoading(true);
        const payload = {nameCategory : name.trim()};

        if (editingId) {
 await updateCategories(editingId,payload);
        }else{
            await createCategories(payload);
        }
    

    resetForm();
    await loadCategories();
} catch (err) {
    console.error(err);
    setError("Lưu danh mục thất bại");
} finally {
    setLoading(false);
}
};

  const handleEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);
    setError("");
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Bạn có chắc muốn xóa danh mục này?");
    if (!ok) return;

    try {
      setLoading(true);
      await     deleteCategories(id);
      await loadCategories();
    } catch (err) {
      console.error(err);
      setError("Xóa danh mục thất bại");
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="flex min-h-screen overflow-hidden">
      <AdminSidebar />

      <main className="flex-1 overflow-y-auto bg-background-light p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Quản lý danh mục</h1>
            <p className="text-slate-500 mt-1">Thêm, sửa, xóa category cho sản phẩm.</p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl border p-5 space-y-4">
            <h2 className="text-lg font-semibold">
              {editingId ? "Cập nhật danh mục" : "Thêm danh mục mới"}
            </h2>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên danh mục"
              className="w-full rounded-lg border p-3"
            />

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="rounded-lg bg-primary px-4 py-2 text-white font-semibold"
              >
                {editingId ? "Cập nhật" : "Thêm mới"}
              </button>

              <button
                onClick={resetForm}
                type="button"
                className="rounded-lg border px-4 py-2 font-semibold"
              >
                Làm mới
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Tên danh mục</th>
                  <th className="px-4 py-3 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-slate-500">
                      Chưa có danh mục nào
                    </td>
                  </tr>
                ) : (
                  categories.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-3">{item.id}</td>
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="rounded-lg bg-blue-50 px-3 py-1 text-blue-600"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="rounded-lg bg-red-50 px-3 py-1 text-red-600"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}








