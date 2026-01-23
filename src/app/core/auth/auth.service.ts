import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../../environment/environment';
import { UserSubscription } from '../../models/user-subscription';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly tokenKey = 'rm_token';
    private readonly userKey = 'rm_user';
    
    // Reactive state using signals
    token = signal<string | null>(this.getToken());
    subscription = signal<UserSubscription>({
        plan: 'Free',
        isActive: false
    });
    
    role = signal<number | null>(null);
    isAuthenticated = computed(() => !!this.token());
    
    constructor(private http: HttpClient) {
        this.initializeFromStorage();
    }
    
    /**
     * Initialize auth state from localStorage on app startup
     */
    private initializeFromStorage(): void {
        const token = this.getToken();
        if (token) {
            const valid = this.setUserFromToken();
            if (!valid) {
                this.clearSession();
            }
        }
    }
    
    /**
     * Validate JWT and required claims. Returns payload when valid, null otherwise.
     */
    private decodeJwt(token: string): any | null {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload;
        } catch (error) {
            console.error('Failed to parse JWT token:', error);
            return null;
        }
    }

    /**
     * Sets token, validates required claims, and loads profile. Returns false when invalid.
     */
    setTokenFromJwt(token: string): boolean {
        const payload = this.decodeJwt(token);
        if (!payload) return false;

        // Required claims: role must exist; optionally ensure not expired
        if (!payload.role) {
            console.warn('JWT missing required claim: role');
            return false;
        }

        if (payload.exp && Date.now() / 1000 > payload.exp) {
            console.warn('JWT expired');
            return false;
        }

        localStorage.setItem(this.tokenKey, token);
        this.token.set(token);

        const roleClaim = this.getRoleFromPayload(payload);
        const normalizedRole = this.normalizeRole(roleClaim);
        if (!normalizedRole) {
            console.warn('JWT missing usable role claim', payload);
            return false;
        }
        this.role.set(normalizedRole);

        // map subscription from claim if present
        if (payload?.subscription_plan) {
            this.subscription.set({ plan: payload.subscription_plan, isActive: !!payload.is_active });
        }
        this.setUserFromPayload(payload, normalizedRole);
        return true;
    }

    /** Decode stored token and set state; returns false if invalid/missing claims */
    setUserFromToken(): boolean {
        const token = this.getToken();
        if (!token) return false;
        const payload = this.decodeJwt(token);
        if (!payload) return false;

        const roleClaim = this.getRoleFromPayload(payload);
        const normalizedRole = this.normalizeRole(roleClaim);
        if (!normalizedRole) {
            console.warn('JWT missing usable role claim', payload);
            return false;
        }

        this.token.set(token);
        this.role.set(normalizedRole);

        if (payload?.subscription_plan) {
            this.subscription.set({ plan: payload.subscription_plan, isActive: !!payload.is_active });
        }
        this.setUserFromPayload(payload, normalizedRole);
        return true;
    }

    /** Extract role claim from common JWT claim keys */
    private getRoleFromPayload(payload: any): any {
        if (!payload) return null;
        if (payload.role !== undefined) return payload.role;
        if (payload.roles !== undefined) return Array.isArray(payload.roles) ? payload.roles[0] : payload.roles;
        // Common Microsoft/JWT claim URIs
        const msRole = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        if (msRole !== undefined) return msRole;
        const msRoleAlt = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role'];
        if (msRoleAlt !== undefined) return msRoleAlt;
        return null;
    }

    /** Normalize role claim into number (1 buyer, 2 agent, 3 admin) */
    private normalizeRole(roleClaim: any): number | null {
        if (typeof roleClaim === 'number') return roleClaim;
        if (typeof roleClaim === 'string') {
            const lower = roleClaim.toLowerCase();
            if (lower.includes('buyer')) return 1;
            if (lower.includes('agent')) return 2;
            if (lower.includes('admin')) return 3;
            const parsed = Number(roleClaim);
            if (!Number.isNaN(parsed)) return parsed;
        }
        return null;
    }

    /** Persist rm_user from JWT payload when backend does not return user object (e.g., Google login) */
    private setUserFromPayload(payload: any, normalizedRole: number) {
        if (!payload) return;
        const user = {
            id: payload.sub || null,
            email: payload.email || null,
            role: normalizedRole,
            plan: payload.subscription_plan || this.subscription().plan || 'Free',
        };
        localStorage.setItem(this.userKey, JSON.stringify(user));
    }
    
    /**
     * Load user profile and subscription from API
     */
    loadProfile() {
        this.http.get<any>(`${environment.apiBaseUrl}/api/auth/me`)
            .subscribe({
                next: (user) => {
                    if (user?.role != null) {
                        this.role.set(this.normalizeRole(user.role));
                    }
                    if (user?.subscription) {
                        this.subscription.set(user.subscription);
                    } else if (user?.plan) {
                        this.subscription.set({ plan: user.plan, isActive: true });
                    }
                },
                error: (err) => console.error('Failed to load profile:', err)
            });
    }
    
    /**
     * Login user and establish session
     */
    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiBaseUrl}/api/auth/login`, { email, password })
            .pipe(tap(res => {
                this.setSession(res);
                const payload = this.decodeJwt(res.token);
                const roleClaim = this.normalizeRole(res.user?.role) || this.normalizeRole(this.getRoleFromPayload(payload));
                this.role.set(roleClaim);
                if (payload?.subscription_plan) {
                    this.subscription.set({ plan: payload.subscription_plan, isActive: !!payload.is_active });
                }
                
                // Set subscription if available in response
                if (res.user?.subscription) {
                    this.subscription.set(res.user.subscription);
                }
            }));
    }

    /**
     * Register new user
     */
    register(email: string, password: string, role: string) {
        return this.http.post<any>(`${environment.apiBaseUrl}/api/auth/register`, { email, password, role })
            .pipe(tap(res => {
                this.setSession(res);
                const payload = this.decodeJwt(res.token);
                const roleClaim = this.normalizeRole(res.user?.role) || this.normalizeRole(this.getRoleFromPayload(payload));
                this.role.set(roleClaim);
                if (payload?.subscription_plan) {
                    this.subscription.set({ plan: payload.subscription_plan, isActive: !!payload.is_active });
                }
                
                // Set subscription if available in response
                if (res.user?.subscription) {
                    this.subscription.set(res.user.subscription);
                }
            }));
    }

    /**
     * Set session tokens and user data
     */
    private setSession(res: any) {
        if (res.token) {
            localStorage.setItem(this.tokenKey, res.token);
            this.token.set(res.token);
        }
        if (res.user) {
            localStorage.setItem(this.userKey, JSON.stringify(res.user));
        }
    }

    /**
     * Logout and clear all session data
     */
    logout() {
        this.clearSession();
    }

    private clearSession() {
        localStorage.clear();
        this.token.set(null);
        this.role.set(null);
        this.subscription.set({ plan: 'Free', isActive: false });
    }

    /**
     * Get stored JWT token
     */
    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    /**
     * Check if user is logged in
     */
    isLoggedIn(): boolean {
        return !!this.token();
    }

    /**
     * Load subscription details
     */
    loadSubscription() {
        this.http.get<UserSubscription>(`${environment.apiBaseUrl}/api/me/subscription`)
            .subscribe({
                next: (sub) => this.subscription.set(sub),
                error: (err) => console.error('Failed to load subscription:', err)
            });
    }
}

