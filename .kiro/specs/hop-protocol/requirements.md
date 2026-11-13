# Requirements: Frequency-Hopping Message Protocol

## User Stories
- As a user, I can see multiple agents hopping across shared frequencies.
- As a user, I can attempt to send a message from one agent to another.
- As a user, messages only succeed when both agents are on the same frequency.
- As a user, I can enable jamming to force faster hopping and observe blocked messages.
- As a judge, I can see the connection to the 1942 Lamarr-Antheil patent.

## Acceptance Criteria
- Agents share a deterministic hop sequence.
- Message delivery is blocked on frequency mismatch.
- Jamming toggle changes hop interval.
- Message log shows delivered vs blocked attempts.
- Historical patent reference is visible in the UI.
