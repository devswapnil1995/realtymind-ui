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
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const valid = this.auth.setTokenFromJwt(token) && this.auth.setUserFromToken();

    if (!valid) {
      this.router.navigate(['/login'], { queryParams: { error: 'invalid_token' } });
      return;
    }

    const role = this.auth.role();

    if (role === 3) {
      this.router.navigate(['/dashboard/admin']);
    } else {
      this.router.navigate(['/select-location']);
    }
  }
}
