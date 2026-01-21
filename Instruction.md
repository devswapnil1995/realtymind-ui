RealityMind — UI Feature Gating & Workflow Wiring (Authoritative)
⚠️ READ CAREFULLY — DO NOT GUESS

You are working on UI-side only (Angular).
All logic must strictly follow the rules below.
If something is unclear, do not invent behavior.

1️⃣ OBJECTIVE

Implement role-based workflows and plan-based feature gating in the UI, based on the already existing Product Rules.

Scope:

Buyer dashboard

Agent dashboard (minimal MVP)

Admin dashboard (already exists)

Shared components (feature visibility, upgrade CTA)

❌ Do NOT touch backend
❌ Do NOT change APIs
❌ Do NOT invent new features

2️⃣ ROLES & DASHBOARDS (MANDATORY)
Roles:

Buyer

Agent

Admin

Dashboard routing:

Buyer → /dashboard/buyer

Agent → /dashboard/agent

Admin → /dashboard/admin

Rules:

Buyer must never see Agent/Admin UI

Agent must never see Buyer/Admin UI

Admin must never see Buyer/Agent UI

Implement UI guards / conditional rendering where needed.

3️⃣ PLANS (APPLY ONLY TO BUYERS)

Buyer plans:

Free

Pro

Agent plan:

Agent (no Free/Pro confusion)

Admin:

No plan, no limits

4️⃣ BUYER FEATURE GATING (CRITICAL)
Buyer Features Matrix
Feature	Free	Pro
Market trends (basic)	✅	✅
Price history chart	❌	✅
Neighborhood score	❌	✅
POI / livability	❌	✅
Mortgage calculator	❌	✅
Unlimited searches	❌	✅
Save properties	❌	✅
UI Rules for Locked Features

For Free users:

Hide Pro-only components OR

Show disabled state with Upgrade CTA

❌ Never show broken widgets
❌ Never show empty charts
❌ Never silently fail

5️⃣ REQUIRED UI ABSTRACTIONS (DO THIS CLEANLY)
A. Feature Check Utility (UI-side)

Create a single reusable feature-check method in UI (service or util):

hasFeature(featureKey: string): boolean


This must check:

User role

User plan

No feature logic should be duplicated in components.

B. Structural Directive (RECOMMENDED)

Create a directive like:

*hasFeature="'NeighborhoodScore'"


Behavior:

If feature is not allowed → element is not rendered

C. Upgrade CTA Component (MANDATORY)

Create a reusable component:

<app-upgrade-cta
  title="Unlock Neighborhood Insights"
  description="Upgrade to Pro to access this feature">
</app-upgrade-cta>


Use it wherever a Pro-only feature is blocked.

6️⃣ BUYER DASHBOARD — WHAT TO CHANGE
Buyer Dashboard MUST:

Always show:

Location selector

Basic market trends

Conditionally show (Pro-only):

Price history chart

Neighborhood score

Mortgage calculator

POI insights

For Free users:

Replace Pro widgets with Upgrade CTA

7️⃣ AGENT DASHBOARD — MVP ONLY (NO CLONE)

Agent dashboard should be minimal, not a copy of Buyer.

Allowed:

Market overview

Area demand summary

Agent-specific cards (even placeholder)

Not allowed:

Buyer widgets

Free/Pro logic

8️⃣ ADMIN DASHBOARD — DO NOT CHANGE SCOPE

Admin dashboard already exists.

UI must ensure:

Admin never sees Buyer/Agent widgets

Admin actions always require confirmation (already handled)

No new admin features required.

9️⃣ LOCATION UX (DO NOT BREAK)

Rules:

Buyer & Agent dashboards require location

Admin location is optional

If location changes:

Clear old dashboard data

Reload new data

Location must always be visible in header

🔟 UX STATES (MANDATORY)

For every dashboard:

Loading → Skeleton

No data → Empty state

Feature locked → Upgrade CTA

Error → Error banner

❌ No blank screens
❌ No console-only errors

1️⃣1️⃣ CODING RULES (VERY IMPORTANT)

Follow existing Angular patterns (signals, effects)

Do NOT refactor unrelated code

Do NOT rename APIs

Keep changes small and incremental

Prefer reuse over duplication

1️⃣2️⃣ SUCCESS CRITERIA

The work is complete only if:

Free Buyer clearly understands what is locked

Pro Buyer sees all Buyer features

Agent sees Agent workflow only

Admin sees Admin workflow only

No role confusion

No broken UI

1️⃣3️⃣ IF UNSURE — STOP

If any of the following happens:

You are unsure which role should see a feature

You need backend data that doesn’t exist

A rule seems contradictory

👉 STOP and ASK, do NOT assume.