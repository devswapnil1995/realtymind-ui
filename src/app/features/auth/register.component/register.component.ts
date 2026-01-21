import { Component, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  role = signal('Buyer');
  error = signal('');
  success = signal('');
  loading = signal(false);
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  agreedToTerms = signal(false);

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    const emailValue = this.email();
    const passwordValue = this.password();
    const confirmPasswordValue = this.confirmPassword();
    const roleValue = this.role();

    this.error.set('');
    this.success.set('');

    // Validation
    if (!emailValue || !passwordValue || !confirmPasswordValue) {
      this.error.set('All fields are required');
      return;
    }

    if (!this.isValidEmail(emailValue)) {
      this.error.set('Please enter a valid email address');
      return;
    }

    if (passwordValue.length < 8) {
      this.error.set('Password must be at least 8 characters');
      return;
    }

    if (passwordValue !== confirmPasswordValue) {
      this.error.set('Passwords do not match');
      return;
    }

    if (!this.agreedToTerms()) {
      this.error.set('You must agree to the terms and conditions');
      return;
    }

    this.loading.set(true);
    this.auth.register(emailValue, passwordValue, roleValue).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.success.set('Registration successful! Redirecting...');
        setTimeout(() => {
          // Navigate to role-specific dashboard
          const role = res.user?.role || this.auth.role();
          
          switch (role) {
            case 1: // Buyer
              this.router.navigate(['/dashboard/buyer']);
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
        }, 1500);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.message || 'Registration failed. Please try again.');
      },
    });
  }

  togglePasswordVisibility() {
    this.showPassword.update((val) => !val);
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword.update((val) => !val);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getPasswordStrength() {
    const password = this.password();
    if (!password) return 'none';

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);

    const strength = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

    if (strength <= 2) return 'weak';
    if (strength === 3) return 'medium';
    return 'strong';
  }
}

