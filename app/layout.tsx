
import './globals.css'
import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-white text-slate-900">
        
        <aside className="w-64 border-r bg-slate-50 p-6 flex flex-col gap-6">
          <div className="font-bold text-xl text-indigo-600 tracking-tighter">VC INTEL</div>
          <nav className="flex flex-col gap-2 font-medium text-slate-600">
            <Link href="/companies" className="p-2 hover:bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-slate-200 transition-all">🔍 Discover</Link>
            <Link href="/lists" className="p-2 hover:bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-slate-200 transition-all">📁 My Lists</Link>
          </nav>
        </aside>
        
        <main className="flex-1 overflow-auto">{children}</main>
      </body>
    </html>
  )
}