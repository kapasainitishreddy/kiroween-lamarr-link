'use client';

import { useState, useEffect } from 'react';
import { createHopSequence, FREQUENCIES } from '../lib/hop';

interface Agent {
  id: string;
  frequency: number;
  messages: string[];
}

export default function Home() {
  const seed = 42;
  const sequence = createHopSequence(seed, 32);
  const [hopIndex, setHopIndex] = useState(0);
  const [jamming, setJamming] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([
    { id: 'A', frequency: sequence[0], messages: [] },
    { id: 'B', frequency: sequence[0], messages: [] },
    { id: 'C', frequency: sequence[0], messages: [] },
  ]);
  const [log, setLog] = useState<string[]>([]);
  const [consecutive, setConsecutive] = useState(0);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setHopIndex((idx) => {
        const next = (idx + 1) % sequence.length;
        const freq = sequence[next];
        setAgents((prev) => prev.map((a) => ({ ...a, frequency: freq })));
        return next;
      });
    }, jamming ? 350 : 700);
    return () => clearInterval(id);
  }, [jamming, sequence]);

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
      setConsecutive((c) => {
        const next = c + 1;
        if (next >= 3) setSuccess(true);
        return next;
      });
    } else {
      setLog((l) => [`${from} → ${to}: blocked (frequency mismatch)`, ...l].slice(0, 8));
      setConsecutive(0);
    }
  };

  const currentFreq = FREQUENCIES[sequence[hopIndex]];

  return (
    <main className="min-h-screen bg-black text-amber-400 font-mono p-8">
      <h1 className="text-4xl mb-2">Lamarr Link</h1>
      <p className="mb-4 text-amber-300 text-sm">
        1942 frequency-hopping patent × modern agent mesh<br />
        Shared seed sequence. Agents only talk on matching frequency.
      </p>

      <div className="flex gap-3 mb-6">
        {FREQUENCIES.map((f, i) => (
          <div
            key={f}
            className={`w-20 h-16 border flex items-center justify-center text-xs ${
              sequence[hopIndex] === i ? 'bg-amber-500 text-black font-bold' : 'border-amber-700'
            }`}
          >
            {f} Hz
          </div>
        ))}
      </div>

      <div className="flex gap-4 mb-4 items-center">
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
        <span className="text-sm">
          Consecutive: {consecutive}/3
        </span>
      </div>

      {success && (
        <div className="mb-4 border border-green-500 bg-green-950 text-green-400 p-3 text-sm">
          Success: 3 consecutive deliveries while hops stayed synchronized.
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-6">
        {agents.map((a) => (
          <div key={a.id} className="border border-amber-700 p-3">
            <p className="font-bold">Agent {a.id}</p>
            <p className="text-xs">Freq: {FREQUENCIES[a.frequency]} Hz</p>
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

      <p className="mt-4 text-xs text-amber-600">
        Current: {currentFreq} Hz • Seed: {seed}
      </p>

      <footer className="mt-12 text-xs text-amber-700">
        Kiroween 2026 • Frankenstein • Hedy Lamarr & George Antheil 1942 patent revived<br />
        US Patent 2,292,387 — Secret Communication System
      </footer>
    </main>
  );
}
