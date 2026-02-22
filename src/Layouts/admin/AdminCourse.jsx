import react from 'react'
import AdminSidebar from "./AdminSidebar";
export default function AdminCourse() {
    return(
        <>
       <div class="flex h-screen overflow-hidden">
             <AdminSidebar />
        {/* Main Content */}
<main className="flex-1 overflow-y-auto bg-background-light">
  {/* Top Header */}
  <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-[#e7ebf3] px-8 py-4 flex items-center justify-between">
    <div>
      <div className="flex items-center gap-2 text-sm text-[#4c669a] mb-1">
        <span>Store Management</span>
        <span className="material-symbols-outlined text-xs">
          chevron_right
        </span>
        <span className="text-[#0d121b] font-medium">
          Product List
        </span>
      </div>
      <h2 className="text-2xl font-bold text-[#0d121b]">
        Product Inventory
      </h2>
    </div>

    <div className="flex items-center gap-4">
      <button className="flex items-center gap-2 px-4 py-2.5 bg-accent-yellow hover:bg-accent-yellow-hover text-black font-bold rounded-lg transition-all shadow-sm">
        <span className="material-symbols-outlined">add</span>
        <span>Add New Product</span>
      </button>
    </div>
  </header>

  <div className="p-8 space-y-6">
    {/* Stats Overview */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Total Products */}
      <div className="bg-white p-6 rounded-xl border border-[#e7ebf3] shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#4c669a] text-sm font-medium">
            Total Products
          </span>
          <div className="p-2 bg-primary/10 rounded-lg">
            <span className="material-symbols-outlined text-primary">
              inventory_2
            </span>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold">1,248</h3>
          <span className="text-green-600 text-sm font-bold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-xs">
              arrow_upward
            </span>
            5.2%
          </span>
        </div>
      </div>

      {/* Low Stock */}
      <div className="bg-white p-6 rounded-xl border border-[#e7ebf3] shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#4c669a] text-sm font-medium">
            Low Stock Items
          </span>
          <div className="p-2 bg-orange-100 rounded-lg">
            <span className="material-symbols-outlined text-orange-600">
              warning
            </span>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold">12</h3>
          <span className="text-orange-600 text-sm font-medium italic">
            Requires attention
          </span>
        </div>
      </div>

      {/* Total Sales */}
      <div className="bg-white p-6 rounded-xl border border-[#e7ebf3] shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#4c669a] text-sm font-medium">
            Total Sales (MTD)
          </span>
          <div className="p-2 bg-green-100 rounded-lg">
            <span className="material-symbols-outlined text-green-600">
              payments
            </span>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold">¥45,000</h3>
          <span className="text-green-600 text-sm font-bold flex items-center gap-0.5">
            <span className="material-symbols-outlined text-xs">
              arrow_upward
            </span>
            12.4%
          </span>
        </div>
      </div>

    </div>
    {/* Product Table Container */}
<div className="bg-white rounded-xl border border-[#e7ebf3] shadow-sm overflow-hidden">
  
  {/* Filters & Search */}
  <div className="p-4 border-b border-[#e7ebf3] flex flex-wrap items-center justify-between gap-4">
    
    <div className="flex items-center gap-4 flex-1 min-w-[300px]">
      
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4c669a] text-xl">
          search
        </span>
        <input
          type="text"
          placeholder="Search product name, SKU..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border-[#e7ebf3] focus:border-primary focus:ring-primary text-sm"
        />
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2">
        <select className="rounded-lg border-[#e7ebf3] text-sm focus:border-primary focus:ring-primary py-2 px-3">
          <option>All Categories</option>
          <option>Books</option>
          <option>Flashcards</option>
          <option>Tools</option>
        </select>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex items-center gap-2">
      <button className="flex items-center gap-2 px-3 py-2 border border-[#e7ebf3] rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
        <span className="material-symbols-outlined text-sm">filter_list</span>
        <span>Advanced Filters</span>
      </button>

      <button className="flex items-center gap-2 px-3 py-2 border border-[#e7ebf3] rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
        <span className="material-symbols-outlined text-sm">download</span>
        <span>Export</span>
      </button>
    </div>
  </div>

  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      
      <thead className="bg-gray-50 border-b border-[#e7ebf3]">
        <tr>
          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase tracking-wider">
            Product Image
          </th>
          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase tracking-wider">
            Product Name
          </th>
          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase tracking-wider">
            Category
          </th>
          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase tracking-wider text-right">
            Price
          </th>
          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase tracking-wider text-right">
            Stock
          </th>
          <th className="px-6 py-4 text-xs font-bold text-[#4c669a] uppercase tracking-wider text-center">
            Actions
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-[#e7ebf3]">
        
        {/* Row 1 */}
        <tr className="hover:bg-gray-50/50 transition-colors">
          
          {/* Image */}
          <td className="px-6 py-4">
            <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border border-[#e7ebf3]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvKqR-Jw1KEqY5fZbkhhFH7ia8bUlafYxll2Xs7DLz8MbqgJQ6ztyMueAql-_pudtdnAVErKhgwCTVwCkphVWrfzZHdu7nUJpuSicrhowkH6JHePOyyFsahlBMNv_-snOXRdOLnjT8PmWIOOzF8-MXFcOmo7ixvuGG7vJ1k7ofIyhe522wRJFcYkxE2LQ2K1VlQH_Q_e-GmdAVoGdm01m1O4vzt5DL1H5VhiaesLlKZFDtuuyHcEjbTt9X78Nly2RNA4ki6ioubC4"
                alt="Chinese textbook cover for HSK 4 level"
                className="w-full h-full object-cover"
              />
            </div>
          </td>

          {/* Name */}
          <td className="px-6 py-4">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#0d121b]">
                Standard HSK 4 Textbook
              </span>
              <span className="text-xs text-[#4c669a]">
                SKU: TX-BK-001
              </span>
            </div>
          </td>

          {/* Category */}
          <td className="px-6 py-4">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
              Books
            </span>
          </td>

          {/* Price */}
          <td className="px-6 py-4 text-right">
            <span className="text-sm font-bold">¥128.00</span>
          </td>

          {/* Stock */}
          <td className="px-6 py-4 text-right">
            <span className="text-sm font-medium">450</span>
          </td>

          {/* Actions */}
          <td className="px-6 py-4 text-center">
            <div className="flex items-center justify-center gap-2">
              
              <button className="p-1.5 text-[#4c669a] hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">
                  edit
                </span>
              </button>

              <button className="p-1.5 text-[#4c669a] hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">
                  visibility
                </span>
              </button>

              <button className="p-1.5 text-[#4c669a] hover:text-red-600 transition-colors">
                <span className="material-symbols-outlined text-lg">
                  delete
                </span>
              </button>

            </div>
          </td>

        </tr>
{/* Row 2 */}
<tr className="hover:bg-gray-50/50 transition-colors">
  <td className="px-6 py-4">
    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border border-[#e7ebf3]">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwWIhiqTdx6mkwZlmHOE_sCreBSqrnevaFsZYXPwLAUsZ4s_YyCo69XvN-imI1qFctj9CnuidLK16pY-g56IN_1y2w1gR8BBHsReZjU1JlrlwWOPeGNQ4V8RdfKMuY27EiHyxa7KXPhEyYMzoqesNQ50cG7svlpSrACEkZ9NO_m0Vq64eJPF_u3aNk3Qdz0EIuiMA_LRALnHOvQ6RWt5emXgFezWcm_ESoA7ifSUewV3bORgFVLFWrRFSkTpghrHI8Ld7BP9xnzK0"
        alt="Set of Chinese character flashcards"
        className="w-full h-full object-cover"
      />
    </div>
  </td>

  <td className="px-6 py-4">
    <div className="flex flex-col">
      <span className="text-sm font-bold text-[#0d121b]">
        Elementary 500 Flashcards
      </span>
      <span className="text-xs text-[#4c669a]">
        SKU: TX-FC-204
      </span>
    </div>
  </td>

  <td className="px-6 py-4">
    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
      Flashcards
    </span>
  </td>

  <td className="px-6 py-4 text-right">
    <span className="text-sm font-bold">¥89.00</span>
  </td>

  <td className="px-6 py-4 text-right">
    <span className="text-sm font-medium text-orange-600 font-bold">
      8
    </span>
  </td>

  <td className="px-6 py-4 text-center">
    <div className="flex items-center justify-center gap-2">
      <button className="p-1.5 text-[#4c669a] hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-lg">edit</span>
      </button>
      <button className="p-1.5 text-[#4c669a] hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-lg">visibility</span>
      </button>
      <button className="p-1.5 text-[#4c669a] hover:text-red-600 transition-colors">
        <span className="material-symbols-outlined text-lg">delete</span>
      </button>
    </div>
  </td>
</tr>

{/* Row 3 */}
<tr className="hover:bg-gray-50/50 transition-colors">
  <td className="px-6 py-4">
    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border border-[#e7ebf3]">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDb4oqBf1Y_UJyDo902oE5KmL13gBOdpLdM6YPAYF8cQUH2dxHOuEy8SQ-0Cfr0fe2zUvkzPRNT4UV6LkxkrEL0BHWJX8wbOeq5uzXh4e5rSTykmcUUvFjoym-f1PVB8NvzmOj_x5uNVU-JGHS4QCzyqDC45dxLiJfp5d3dFO0o2pjO5c6XNUvNSBr2J3fsZWl_3KgykauB0QYaQ2w94a6cUJzC6-_YT9TtgcicPxh8ZybK_AYiuSpWN0RKbbJF8tKG4QzOOw5tQhg"
        alt="Calligraphy brush and ink set"
        className="w-full h-full object-cover"
      />
    </div>
  </td>

  <td className="px-6 py-4">
    <div className="flex flex-col">
      <span className="text-sm font-bold text-[#0d121b]">
        Calligraphy Master Set
      </span>
      <span className="text-xs text-[#4c669a]">
        SKU: TX-TL-092
      </span>
    </div>
  </td>

  <td className="px-6 py-4">
    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-700">
      Tools
    </span>
  </td>

  <td className="px-6 py-4 text-right">
    <span className="text-sm font-bold">¥255.00</span>
  </td>

  <td className="px-6 py-4 text-right">
    <span className="text-sm font-medium">124</span>
  </td>

  <td className="px-6 py-4 text-center">
    <div className="flex items-center justify-center gap-2">
      <button className="p-1.5 text-[#4c669a] hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-lg">edit</span>
      </button>
      <button className="p-1.5 text-[#4c669a] hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-lg">visibility</span>
      </button>
      <button className="p-1.5 text-[#4c669a] hover:text-red-600 transition-colors">
        <span className="material-symbols-outlined text-lg">delete</span>
      </button>
    </div>
  </td>
</tr>

{/* Row 4 */}
<tr className="hover:bg-gray-50/50 transition-colors">
  <td className="px-6 py-4">
    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border border-[#e7ebf3]">
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeU5mDK193ypN4M7Fon2i5p-3KGKv-tHzJeYFemmijJq0h6USpuGMyh8xN5cOLC7v-SH1mIo5PC6zoR84y7BuvYm3wtRhyjxNHlJBKtMjAPhMqUs2jvUtiPgqAmWj09nDfSdUtyoCJMVpxV-h7oOie43uUmn4scV1SWn6RcILDiL5D3-cQD5zQhjuiT83fWqETcd_OgWVRmgyFCndKmtuSlfEFH0w9bBKxjuqS9yoKP-3lEimyrkbTpLaRTA4v62pl0TKmp3F0grM"
        alt="Collection of Chinese grammar guides"
        className="w-full h-full object-cover"
      />
    </div>
  </td>

  <td className="px-6 py-4">
    <div className="flex flex-col">
      <span className="text-sm font-bold text-[#0d121b]">
        Grammar Guide Level 1-3
      </span>
      <span className="text-xs text-[#4c669a]">
        SKU: TX-BK-042
      </span>
    </div>
  </td>

  <td className="px-6 py-4">
    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
      Books
    </span>
  </td>

  <td className="px-6 py-4 text-right">
    <span className="text-sm font-bold">¥65.00</span>
  </td>

  <td className="px-6 py-4 text-right">
    <span className="text-sm font-medium">89</span>
  </td>

  <td className="px-6 py-4 text-center">
    <div className="flex items-center justify-center gap-2">
      <button className="p-1.5 text-[#4c669a] hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-lg">edit</span>
      </button>
      <button className="p-1.5 text-[#4c669a] hover:text-primary transition-colors">
        <span className="material-symbols-outlined text-lg">visibility</span>
      </button>
      <button className="p-1.5 text-[#4c669a] hover:text-red-600 transition-colors">
        <span className="material-symbols-outlined text-lg">delete</span>
      </button>
    </div>
  </td>
</tr>
      </tbody>
    </table>
  </div>
  {/* Pagination */}
<div className="p-4 bg-gray-50 border-t border-[#e7ebf3] flex items-center justify-between">
  
  <p className="text-sm text-[#4c669a]">
    Showing{" "}
    <span className="font-bold text-[#0d121b]">1</span> to{" "}
    <span className="font-bold text-[#0d121b]">4</span> of{" "}
    <span className="font-bold text-[#0d121b]">1,248</span> results
  </p>

  <div className="flex items-center gap-2">
    
    {/* Prev Button */}
    <button
      disabled
      className="p-2 rounded-lg border border-[#e7ebf3] bg-white text-[#4c669a] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="material-symbols-outlined">
        chevron_left
      </span>
    </button>

    {/* Page Numbers */}
    <button className="w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold">
      1
    </button>

    <button className="w-8 h-8 rounded-lg text-sm font-medium hover:bg-gray-200">
      2
    </button>

    <button className="w-8 h-8 rounded-lg text-sm font-medium hover:bg-gray-200">
      3
    </button>

    <span className="text-[#4c669a]">...</span>

    <button className="w-8 h-8 rounded-lg text-sm font-medium hover:bg-gray-200">
      312
    </button>

    {/* Next Button */}
    <button className="p-2 rounded-lg border border-[#e7ebf3] bg-white text-[#4c669a] hover:bg-gray-50">
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