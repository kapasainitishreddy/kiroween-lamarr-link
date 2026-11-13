# Design: Frequency-Hopping Message Protocol

## Architecture
- Shared hop sequence generated from a seed (`lib/hop.ts`).
- Agents hold current frequency index.
- Message send checks frequency match before delivery.
- Jamming reduces hop interval.

## Success Condition (next layer)
- Track consecutive successful deliveries.
- Reach 3 consecutive successes → task complete.
- Any mismatch resets the counter.

## Visualization
- Frequency bars highlight current hop.
- Per-agent message list.
- Shared log of delivered vs blocked attempts.
