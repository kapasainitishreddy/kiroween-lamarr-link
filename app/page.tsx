'use client';

import { useState, useEffect } from 'react';

interface Agent {
  id: string;
  frequency: number;
  messages: string[];
}

export default function Home() {
  const frequencies = [440, 880, 1320, 1760, 2200];
  const [hop, setHop] = useState(0);
  const [jamming, setJamming] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([
    { id: 'A', frequency: 0, messages: [] },
    { id: 'B', frequency: 0, messages: [] },
    { id: 'C', frequency: 0, messages: [] },
  ]);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      setHop((h) => {
        const next = (h + 1) % frequencies.length;
        // Agents hop together (shared sequence)
        setAgents((prev) =>
          prev.map((a) => ({ ...a, frequency: next }))
        );
        return next;
      });
    }, jamming ? 350 : 700);
    return () => clearInterval(id);
  }, [jamming]);

  const sendMessage = (from: string, to: string, text: string) => {
    const sender = agents.find((a) => a.id === from);
    const receiver = agents.find((a) => a.id === to);
    if (!sender || !receiver) return;

    if (sender.frequency === receiver.frequency) {
      setAgents((prev) =>
        prev.map((a) =>
          a.id === to ? { ...a, messages: [...a.messages, `${from}: ${text}`] } : a
        )
      );
      setLog((l) => [`${from} → ${to}: "${text}" (delivered)`, ...l].slice(0, 8));
    } else {
      setLog((l) => [`${from} → ${to}: blocked (frequency mismatch)`, ...l].slice(0, 8));
    }
  };

  return (
    <main className="min-h-screen bg-black text-amber-400 font-mono p-8">
      <h1 className="text-4xl mb-2">Lamarr Link</h1>
      <p className="mb-4 text-amber-300 text-sm">
        1942 frequency-hopping patent × modern agent mesh<br />
        Agents only exchange messages when on the same frequency.
      </p>

      <div className="flex gap-3 mb-6">
        {frequencies.map((f, i) => (
          <div
            key={f}
            className={`w-20 h-16 border flex items-center justify-center text-xs ${
              i === hop ? 'bg-amber-500 text-black font-bold' : 'border-amber-700'
            }`}
          >
            {f} Hz
          </div>
        ))}
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setJamming(!jamming)}
          className="border border-amber-500 px-4 py-2 hover:bg-amber-900"
        >
          {jamming ? 'Disable Jamming' : 'Enable Jamming'}
        </button>
        <button
          onClick={() => sendMessage('A', 'B', 'hello')}
          className="border border-amber-500 px-4 py-2 hover:bg-amber-900"
        >
          A → B
        </button>
        <button
          onClick={() => sendMessage('B', 'C', 'ack')}
          className="border border-amber-500 px-4 py-2 hover:bg-amber-900"
        >
          B → C
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {agents.map((a) => (
          <div key={a.id} className="border border-amber-700 p-3">
            <p className="font-bold">Agent {a.id}</p>
            <p className="text-xs">Freq: {frequencies[a.frequency]} Hz</p>
            <ul className="mt-2 text-xs text-amber-200">
              {a.messages.slice(-3).map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border border-amber-800 p-3 text-xs">
        <p className="mb-1 text-amber-500">Message Log</p>
        {log.map((entry, i) => (
          <p key={i}>{entry}</p>
        ))}
      </div>

      <footer className="mt-12 text-xs text-amber-700">
        Kiroween 2026 • Frankenstein • Hedy Lamarr & George Antheil 1942 patent revived<br />
        US Patent 2,292,387 — Secret Communication System
      </footer>
    </main>
  );
}
