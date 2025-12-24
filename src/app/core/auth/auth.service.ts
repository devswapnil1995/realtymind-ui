import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private tokenKey = 'rm_token';
    private userKey = 'rm_user';

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiBaseUrl}/api/auth/login`, { email, password })
            .pipe(tap(res => this.setSession(res)));
    }

    register(email: string, password: string, role: string) {
        return this.http.post<any>(`${environment.apiBaseUrl}/api/auth/register`, { email, password, role })
            .pipe(tap(res => this.setSession(res)));
    }

    loadMe() {
        return this.http.get<any>(`${environment.apiBaseUrl}/api/auth/me`)
            .pipe(tap(user => localStorage.setItem(this.userKey, JSON.stringify(user))));
    }

    private setSession(res: any) {
        localStorage.setItem(this.tokenKey, res.token);
        localStorage.setItem(this.userKey, JSON.stringify(res.user));
    }

    logout() {
        localStorage.clear();
    }

    // get role(): string | null {
    //     const u = localStorage.getItem(this.userKey);
    //     return u ? JSON.parse(u).role : null;
    // }

    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }

    setToken(token: string) {
        localStorage.setItem(this.tokenKey, token);
    }


    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    get role(): string {
        const token = localStorage.getItem('token');
        if (!token) return '';

        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role;
    }
}

