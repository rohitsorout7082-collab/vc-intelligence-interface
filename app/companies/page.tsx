'use client'
import { mockCompanies } from '@/lib/data'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function DiscoverPage() {
  const searchParams = useSearchParams()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSector, setFilterSector] = useState('All')
  const [mounted, setMounted] = useState(false) 

  
  useEffect(() => {
    setMounted(true)
    const urlSearch = searchParams.get('search')
    const urlSector = searchParams.get('sector')
    
    if (urlSearch) setSearchTerm(urlSearch)
    if (urlSector) setFilterSector(urlSector)
  }, [searchParams])

  const filteredCompanies = mockCompanies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = filterSector === 'All' || c.sector === filterSector
    return matchesSearch && matchesSector
  })

  const handleSaveSearch = () => {
    if (!searchTerm && filterSector === 'All') {
      alert("Please enter a search term or select a sector first!")
      return
    }

    const newSearch = {
      id: Date.now(),
      term: searchTerm,
      sector: filterSector,
      timestamp: new Date().toLocaleString()
    }

    const existingSearches = JSON.parse(localStorage.getItem('saved-searches') || '[]')
    localStorage.setItem('saved-searches', JSON.stringify([...existingSearches, newSearch]))
    alert("Search filters saved! Check your Saved Searches page.")
  }

  
  if (!mounted) return null

  return (
    <div className="p-10 bg-slate-50 min-h-screen text-slate-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Discover Startups</h1>
          <p className="text-slate-500 mt-1">Search and filter through your curated venture list.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <input 
            type="text" 
            placeholder="Search companies..." 
            value={searchTerm}
            className="px-4 py-2 border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-indigo-500 w-64 shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            value={filterSector}
            className="px-4 py-2 border border-slate-200 rounded-xl bg-white outline-none shadow-sm text-slate-600 font-medium"
            onChange={(e) => setFilterSector(e.target.value)}
          >
            <option value="All">All Sectors</option>
            <option value="Fintech">Fintech</option>
            <option value="AI Infrastructure">AI Infrastructure</option>
            <option value="Clean Energy">Clean Energy</option>
          </select>
          
          <button 
            onClick={handleSaveSearch}
            className="bg-indigo-50 text-indigo-700 px-5 py-2 rounded-xl font-bold hover:bg-indigo-100 transition-all border border-indigo-100 flex items-center gap-2"
          >
            <span></span> Save Search
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-5 font-semibold text-slate-500 text-xs uppercase">Company</th>
              <th className="p-5 font-semibold text-slate-500 text-xs uppercase">Sector</th>
              <th className="p-5 text-right font-semibold text-slate-500 text-xs uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCompanies.map((company) => (
              <tr key={company.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="p-5">
                  <div className="font-bold text-slate-800 text-lg">{company.name}</div>
                </td>
                <td className="p-5">
                  <span className="text-slate-600 font-medium bg-slate-100 px-3 py-1 rounded-full text-sm">
                    {company.sector}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <Link href={`/companies/${company.id}`} className="text-indigo-600 font-bold hover:underline">
                    View Profile →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="mt-6 text-sm text-slate-400 italic">
        Showing {filteredCompanies.length} startups.
      </div>
    </div>
  )
}