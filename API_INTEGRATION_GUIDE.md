# 🔌 API Integration Validation Guide

## 🎯 Purpose
This document outlines all API endpoints used by the RealtyMind Angular frontend and what needs to be validated with the backend team.

---

## 🔐 Authentication Endpoints

### POST `/api/auth/login`
**Request:**
```typescript
{
  email: string;
  password: string;
}
```

**Expected Response:**
```typescript
{
  token: string;         // JWT token
  user: {
    id: string;
    email: string;
    role: 'Buyer' | 'Agent' | 'Admin';
    // ... other user fields
  }
}
```

**Error Cases:**
- `401` - Invalid credentials
- `429` - Rate limit exceeded
- `500` - Server error

**Frontend Usage:** [LoginComponent](src/app/features/auth/login.component/login.component.ts)

---

### POST `/api/auth/register`
**Request:**
```typescript
{
  email: string;
  password: string;
  role: string;  // 'Buyer' | 'Agent'
}
```

**Expected Response:**
```typescript
{
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  }
}
```

**Error Cases:**
- `400` - Validation error (weak password, invalid email)
- `409` - Email already exists
- `500` - Server error

**Frontend Usage:** [RegisterComponent](src/app/features/auth/register.component/register.component.ts)

---

### GET `/api/auth/oauth/google`
**Description:** Initiates Google OAuth flow

**Expected Behavior:**
- Redirects to Google OAuth consent screen
- On success, redirects to `/auth/callback?token=<jwt>`
- Frontend extracts token from query params

**Frontend Usage:** [LoginComponent](src/app/features/auth/login.component/login.component.ts) - `loginWithGoogle()`

---

## 👤 User Profile Endpoints

### GET `/api/me`
**Headers:** `Authorization: Bearer <token>`

**Expected Response:**
```typescript
{
  id: string;
  email: string;
  role: 'Buyer' | 'Agent' | 'Admin';
  subscription: {
    plan: 'Free' | 'Pro' | 'Agent';
    isActive: boolean;
  }
}
```

**Error Cases:**
- `401` - Invalid/expired token
- `500` - Server error

**Frontend Usage:** [AuthService](src/app/core/auth/auth.service.ts) - `loadProfile()`

---

### GET `/api/me/subscription`
**Headers:** `Authorization: Bearer <token>`

**Expected Response:**
```typescript
{
  plan: 'Free' | 'Pro' | 'Agent';
  isActive: boolean;
  expiresAt?: string;  // ISO date
}
```

**Frontend Usage:** [AuthService](src/app/core/auth/auth.service.ts) - `loadSubscription()`

---

## 🏠 Property Endpoints

### GET `/api/properties/search`
**Query Params:**
- `city?: string`
- `locality?: string`
- `minPrice?: number`
- `maxPrice?: number`
- `bhk?: number`

**Expected Response:**
```typescript
{
  results: [
    {
      id: string;
      address: string;
      city: string;
      locality: string;
      price: number;
      bhk: number;
      sqft: number;
      // ... other property fields
    }
  ]
}
```

**Frontend Usage:** [PropertySearchComponent](src/app/features/property/property-search.component/property-search.component.ts)

---

### GET `/api/properties/:id`
**Path Params:** `id` - Property ID

**Expected Response:**
```typescript
{
  id: string;
  address: string;
  city: string;
  locality: string;
  price: number;
  bhk: number;
  sqft: number;
  description: string;
  amenities: string[];
  images: string[];
  // ... other details
}
```

**Frontend Usage:** [PropertyDetailsComponent](src/app/features/property/property-details.component/property-details.component.ts)

---

## 📊 Market Analytics Endpoints

### GET `/api/market/trend`
**Query Params:**
- `city: string`
- `locality: string`

**Expected Response:**
```typescript
{
  city: string;
  locality: string;
  points: [
    {
      period: string;  // e.g., "2024-Q1"
      avgPricePerSqFt: number;
    }
  ]
}
```

**Frontend Usage:** 
- [Dashboard](src/app/features/dashboard/dashboard.ts)
- [BuyerDashboardComponent](src/app/features/dashboard/buyer-dashboard.component/buyer-dashboard.component.ts)

---

### GET `/api/market/analytics`
**Query Params:**
- `city: string`
- `locality: string`

**Expected Response:**
```typescript
{
  city: string;
  locality: string;
  avgPricePerSqFt: number;
  medianPrice: number;
  growthRate: number;  // Percentage
  inventory: number;
  demandScore: number;  // 1-10
}
```

**Frontend Usage:** [BuyerDashboardComponent](src/app/features/dashboard/buyer-dashboard.component/buyer-dashboard.component.ts)

---

## 🏘️ Neighborhood Endpoints

### GET `/api/neighborhood/score`
**Query Params:**
- `lat: number`
- `lng: number`

**Expected Response:**
```typescript
{
  overallScore: number;  // 1-10
  breakdown: {
    safety: number;
    schools: number;
    transit: number;
    amenities: number;
  };
  pois: [
    {
      name: string;
      type: string;  // 'school', 'hospital', 'park', etc.
      distance: number;  // in meters
    }
  ]
}
```

**Frontend Usage:** 
- [Dashboard](src/app/features/dashboard/dashboard.ts)
- [BuyerDashboardComponent](src/app/features/dashboard/buyer-dashboard.component/buyer-dashboard.component.ts)

---

## 💰 Billing Endpoints

### POST `/api/billing/checkout`
**Headers:** `Authorization: Bearer <token>`

**Request:**
```typescript
{
  plan: 'pro' | 'agent';
}
```

**Expected Response:**
```typescript
{
  checkoutUrl: string;  // Stripe checkout URL
}
```

**Error Cases:**
- `401` - Not authenticated
- `400` - Invalid plan
- `500` - Payment provider error

**Frontend Usage:** [PricingComponent](src/app/features/billing/pricing.component/pricing.component.ts)

---

### GET `/api/billing/success`
**Query Params:**
- `session_id: string` (from Stripe redirect)

**Expected Behavior:**
- Updates user subscription in database
- Returns success message

**Frontend Usage:** [BillingSuccessComponent](src/app/features/billing/billing-success.component/billing-success.component.ts)

---

## 👨‍💼 Admin Endpoints

### GET `/api/admin/users`
**Headers:** `Authorization: Bearer <token>`  
**Requires:** Admin role

**Expected Response:**
```typescript
[
  {
    id: string;
    email: string;
    role: 'Buyer' | 'Agent' | 'Admin';
    subscriptionPlan: 'Free' | 'Pro' | 'Agent';
    isActive: boolean;
    createdAt: string;  // ISO date
  }
]
```

**Error Cases:**
- `401` - Not authenticated
- `403` - Not admin
- `500` - Server error

**Frontend Usage:** [AdminUsersComponent](src/app/features/admin/admin-users.component/admin-users.component.ts)

---

### PUT `/api/admin/users/:id/role`
**Headers:** `Authorization: Bearer <token>`  
**Requires:** Admin role

**Request:**
```typescript
{
  role: 'Buyer' | 'Agent' | 'Admin';
}
```

**Expected Response:**
```typescript
{
  success: true;
}
```

**Frontend Usage:** [AdminUsersComponent](src/app/features/admin/admin-users.component/admin-users.component.ts) - `changeRole()`

---

### PUT `/api/admin/users/:id/status`
**Headers:** `Authorization: Bearer <token>`  
**Requires:** Admin role

**Request:**
```typescript
{
  isActive: boolean;
}
```

**Expected Response:**
```typescript
{
  success: true;
}
```

**Frontend Usage:** [AdminUsersComponent](src/app/features/admin/admin-users.component/admin-users.component.ts) - `toggleActive()`

---

## 📈 Usage Tracking Endpoints

### GET `/api/usage/today`
**Headers:** `Authorization: Bearer <token>`

**Expected Response:**
```typescript
[
  {
    feature: string;  // 'propertySearch', 'marketAnalytics', etc.
    used: number;
    limit: number;
  }
]
```

**Frontend Usage:** [UsagePanelComponent](src/app/shared/components/usage-panel.component/usage-panel.component.ts)

---

## 🔍 Validation Checklist

### For Each Endpoint:
- [ ] Endpoint exists and is accessible
- [ ] Request format matches frontend expectation
- [ ] Response format matches TypeScript interfaces
- [ ] Error codes match documented cases
- [ ] JWT token validation works
- [ ] Role-based access control enforced
- [ ] Rate limiting configured
- [ ] CORS headers set correctly

### Critical Tests:
- [ ] Login with valid credentials succeeds
- [ ] Login with invalid credentials returns 401
- [ ] Registration with new email succeeds
- [ ] Registration with existing email returns 409
- [ ] Protected endpoints require token
- [ ] Admin endpoints reject non-admin users
- [ ] Token expiration handled (401 response)
- [ ] Subscription upgrade creates checkout session
- [ ] Usage limits enforced per plan

---

## 🐛 Common Integration Issues

### Issue: 401 on all requests
**Possible Causes:**
- Token not being sent (check auth interceptor)
- Token format incorrect (should be `Bearer <token>`)
- Backend expecting different token key
- Token expired

**Debug:**
```typescript
// Check token is stored
console.log(localStorage.getItem('rm_token'));

// Check token is sent
// (Look in Network tab → Headers → Authorization)
```

---

### Issue: 403 on admin endpoints
**Possible Causes:**
- User role not 'Admin'
- JWT claims don't include role
- Backend role check logic differs

**Debug:**
```typescript
// Check role in token
const token = localStorage.getItem('rm_token');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log(payload.role);

// Check role in service
console.log(inject(AuthService).role());
```

---

### Issue: CORS errors
**Possible Causes:**
- Backend not configured for frontend origin
- Missing CORS headers
- Preflight requests failing

**Solution:**
Backend needs to allow:
- Origin: `https://your-frontend-domain.com`
- Methods: `GET, POST, PUT, DELETE, OPTIONS`
- Headers: `Authorization, Content-Type`
- Credentials: `true` (if using cookies)

---

### Issue: DTOs don't match
**Symptom:** Properties undefined or type errors

**Solution:**
1. Log actual API response
2. Update TypeScript interfaces
3. Add data transformation if needed

```typescript
// Log response to inspect
api.get('/api/data').subscribe(res => {
  console.log('API Response:', res);
  // Check structure matches interface
});
```

---

## 📝 Testing Script

### Manual Testing
```bash
# Test login
curl -X POST https://api.realtymind.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Test protected endpoint
curl -X GET https://api.realtymind.com/api/me \
  -H "Authorization: Bearer <your-token>"

# Test admin endpoint
curl -X GET https://api.realtymind.com/api/admin/users \
  -H "Authorization: Bearer <admin-token>"
```

### Automated Testing (Postman Collection)
Create a Postman collection with:
- All authentication flows
- All protected endpoints
- All error scenarios
- Share with team

---

## 🔄 Continuous Validation

### During Development
- Test new endpoints immediately after backend implementation
- Update interfaces if response format changes
- Document any deviations from expected format

### Before Deployment
- Run full integration test suite
- Verify all critical paths
- Test error scenarios
- Validate token handling

---

## 📞 Contact Points

### Backend Team
- API Lead: [Name/Contact]
- Authentication Owner: [Name/Contact]
- Billing Integration: [Name/Contact]

### Frontend Team
- Lead Developer: [Name/Contact]
- Integration Owner: [Name/Contact]

---

**Last Updated:** January 5, 2026  
**Status:** Requires Backend Validation  
**Priority:** High - Must validate before production deployment
