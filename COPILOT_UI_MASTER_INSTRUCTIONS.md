# 📘 `COPILOT_UI_MASTER_INSTRUCTIONS.md`

## RealityMind — Complete UI Finalization Instructions (Authoritative)

> ⚠️ This file is the **single source of truth** for UI behavior, workflows, and feature gating.
> Copilot must **read this file fully before making changes**.

---

## 0️⃣ ROLE OF GITHUB COPILOT

You are acting as a **Senior Frontend Engineer** finishing a production SaaS UI.

### Your responsibilities:

* Validate existing UI functionality
* Improve UX, structure, and consistency
* Implement missing flows
* Enforce role & plan rules
* Ensure UI is **complete, safe, and production-ready**
* Best UI Design with all loaders wherever required(Common)

### Hard rules:

❌ Do NOT modify backend code
❌ Do NOT invent new business rules
❌ Do NOT remove working features
❌ Do NOT assume APIs that don’t exist

✔ Improve, refactor, harden UI where needed
✔ Add missing UI pieces
✔ Follow Angular best practices already used (standalone, signals, effects)

---

## 1️⃣ PRODUCT OVERVIEW (CONTEXT)

**RealityMind** is a real estate intelligence SaaS.

### User roles:

* **Buyer**
* **Agent**
* **Admin**

### Platforms:

* Angular (standalone components)
* Role-based dashboards
* Location-driven analytics

---

## 2️⃣ AUTHENTICATION & ENTRY FLOWS (MANDATORY)

### 2.1 Registration

* Buyer registration supported
* Agent registration (optional / future)
* Admin created internally

UI must:

* Validate email & password
* Show proper errors
* Redirect after success

---

### 2.2 Login (ALL ROLES)

After login:

* Read JWT claims (role, plan, isActive)
* Route user automatically

#### Login → Redirect Rules

| Role  | Redirect           |
| ----- | ------------------ |
| Buyer | `/select-location` |
| Agent | `/select-location` |
| Admin | `/dashboard/admin` |

❌ No manual navigation required
❌ No wrong dashboard flashes

---

## 3️⃣ LOCATION WORKFLOW (CRITICAL)

### Rules:

* Buyer & Agent **must select location**
* Admin location optional (defaults to `All`)
* No dashboard loads without required location

### UI Requirements:

* Dedicated `/select-location` page
* Google Places autocomplete
* Clear error if invalid selection
* Location always visible in dashboard header
* “Change location” button clears old data

---

## 4️⃣ DASHBOARD STRUCTURE (DO NOT MIX)

### Buyer Dashboard

Path: `/dashboard/buyer`

Contains:

* Market trends (basic)
* Pro-only analytics
* Upgrade CTAs

---

### Agent Dashboard

Path: `/dashboard/agent`

Contains:

* Area demand insights
* Market overview
* Agent-specific cards only

❌ Must NOT reuse Buyer widgets blindly

---

### Admin Dashboard

Path: `/dashboard/admin`

Contains:

* KPIs (users, subscriptions, cities)
* User management table
* Admin actions (with confirmation)

---

## 5️⃣ PLANS & FEATURE ENTITLEMENT (BUYER ONLY)

### Buyer Plans

* **Free**
* **Pro**

### Feature Matrix (AUTHORITATIVE)

| Feature               | Free | Pro |
| --------------------- | ---- | --- |
| Market trends (basic) | ✅    | ✅   |
| Price history chart   | ❌    | ✅   |
| Neighborhood score    | ❌    | ✅   |
| POI / livability      | ❌    | ✅   |
| Mortgage calculator   | ❌    | ✅   |
| Unlimited searches    | ❌    | ✅   |
| Save properties       | ❌    | ✅   |

---

## 6️⃣ FEATURE GATING — UI IMPLEMENTATION (MANDATORY)

### 6.1 Central Feature Check

Create or use **one reusable utility/service**:

```ts
hasFeature(featureKey: string): boolean
```

Must check:

* Role
* Plan

❌ No hardcoded checks inside components

---

### 6.2 Structural Directive (REQUIRED)

Use:

```html
*hasFeature="'NeighborhoodScore'"
```

Behavior:

* If not allowed → component NOT rendered

---

### 6.3 Upgrade CTA (REQUIRED)

Reusable component:

```html
<app-upgrade-cta
  title="Unlock Neighborhood Insights"
  description="Upgrade to Pro to access this feature">
</app-upgrade-cta>
```

Used wherever Pro-only features are blocked.

---

## 7️⃣ BUYER DASHBOARD — REQUIRED BEHAVIOR

### Always show:

* Location indicator
* Basic market trends

### Pro-only sections:

* Charts
* Neighborhood score
* Mortgage calculator
* POI data

### For Free users:

* Replace locked widgets with Upgrade CTA
* Never show broken/empty charts

---

## 8️⃣ AGENT DASHBOARD — MVP EXPECTATION

Agent dashboard must:

* Be functional but minimal
* Focus on market & demand
* Avoid Buyer plan logic entirely

If data missing:

* Show Empty State (not error)

---

## 9️⃣ ADMIN DASHBOARD — SAFETY RULES

### Admin actions:

* Change role
* Deactivate user
* Force downgrade

All must:

* Show confirmation popup
* Never execute silently

Admin UI must:

* Never show Buyer/Agent widgets
* Handle API failures gracefully

---

## 🔟 UX STATES (NON-NEGOTIABLE)

For every major screen:

| State          | UI                   |
| -------------- | -------------------- |
| Loading        | Skeleton             |
| Empty          | Friendly empty state |
| Error          | Error banner         |
| Feature locked | Upgrade CTA          |

❌ No blank screens
❌ No console-only errors

---

## 1️⃣1️⃣ UI QUALITY IMPROVEMENTS (EXPECTED)

Copilot should:

* Reduce duplication
* Improve component reuse
* Improve spacing & readability
* Ensure responsive behavior
* Improve microcopy if unclear
* Fix minor UX inconsistencies

But:
❌ Do NOT redesign UI drastically
❌ Do NOT introduce new design systems

---

## 1️⃣2️⃣ VALIDATION & SELF-TESTING (REQUIRED)

Before considering work complete, verify:

### Buyer

* Free vs Pro behavior clear
* Upgrade path visible
* No blocked API crashes UI

### Agent

* Agent-only workflow
* No Buyer features leaking

### Admin

* Full control
* Safe actions
* No confusion

---

## 1️⃣3️⃣ MISSING FUNCTIONALITY — IF FOUND

If UI functionality is missing (but implied by rules):

* Add it
* Keep it minimal
* Follow existing patterns
* Comment clearly what was added

---

## 1️⃣4️⃣ FUTURE API ALIGNMENT (IMPORTANT)

All UI feature keys, roles, and plans must be:

* Centralized
* Reusable
* Easy to mirror in backend

Do NOT hardcode strings randomly.

---

## 1️⃣5️⃣ IF ANYTHING IS UNCLEAR — STOP

If:

* Feature ownership is unclear
* Role behavior conflicts
* API data is missing

👉 STOP and ASK, do NOT assume.

---

# ✅ END OF MASTER UI INSTRUCTIONS