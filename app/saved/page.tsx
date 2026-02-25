'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SavedSearchesPage() {
  const [savedSearches, setSavedSearches] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('saved-searches') || '[]');
    setSavedSearches(data);
  }, []);

  const handleRerun = (s: any) => {
    
    router.push(`/companies?search=${encodeURIComponent(s.term)}&sector=${encodeURIComponent(s.sector)}`);
  };

  const handleDelete = (id: number) => {
    const updated = savedSearches.filter(s => s.id !== id);
    setSavedSearches(updated);
    localStorage.setItem('saved-searches', JSON.stringify(updated));
  };

  return (
    <div className="p-10 bg-slate-50 min-h-screen text-slate-900">
      <h1 className="text-3xl font-extrabold mb-8 tracking-tight">Saved Searches</h1>
      {savedSearches.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-dashed text-center text-slate-400">
          No saved searches found.
        </div>
      ) : (
        <div className="grid gap-4">
          {savedSearches.map((s) => (
            <div key={s.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <div>
                <p className="text-lg font-bold">Search: <span className="text-indigo-600">"{s.term || 'All'}"</span></p>
                <p className="text-sm text-slate-500">Sector: {s.sector} • Saved on {s.timestamp}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleRerun(s)} className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-indigo-700">Re-run</button>
                <button onClick={() => handleDelete(s.id)} className="text-red-500 text-sm hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}