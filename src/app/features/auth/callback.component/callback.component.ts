import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-oauth-callback',
  template: `<p>Signing you in...</p>`
})
export class OauthCallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // Prefer query param token; fallback to fragment (#token=...) to support backend redirects that avoid raw JSON in browser
    let token = this.route.snapshot.queryParamMap.get('token');
    if (!token && this.route.snapshot.fragment) {
      const params = new URLSearchParams(this.route.snapshot.fragment);
      token = params.get('token');
    }

    if (!token) {
      console.error('OAuth callback: no token in URL');
      this.router.navigate(['/login']);
      return;
    }

    // Token may be URL-encoded from backend redirect
    try {
      token = decodeURIComponent(token);
    } catch (e) {
      console.warn('Failed to URL-decode token, using as-is');
    }

    console.log('OAuth callback: received token, validating...');
    const valid = this.auth.setTokenFromJwt(token) && this.auth.setUserFromToken();

    if (!valid) {
      console.error('OAuth callback: token validation failed');
      this.router.navigate(['/login'], { queryParams: { error: 'invalid_token' } });
      return;
    }

    console.log('OAuth callback: token valid, routing user...');

    const role = this.auth.role();

    if (role === 3) {
      this.router.navigate(['/dashboard/admin']);
    } else {
      this.router.navigate(['/select-location']);
    }
  }
}
