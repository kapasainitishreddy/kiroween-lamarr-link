// Deterministic frequency-hopping sequence
// Shared seed → both agents hop identically

export function createHopSequence(seed: number, length = 16): number[] {
  let state = seed;
  const sequence: number[] = [];
  for (let i = 0; i < length; i++) {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    sequence.push(state % 5); // 5 frequencies
  }
  return sequence;
}

export const FREQUENCIES = [440, 880, 1320, 1760, 2200];
