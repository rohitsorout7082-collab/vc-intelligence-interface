'use client'
import { useParams } from 'next/navigation'
import { mockCompanies } from '@/lib/data'
import { useState, useEffect } from 'react'

export default function CompanyProfile() {
  const { id } = useParams()
  const company = mockCompanies.find(c => String(c.id) === String(id))
  
  const [loading, setLoading] = useState(false)
  const [enrichedData, setEnrichedData] = useState<any>(null)
  const [note, setNote] = useState('')

  useEffect(() => {
    if (id) {
      const savedNote = localStorage.getItem(`note-${id}`)
      if (savedNote) setNote(savedNote)
    }
  }, [id])

  const handleNoteChange = (val: string) => {
    setNote(val)
    localStorage.setItem(`note-${id}`, val)
  }

  
  const handleSaveToList = () => {
    localStorage.setItem(`save-${id}`, JSON.stringify(company))
    alert(`${company?.name} has been added to your list!`)
  }

  const handleEnrich = async () => {
    setLoading(true)
    setTimeout(() => {
      setEnrichedData({
        summary: `${company?.name} is scaling rapidly. They show strong momentum in market capture.`,
        signals: ["Increased Hiring", "New Funding Round", "High Web Traffic"],
        keywords: ["SaaS", "B2B", "Automation", "Fintech"], 
        sources: [`${company?.website}`, `${company?.website}/about`] 
      })
      setLoading(false)
    }, 1500)
  }

  if (!company) return <div className="p-10 text-slate-900">Company not found!</div>

  return (
    <div className="p-10 bg-slate-50 min-h-screen text-slate-900">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">{company?.name}</h1>
          <a href={company?.website} target="_blank" className="text-indigo-600 hover:underline font-medium">{company?.website}</a>
        </div>
        <div className="flex gap-4">
          <button onClick={handleSaveToList} className="bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 shadow-sm">
            
          </button>
          <button onClick={handleEnrich} disabled={loading} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg disabled:bg-slate-400">
            {loading ? 'Analyzing...' : ' Enrich with AI'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Basic Info</h2>
          <p className="mb-2"><span className="text-slate-500 font-medium">Sector:</span> {company?.sector}</p>
          <p><span className="text-slate-500 font-medium">Status:</span> Active</p>
        </div>

        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-indigo-400"> AI Insights</h2>
          {enrichedData ? (
            <div>
              <p className="italic mb-6 text-slate-300">"{enrichedData?.summary}"</p>
              <div className="flex gap-2 flex-wrap mb-6">
                {enrichedData?.signals?.map((s: string) => (
                  <span key={s} className="bg-indigo-500/20 border border-indigo-500/40 px-3 py-1 rounded-full text-xs font-semibold text-indigo-300">{s}</span>
                ))}
              </div>
              
              
              <div className="pt-6 border-t border-slate-800">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-widest">Keywords</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {enrichedData?.keywords?.map((k: string) => (
                    <span key={k} className="text-[10px] bg-slate-800 px-2 py-1 rounded text-slate-400">#{k}</span>
                  ))}
                </div>
                <div className="text-[10px] text-slate-500 space-y-1">
                  <p>Sources: {enrichedData?.sources?.join(', ')}</p>
                  <p>Enriched on: {new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-slate-500 italic">Click enrich to see AI analysis.</p>
          )}
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Internal Thesis & Notes</h2>
        <textarea 
          value={note}
          onChange={(e) => handleNoteChange(e.target.value)}
          placeholder="Start typing your investment thesis here..."
          className="w-full h-40 p-4 border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-800"
        />
      </div>
    </div>
  )
}
