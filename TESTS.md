# Tests

The tests focus on the core business logic: the Audit Engine.

**To run the tests:**
```bash
cd frontend
npm run test
```

### Automated Tests (`frontend/src/__tests__/auditEngine.test.ts`)
1. `calculates correctly for ChatGPT Team with 1 user` - Covers the downgrade logic from Team to Plus.
2. `calculates correctly for Claude Pro with large team` - Covers the upgrade logic from Pro to Team to save individual license management overhead.
3. `returns no savings if already optimal` - Ensures the tool doesn't invent savings where none exist.
4. `calculates yearly savings correctly` - Verifies the monthly * 12 math.
5. `handles missing use cases gracefully` - Fallback logic test.
