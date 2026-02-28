import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../../assets/image/LOGO (1).png';
import MyUser from './MyUser';
import MyHeader from './MyHeader';
export default function MyVocabulary() {
    const [vocabFilter, setVocabFilter] = useState('all');

    // sample vocabulary data (replace with real data source later)
    const vocabList = [
      {
        id: 1,
        hanzi: '学习',
        pinyin: 'xué xí',
        meaning: 'Học tập',
        type: 'verb',
        example: '我每天都学习汉语。',
        exampleTrans: 'Tôi học tiếng Trung mỗi ngày.'
      },
      {
        id: 2,
        hanzi: '漂亮',
        pinyin: 'piào liang',
        meaning: 'Đẹp, xinh đẹp',
        type: 'adj',
        example: '这件衣服很漂亮。',
        exampleTrans: 'Bộ quần áo này rất đẹp.'
      },
      {
        id: 3,
        hanzi: '北京',
        pinyin: 'běi jīng',
        meaning: 'Bắc Kinh',
        type: 'noun',
        example: '北京是中国的首都。',
        exampleTrans: 'Bắc Kinh là thủ đô của Trung Quốc.'
      },
    ];

    const filtered = vocabFilter === 'all' ? vocabList : vocabList.filter(v => {
      if (vocabFilter === 'noun') return v.type === 'noun';
      if (vocabFilter === 'verb') return v.type === 'verb';
      if (vocabFilter === 'adj') return v.type === 'adj';
      return true;
    });

    return (
        <>
        <MyHeader />

          {/* Mobile profile — surface full MyUser on small screens */}
          <div className="block lg:hidden mb-6 px-4">
            <MyUser mobile />
          </div>

          <main className="flex-grow w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-cloud-pattern pointer-events-none opacity-50 z-0" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* SIDEBAR */}
        <MyUser />
        <div className="lg:col-span-9 flex flex-col gap-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-primary font-bold tracking-wider text-xs uppercase mb-1 block">
            Tủ sách từ vựng - 词汇库
          </span>
          <h2 className="text-3xl font-black text-primary-dark tracking-tight">
            Từ vựng đã lưu
          </h2>
          <p className="text-slate-500 mt-1 text-sm md:text-base">
            Nơi lưu trữ và ôn tập những từ vựng quan trọng của bạn.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-accent hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-accent/20 text-sm">
            <span className="material-symbols-outlined text-lg">quiz</span>
            Luyện tập Flashcard
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-20 z-40">
        <nav className="flex p-1 space-x-1 w-full md:w-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setVocabFilter('all')}
            className={`px-5 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${vocabFilter === 'all' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-50 text-slate-600 font-medium'}`}
          >
            Tất cả (24)
          </button>
          <button
            onClick={() => setVocabFilter('noun')}
            className={`px-5 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${vocabFilter === 'noun' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-50 text-slate-600 font-medium'}`}
          >
            Danh từ
          </button>
          <button
            onClick={() => setVocabFilter('verb')}
            className={`px-5 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${vocabFilter === 'verb' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-50 text-slate-600 font-medium'}`}
          >
            Động từ
          </button>
          <button
            onClick={() => setVocabFilter('adj')}
            className={`px-5 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${vocabFilter === 'adj' ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-50 text-slate-600 font-medium'}`}
          >
            Tính từ
          </button>
        </nav>

        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[20px]">
              search
            </span>
          </div>
          <input
            type="text"
            placeholder="Tìm từ vựng, Pinyin..."
            className="block w-full pl-10 pr-3 py-2 border-none bg-slate-100 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Từ vựng
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Pinyin / Nghĩa
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Loại từ
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                  Ví dụ
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filtered.map((v) => (
                <tr key={v.id} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-chinese font-bold text-primary-dark">{v.hanzi}</span>
                      <button className="size-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">volume_up</span>
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-accent font-bold text-sm">{v.pinyin}</span>
                      <span className="text-slate-900 font-semibold">{v.meaning}</span>
                    </div>
                  </td>

                  <td className="px-6 py-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">{v.type === 'verb' ? 'Động từ' : v.type === 'adj' ? 'Tính từ' : 'Danh từ'}</span>
                  </td>

                  <td className="px-6 py-6 hidden md:table-cell max-w-xs">
                    <div className="text-xs text-slate-500 italic">
                      <p className="font-chinese text-sm text-slate-700 not-italic">{v.example}</p>
                      <p>({v.exampleTrans})</p>
                    </div>
                  </td>

                  <td className="px-6 py-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Xóa">
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                      <button className="bg-primary hover:bg-primary-dark text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">Luyện tập</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
      </div>
    </main>
   
        </>
    )
};