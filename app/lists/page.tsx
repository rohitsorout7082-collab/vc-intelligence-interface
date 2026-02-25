'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function MyListsPage() {
  const [savedCompanies, setSavedCompanies] = useState<any[]>([])

  useEffect(() => {
    
    const items = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('save-')) {
        const company = JSON.parse(localStorage.getItem(key) || '{}')
        items.push(company)
      }
    }
    setSavedCompanies(items)
  }, [])

  const removeFromList = (id: any) => {
    localStorage.removeItem(`save-${id}`)
    setSavedCompanies(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="p-10 bg-slate-50 min-h-screen text-slate-900">
      <h1 className="text-3xl font-extrabold mb-8">My Saved Lists</h1>
      
      {savedCompanies.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center">
          <p className="text-slate-500 mb-4">Your list is empty.</p>
          <Link href="/companies" className="text-indigo-600 font-bold hover:underline">Go to Discover Startups →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedCompanies.map(company => (
            <div key={company.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold mb-1 text-slate-800">{company.name}</h2>
                <p className="text-slate-500 text-sm mb-4">{company.sector}</p>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
                <Link href={`/companies/${company.id}`} className="text-indigo-600 font-bold text-sm hover:underline">View</Link>
                <button onClick={() => removeFromList(company.id)} className="text-red-500 font-medium text-sm hover:text-red-700">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}