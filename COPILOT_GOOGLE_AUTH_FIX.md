# 📘 `COPILOT_GOOGLE_AUTH_FIX.md`

## RealityMind — Google Authentication Fix (Minimal & Safe)

> ⚠️ Scope is **STRICTLY LIMITED**
> This document exists only to **fix Google login so users can enter the app**.
> Do **not** redesign auth.
> Do **not** refactor unrelated code.

---

## 0️⃣ OBJECTIVE (VERY CLEAR)

Fix Google login so that:

* User can log in with Google
* User is created on first login (if not exists)
* JWT is generated correctly
* Required claims exist
* Frontend stores token
* App guards allow entry

❌ No new auth system
❌ No new registration flow
❌ No major refactors

---

## 1️⃣ CURRENT ARCHITECTURE (DO NOT CHANGE)

### Backend

* ASP.NET Core API
* JWT authentication
* Roles already exist
* Guards depend on JWT claims

### Frontend

* Angular (standalone components)
* AuthGuard + LocationGuard already implemented
* Token stored in `localStorage`
* App reads JWT claims to decide routing

---

## 2️⃣ REQUIRED JWT CLAIMS (NON-NEGOTIABLE)

JWT **MUST ALWAYS INCLUDE**:

```txt
role
subscription_plan
is_active
email
sub
```

If **any is missing**, frontend guards will block entry.

❌ Do NOT rename claims
❌ Do NOT remove existing claims

---

## 3️⃣ BACKEND — GOOGLE LOGIN FIX (MINIMAL CHANGE)

### Endpoint (DO NOT CHANGE PATH)

```
POST /api/auth/google
```

---

### REQUIRED BEHAVIOR (ADD ONLY IF MISSING)

#### 1. Validate Google ID token

(Use existing Google validation logic — do not replace)

#### 2. Find user by email

```csharp
var user = Users.FirstOrDefault(x => x.Email == googleEmail);
```

#### 3. If user does NOT exist → create user

Defaults (DO NOT CHANGE):

```txt
Role = Buyer
SubscriptionPlan = Free
IsActive = true
AuthProvider = Google
```

⚠️ Do NOT allow role selection
⚠️ Do NOT create Admin or Agent here

---

#### 4. If user exists but IsActive = false

Return:

```http
403 Forbidden
```

---

#### 5. Generate JWT using EXISTING JWT service

But ensure these claims are included:

```csharp
role
subscription_plan
is_active
```

⚠️ If JWT generation already exists → **extend it**, do not replace it.

---

#### 6. Response format (DO NOT BREAK UI)

Backend must return:

```json
{
  "token": "<jwt>",
  "user": {
    "id": "<guid>",
    "email": "<email>",
    "role": "<Buyer|Agent|Admin>",
    "plan": "<Free|Pro>"
  }
}
```

❌ Do NOT rename fields
❌ Do NOT nest deeper

---

## 4️⃣ FRONTEND — GOOGLE LOGIN FIX (MINIMAL CHANGE)

### 4.1 Where Google login finishes

Locate existing Google login success handler.

DO NOT:

* Change Google SDK
* Change button
* Change OAuth provider

ONLY FIX WHAT HAPPENS **AFTER** success.

---

### 4.2 On successful backend response

Frontend MUST:

```ts
localStorage.setItem('token', response.token);
authService.setUserFromToken();
```

⚠️ If user info is already being set → keep it
⚠️ If token is already stored → verify it happens before routing

---

### 4.3 Decode token ON APP START

Ensure this happens in **app initialization**:

```ts
authService.setUserFromToken();
```

This ensures:

* Refresh works
* Guards pass
* Role & plan available immediately

❌ Do NOT fetch user again from backend
❌ Do NOT rely on memory-only state

---

### 4.4 Post-login routing (DO NOT REDESIGN)

Routing rule (already defined, just ensure it runs):

```ts
if (role === 'Admin')
  navigate('/dashboard/admin');
else
  navigate('/select-location');
```

❌ Do NOT route Buyer/Agent directly to dashboard
❌ LocationGuard must remain in control

---

## 5️⃣ WHAT NOT TO CHANGE (IMPORTANT)

❌ Do NOT add username/password auth
❌ Do NOT add registration page
❌ Do NOT add role selection UI
❌ Do NOT modify guards logic
❌ Do NOT rename claims
❌ Do NOT change route structure

---

## 6️⃣ HOW TO VERIFY FIX (MANDATORY SELF-TEST)

Copilot must verify:

### Backend

* First Google login creates user
* Second login reuses same user
* JWT contains required claims

### Frontend

* `localStorage.getItem('token')` exists
* Token decodes correctly
* Guards allow navigation
* Refresh keeps user logged in

---

## 7️⃣ FAILURE CONDITIONS (STOP IF ANY)

If any of the following is true:

* Token is missing claims
* User not created
* UI still blocked by guards
* Role is undefined
* Plan is undefined

👉 STOP and ASK — do NOT guess.

---

## 8️⃣ SUCCESS CRITERIA (FINAL)

Work is complete ONLY if:

* Google login works
* User enters application
* Buyer defaults to Free plan
* Admin login still works
* No other flows are broken

---

# ✅ END OF GOOGLE AUTH FIX INSTRUCTIONS
