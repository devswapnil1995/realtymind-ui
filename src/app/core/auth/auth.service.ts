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
    subscription = signal<UserSubscription>({
        plan: 'Free',
        isActive: false
    });
    
    role = signal<'Buyer' | 'Agent' | 'Admin' | null>(null);
    isAuthenticated = computed(() => !!this.getToken());
    
    constructor(private http: HttpClient) {
        this.initializeFromStorage();
    }
    
    /**
     * Initialize auth state from localStorage on app startup
     */
    private initializeFromStorage(): void {
        const token = this.getToken();
        if (token) {
            const roleFromToken = this.extractRoleFromToken(token);
            if (roleFromToken) {
                this.role.set(roleFromToken);
            }
            // Load full profile from API
            this.loadProfile();
        }
    }
    
    /**
     * Extract role from JWT token with error handling
     */
    private extractRoleFromToken(token: string): 'Buyer' | 'Agent' | 'Admin' | null {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.role || null;
        } catch (error) {
            console.error('Failed to parse JWT token:', error);
            return null;
        }
    }
    
    /**
     * Load user profile and subscription from API
     */
    loadProfile() {
        this.http.get<any>(`${environment.apiBaseUrl}/api/me`)
            .subscribe({
                next: (user) => {
                    this.role.set(user.role);
                    if (user.subscription) {
                        this.subscription.set(user.subscription);
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
                this.role.set(res.user?.role || this.extractRoleFromToken(res.token));
            }));
    }

    /**
     * Register new user
     */
    register(email: string, password: string, role: string) {
        return this.http.post<any>(`${environment.apiBaseUrl}/api/auth/register`, { email, password, role })
            .pipe(tap(res => {
                this.setSession(res);
                this.role.set(res.user?.role || this.extractRoleFromToken(res.token));
            }));
    }

    /**
     * Set session tokens and user data
     */
    private setSession(res: any) {
        if (res.token) {
            localStorage.setItem(this.tokenKey, res.token);
        }
        if (res.user) {
            localStorage.setItem(this.userKey, JSON.stringify(res.user));
        }
    }

    /**
     * Logout and clear all session data
     */
    logout() {
        localStorage.clear();
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
        return this.isAuthenticated();
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

