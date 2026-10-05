
import errorCodes from '@/data/error_codes.json';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return errorCodes.map((item) => ({ slug: item.slug }));
}

export default async function ErrorPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const item = errorCodes.find((i) => i.slug === resolvedParams.slug);
  if (!item) notFound();

  return (
    <main className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="p-10 text-center bg-red-50 border-b border-red-100">
          <Link href="/" className="text-red-500 hover:text-red-700 mb-6 inline-block font-bold uppercase tracking-wider text-sm">
            &larr; Back to Search
          </Link>
          <div className="mb-4">
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              {item.software}
            </span>
          </div>
          <h1 className="text-5xl font-black text-red-600 font-mono mb-4">{item.errorCode}</h1>
          <h2 className="text-2xl font-bold text-neutral-800">{item.shortMeaning}</h2>
        </div>
        
        <div className="p-8 sm:p-12 space-y-10 text-neutral-700">
          <div>
            <h3 className="text-lg font-bold text-neutral-400 uppercase tracking-widest mb-3">What does this mean?</h3>
            <p className="text-xl text-neutral-900 leading-relaxed">{item.description}</p>
          </div>
          
          <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200">
            <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center">
              <span className="bg-neutral-200 text-neutral-700 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">🛠️</span>
              How to fix this error
            </h3>
            <ul className="space-y-4">
              {item.fixes.map((fix, i) => (
                <li key={i} className="flex bg-white p-4 rounded-xl border border-neutral-200 shadow-sm">
                  <span className="text-red-500 font-bold mr-4 shrink-0">Step {i + 1}</span> 
                  <span>{fix}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-12 bg-neutral-900 p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Still having computer trouble?</h3>
            <p className="text-neutral-400 mb-6">Scan your PC with our recommended system optimization tool to automatically fix corrupted files.</p>
            <a href="https://amazon.com/?ref=pugdietguide-20" target="_blank" rel="noopener noreferrer" className="inline-block bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-lg transition-colors">
              Download System Fixer
            </a>
            <p className="text-xs text-neutral-500 mt-4">Advertisement / Affiliate Link</p>
          </div>
        </div>
      </div>
    </main>
  );
}
