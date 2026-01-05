# 🔧 RealtyMind - Developer Quick Reference

## 🔐 Authentication Flow

### Login Process
```typescript
// Component
this.auth.login(email, password).subscribe({
  next: () => this.router.navigate(['/dashboard']),
  error: (err) => this.error.set(err.userMessage)
});

// What happens:
// 1. POST to /api/auth/login
// 2. Token stored as 'rm_token' in localStorage
// 3. Role extracted and stored in signal
// 4. Auto-redirect to dashboard
```

### Check Authentication
```typescript
// Using service
const auth = inject(AuthService);

// Method 1: Computed signal
if (auth.isAuthenticated()) { ... }

// Method 2: Direct
if (auth.isLoggedIn()) { ... }

// Get current role
const userRole = auth.role();  // Returns: 'Buyer' | 'Agent' | 'Admin' | null
```

### Logout
```typescript
this.auth.logout();  // Clears all localStorage + resets signals
```

---

## 🛡️ Guards Usage

### Protect Routes
```typescript
// Require authentication
{ 
  path: 'properties', 
  canActivate: [authGuard],
  component: ... 
}

// Require admin role
{ 
  path: 'admin', 
  canActivate: [authGuard, adminGuard],  // Both required!
  component: ... 
}
```

### Available Guards
- `authGuard` - Requires valid token
- `adminGuard` - Requires Admin role (also needs authGuard)

---

## 🎯 Signals & State

### Using AuthService Signals
```typescript
const auth = inject(AuthService);

// Reactive role checking
const userRole = auth.role();

// Subscription status
const subscription = auth.subscription();

// In template
@if (auth.role() === 'Admin') {
  <button>Admin Panel</button>
}
```

### Location State
```typescript
const locationState = inject(LocationStateService);

// Get current location
const location = locationState.location();

// Update location
locationState.setLocation({
  address: '123 Main St, Mumbai',
  lat: 19.0760,
  lng: 72.8777,
  city: 'Mumbai',
  locality: 'Andheri'
});

// Clear
locationState.clear();
```

---

## 🌐 API Calls

### Using ApiService
```typescript
const api = inject(ApiService);

// GET
api.get<UserDto[]>('/api/admin/users')
  .subscribe(users => { ... });

// POST
api.post('/api/properties/search', { city: 'Mumbai' })
  .subscribe(results => { ... });

// PUT
api.put(`/api/admin/users/${id}/role`, { role: 'Agent' })
  .subscribe();
```

### Specialized APIs
```typescript
// Market data
const marketApi = inject(MarketApi);
marketApi.getTrend(city, locality).subscribe(...);
marketApi.getAnalytics(city, locality).subscribe(...);

// Neighborhood info
const neighborhoodApi = inject(NeighborhoodApi);
neighborhoodApi.getScore(lat, lng).subscribe(...);

// Billing
const billingApi = inject(BillingApi);
billingApi.createCheckout('pro').subscribe(...);
```

### Error Handling
All API calls automatically go through the error interceptor:
```typescript
api.get('/api/data').subscribe({
  next: (data) => { ... },
  error: (err) => {
    // err.userMessage contains user-friendly message
    this.error.set(err.userMessage);
  }
});
```

---

## 📝 Modern Template Syntax

### Control Flow
```html
<!-- Conditional rendering -->
@if (isLoading) {
  <app-skeleton />
} @else if (error()) {
  <ui-error [message]="error()" />
} @else {
  <div>{{ data() }}</div>
}

<!-- Loops -->
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}

<!-- Empty state -->
@if (items.length === 0) {
  <p>No items found</p>
}
```

### Switch Case
```html
@switch (userRole()) {
  @case ('Admin') {
    <admin-panel />
  }
  @case ('Agent') {
    <agent-dashboard />
  }
  @default {
    <buyer-dashboard />
  }
}
```

---

## 🎨 UI Components

### Card Component
```html
<ui-card>
  <h3>Title</h3>
  <p>Content here</p>
</ui-card>
```

### Error Banner
```html
<ui-error [message]="errorMessage()" />
```

### Empty State
```html
<ui-empty-state 
  icon="📭"
  title="No properties found"
  message="Try adjusting your filters">
</ui-empty-state>
```

### Skeleton Loader
```html
@if (loading()) {
  <ui-skeleton />
} @else {
  <div>{{ data() }}</div>
}
```

---

## 🔄 Common Patterns

### Component with API Call
```typescript
@Component({
  selector: 'app-example',
  imports: [SkeletonComponent, ErrorBannerComponent],
  template: `
    @if (loading()) {
      <ui-skeleton />
    } @else if (error()) {
      <ui-error [message]="error()" />
    } @else {
      <div>{{ data() }}</div>
    }
  `
})
export class ExampleComponent implements OnInit {
  private api = inject(ApiService);
  
  data = signal<any>(null);
  loading = signal(false);
  error = signal('');
  
  ngOnInit() {
    this.loading.set(true);
    this.api.get('/api/data').subscribe({
      next: (result) => {
        this.data.set(result);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.userMessage);
        this.loading.set(false);
      }
    });
  }
}
```

### Role-Based Feature Access
```typescript
@Component({
  template: `
    @if (canAccessFeature()) {
      <advanced-features />
    } @else {
      <upgrade-prompt />
    }
  `
})
export class DashboardComponent {
  private auth = inject(AuthService);
  
  canAccessFeature = computed(() => {
    const sub = this.auth.subscription();
    return sub.isActive && sub.plan !== 'Free';
  });
}
```

### Reactive Location Tracking
```typescript
export class PropertySearchComponent {
  private locationState = inject(LocationStateService);
  
  constructor() {
    effect(() => {
      const loc = this.locationState.location();
      if (loc) {
        this.searchProperties(loc);
      }
    });
  }
}
```

---

## ⚠️ Common Pitfalls

### ❌ DON'T
```typescript
// Don't use wrong token key
localStorage.getItem('token')  // ❌ WRONG

// Don't use CommonModule unnecessarily
imports: [CommonModule]  // ❌ Not needed with @if/@for

// Don't forget error handling
api.get('/data').subscribe(data => {
  this.data.set(data);
});  // ❌ No error handling

// Don't use old syntax
<div *ngIf="condition">  // ❌ Legacy syntax
```

### ✅ DO
```typescript
// Use correct token key
localStorage.getItem('rm_token')  // ✅ CORRECT

// Import only what you need
imports: [FormsModule, SpecificPipe]  // ✅ Explicit

// Always handle errors
api.get('/data').subscribe({
  next: (data) => this.data.set(data),
  error: (err) => this.error.set(err.userMessage)
});  // ✅ Proper error handling

// Use modern syntax
@if (condition) {  // ✅ Modern
  <div>Content</div>
}
```

---

## 🐛 Debugging Tips

### Authentication Issues
```typescript
// Check token exists
console.log(localStorage.getItem('rm_token'));

// Check role
console.log(inject(AuthService).role());

// Verify token is valid JWT
const token = localStorage.getItem('rm_token');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log(payload);
```

### Route Not Loading
1. Check guard is passing
2. Verify component path is correct
3. Check console for lazy loading errors
4. Verify module imports

### API Errors
- Check Network tab in DevTools
- Verify token is being sent (Authorization header)
- Check error interceptor logs
- Verify API base URL in environment

---

## 📦 Environment Configuration

### Development
```typescript
// src/environment/environment.ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:5000',
  googleMapsApiKey: 'YOUR_KEY_HERE'
};
```

### Production
```typescript
// src/environment/environment.prod.ts
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.realtymind.com',
  googleMapsApiKey: 'PROD_KEY_HERE'
};
```

---

## 🚀 Build & Deploy

### Development
```bash
npm start
# Runs on http://localhost:4200
```

### Production Build
```bash
npm run build
# Output: dist/realtymind-ui
```

### Testing
```bash
npm test
```

---

## 📖 File Structure Reference

```
src/app/
├── core/                    # Core services (singleton)
│   ├── auth/               # Authentication
│   │   ├── auth.service.ts
│   │   ├── auth.guard.ts
│   │   ├── admin.guard.ts
│   │   └── *.interceptor.ts
│   ├── api/                # API services
│   ├── layout/             # Layout components
│   └── state/              # State management
│
├── features/               # Feature modules
│   ├── auth/              # Login, register
│   ├── dashboard/         # Dashboards
│   ├── property/          # Property features
│   ├── billing/           # Subscription
│   └── admin/             # Admin panel
│
├── shared/                # Shared components
│   ├── components/        # Smart components
│   └── ui/                # Dumb components
│
└── models/                # TypeScript interfaces
```

---

## 🔗 Important Links

- [Full Refactoring Report](./MVP_REFACTORING_REPORT.md)
- [Angular Control Flow Docs](https://angular.dev/guide/templates/control-flow)
- [Angular Signals Guide](https://angular.dev/guide/signals)

---

**Last Updated:** January 5, 2026  
**Status:** Production Ready ✅
