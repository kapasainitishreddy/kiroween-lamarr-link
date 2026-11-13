'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [hop, setHop] = useState(0);
  const [jamming, setJamming] = useState(false);
  const frequencies = ["440", "880", "1320", "1760", "2200"];

  useEffect(() => {
    const id = setInterval(() => {
      setHop((h) => (h + 1) % frequencies.length);
    }, jamming ? 400 : 800);
    return () => clearInterval(id);
  }, [jamming]);

  return (
    <main className="min-h-screen bg-black text-amber-400 font-mono p-8">
      <h1 className="text-4xl mb-2">Lamarr Link</h1>
      <p className="mb-6 text-amber-300">
        1942 frequency-hopping patent × modern agent mesh<br />
        Nodes only talk when on the same frequency.
      </p>

      <div className="flex gap-4 mb-8">
        {frequencies.map((f, i) => (
          <div
            key={f}
            className={`w-16 h-16 border flex items-center justify-center ${
              i === hop ? 'bg-amber-500 text-black' : 'border-amber-700'
            }`}
          >
            {f}
          </div>
        ))}
      </div>

      <button
        onClick={() => setJamming(!jamming)}
        className="border border-amber-500 px-4 py-2 hover:bg-amber-900"
      >
        {jamming ? 'Disable Jamming' : 'Enable Jamming'}
      </button>

      <p className="mt-6 text-sm">
        Current hop: {frequencies[hop]} Hz — agents can communicate only now.
      </p>

      <footer className="mt-16 text-xs text-amber-700">
        Kiroween 2026 • Frankenstein • Hedy Lamarr 1942 patent revived
      </footer>
    </main>
  );
}
