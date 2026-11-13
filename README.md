# Lamarr Link

Frankenstein entry for Kiroween 2026.  
Revives the spirit of the 1942 Lamarr–Antheil frequency-hopping patent (US 2,292,387) as a visual multi-agent mesh.

Agents only exchange messages when they are on the same frequency. A jammer forces faster hopping and increases dropped messages.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## How to continue

1. **Better hop sequence**  
   Replace the simple round-robin with a deterministic pseudo-random sequence (shared seed). See `lib/hop.ts`.

2. **Collaborative task**  
   Add a small shared goal (e.g. both agents must deliver 3 messages in a row without a frequency mismatch). Success only possible while hops stay synchronized.

3. **Visualization**  
   Animate the hop path, show spectrum occupancy, or add a simple jammer that blanks specific frequencies.

4. **Kiro usage**  
   Expand `.kiro/specs/hop-protocol/` with design.md and tasks.md.  
   Add a hook that runs TypeScript check on save.

5. **Historical note**  
   Keep the patent reference visible. Optional: short timeline (1942 patent → 1960s electronic versions → Bluetooth adaptive hopping).

## Current status

- Interactive hop visualizer
- Message passing blocked on frequency mismatch
- Jamming toggle
- Deterministic hop helper (`lib/hop.ts`)
- Basic requirements spec

Next recommended step: wire `lib/hop.ts` into the page and add a simple success condition for the agents.
