import { Component, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environment/environment';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  error = signal('');
  loading = signal(false);
  showPassword = signal(false);

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    const emailValue = this.email();
    const passwordValue = this.password();

    this.error.set('');

    // Validation
    if (!emailValue || !passwordValue) {
      this.error.set('Email and password are required');
      return;
    }

    if (!this.isValidEmail(emailValue)) {
      this.error.set('Please enter a valid email address');
      return;
    }

    if (passwordValue.length < 6) {
      this.error.set('Password must be at least 6 characters');
      return;
    }

    this.loading.set(true);
    this.auth.login(emailValue, passwordValue).subscribe({
      next: (res) => {
        this.loading.set(false);
        
        // Navigate to role-specific dashboard
        const role = res.user?.role || this.auth.role();
        
        switch (role) {
          case 1: // Buyer
            this.router.navigate(['/market/austin']);
            break;
          case 2: // Agent
            this.router.navigate(['/dashboard/agent']);
            break;
          case 3: // Admin
            this.router.navigate(['/admin/analytics']);
            break;
          default:
            this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Login failed. Please try again.');
      },
    });
  }

  loginWithGoogle() {
    window.location.href = `${environment.apiBaseUrl}/api/auth/oauth/google`;
  }

  togglePasswordVisibility() {
    this.showPassword.update((val) => !val);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

