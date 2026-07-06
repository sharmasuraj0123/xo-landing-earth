# Content Draft V5: Nailing the Unit of Work Thesis

Goal of this iteration: a visitor who scrolls the page should be able to repeat the thesis back in one breath:

> "You hire the skill, not the hours. The work, not the prompt, is the unit. A unit of work is an outcome with a definition of done, a checkable result, and one owner. The environment tracks state before and after and meters the spend, so budget minus spend is your efficiency. Agents are replaceable; the environment compounds."

Everything below serves that sentence.

## The crispest lines the thesis owns (use these, retire weaker phrasing)

1. "Hire the skill, not the hours." (the flag; currently absent from the page, bring it back)
2. "The prompt was the unit. Now the work is."
3. "A definition of done. A checkable result. One owner." (the three-part test)
4. "Did the state change? What did it cost? That's the whole calculation."
5. "Budget vs spend. The gap is your efficiency."
6. "Scope it like a contractor, not a utility meter."
7. "Agents are replaceable. The environment compounds."
8. "Tokens price the machinery. Units price the result."

## Section-by-section copy suggestions (current page order)

### Hero
- Keep: "Workspaces for / [cycling]" and the stats.
- Eyebrow upgrade: "Workspaces for AI agents · XO" → **"Hire the skill, not the hours · XO"**. The thesis flag flies first, costs one line.
- Sub upgrade: "The environment where your agents do real work, and you see exactly what that work costs and delivers." → **"Where agent work becomes a unit you can check, price, and repeat."** Shorter, and it plants "unit" in the first ten seconds.

### How It Works (Create · Setup · Share)
- Step 03 "and measure" gains the session-per-intent idea from the docs: **"One session per intent: clear the backlog, review the contracts, ship the report. Cost and outcome tracked per intent, not smeared across a token bill."**
- Everything else stays; it's the product tour, not the thesis.

### Features ("More than a runtime" / the thesis section)
- The sub is now correct (environment tracks every agent's output; unit of work named and linked). One sharpening: end with line 2. Proposed final sub sentence: **"The prompt was the unit. Now the work is."**
- Cards: replace the four current cards with the three-part test + the scorekeeper. This is the single highest-impact change in V5, because the definition IS the thesis:
  - 01 **A definition of done**: "You can describe what finished and correct looks like." (stat: 1 / end state per action item)
  - 02 **A checkable result**: "The environment snapshots state before and after. Compare the two, the same check a manager makes." (stat: 2 / snapshots per unit)
  - 03 **One owner**: "Scoped small enough for a single agent to be accountable. Scope it like a contractor, not a utility meter." (stat: 1 / owner per unit)
  - 04 **A record it can't fake**: keep as is, it's already the scorekeeper card. (stat: 100% / of actions recorded)
- The current cards' content (place to act, memory, tools) doesn't disappear; place-to-act and tools ideas move down into How It Works step 01 and Integrations, where they already half-exist.

### Metrics ("Every token, every cent")
- Reframe from dashboard-numbers to THE CALCULATION. This is where the thesis becomes arithmetic:
  - H2: "Every token, every cent." → keep, it still works.
  - New framing line above the numbers: **"Did the state change? What did it cost? That's the whole calculation."**
  - The three metric slots become the three quantities: **Budget** (what the outcome is worth) · **AI spend** (what the model burned, on the model you bring) · **Efficiency** (the gap, yours to widen).
  - Sub-labels: "the price of the outcome" / "metered as it happens, BYOM" / "budget minus spend, per unit, per session".
- This kills the invented 54,396 / 806ms numbers problem too: Budget/Spend/Efficiency are concepts, not claims.

### The agent is not the work (Infrastructure slot)
- Already the thesis's second half. Add the closing line as the sub's final sentence: **"Agents are replaceable. The environment compounds."**

### Pricing
- Add one thesis line under "Pay only for Compute.": **"Tokens price the machinery. Units price the result. You pay for the compute in between."** (renders where a sub would go, or as the first bottom note)

### DNA closer (Developers slot) + CTA
- Keep. The DNA metaphor is now the emotional restatement of "the environment compounds". One tweak: the sub's list "memory, records, and a sharper definition of done" already lands; append **"run after run, the same unit gets cheaper."**

### Footer
- Tagline: "Workspaces for AI agents." → **"Hire the skill, not the hours."** The page opens and closes on the flag.

## Visualization plan for the next iteration

Ordered by thesis-impact per unit of effort:

1. **The Calculation panel (Metrics section).** Two side-by-side cards: left "State before → State after" with a diff-style visual (the manager's check), right a budget-vs-spend bar with the gap shaded lime and labeled "your efficiency". Replaces the decorative dot-graphs. This is the thesis drawn, not written. Effort: one component.
2. **Three-part test cards (Features section).** Render all four cards in a bento row so the definition is visible without hovering. Effort: unhide existing grid, new copy.
3. **Session-per-intent strip (How It Works).** Under step 03, a slim horizontal strip: three session chips (backlog · contracts · report), each with its own meter. Shows "per intent, not per token bill" at a glance. Effort: small.
4. **Product screenshots.** Still the missing proof layer (setup checklist in step 02, usage dashboard in Metrics). Blocked on exports from suraj. Effort: crop and drop.
5. **The unbundling diagram (future, maybe the blog).** The docs' "brain stays human / skill becomes runtime" split as a simple two-column visual. Belongs in a "Why XO" page or the journey system more than the landing.

## What V5 deliberately does NOT do

- No section reordering (V4 already settled the order; it's holding).
- No new sections (the thesis fits in existing slots).
- No settlement/billing-per-outcome claims beyond what the product does today (XO meters spend against outcomes; it does not yet invoice per unit; the copy stays on the right side of that line).

## Sequence

1. Copy pass: hero eyebrow + sub, features cards, metrics reframe, agent-not-work line, pricing line, footer tagline (one sitting, all text)
2. The Calculation panel component
3. Session strip
4. Screenshots when available
