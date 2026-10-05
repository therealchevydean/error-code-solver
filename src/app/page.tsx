
"use client";
import { useState } from 'react';
import Link from 'next/link';
import errorCodes from '@/data/error_codes.json';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCodes = errorCodes.filter(item => 
    item.errorCode.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.software.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-neutral-900 tracking-tight mb-4">
            Error Code Solver
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8">
            Instantly diagnose and fix obscure software and hardware error codes without digging through forums.
          </p>
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              className="block w-full pl-6 pr-4 py-4 border border-neutral-300 rounded-full bg-white text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
              placeholder="Search for an error code (e.g., 0x80070005)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCodes.map((item) => (
            <Link href={`/${item.slug}`} key={item.slug} className="block group">
              <div className="bg-white rounded-2xl p-6 border border-neutral-200 h-full flex flex-col justify-between hover:border-red-500 hover:shadow-md transition-all">
                <div>
                  <span className="inline-block bg-neutral-100 text-neutral-600 text-xs px-2 py-1 rounded font-bold tracking-wide uppercase mb-3">
                    {item.software}
                  </span>
                  <h2 className="text-2xl font-black text-red-600 font-mono mb-2">{item.errorCode}</h2>
                  <h3 className="text-lg font-bold text-neutral-900 mb-3">{item.shortMeaning}</h3>
                </div>
                <p className="text-neutral-500 text-sm line-clamp-2 mb-4">
                  {item.description}
                </p>
                <div className="mt-auto pt-4 border-t border-neutral-100 text-red-600 text-sm font-bold flex items-center">
                  View Solution <span className="ml-1">&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
