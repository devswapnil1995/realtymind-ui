import { DecimalPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mortgage-calculator',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './mortgage-calculator.component.html',
  styleUrl: './mortgage-calculator.component.scss',
})
export class MortgageCalculatorComponent {
  loanAmount = signal(5000000); // ₹50L
  interestRate = signal(8.5);   // %
  tenureYears = signal(20);     // years

  monthlyRate = computed(() => this.interestRate() / 12 / 100);
  tenureMonths = computed(() => this.tenureYears() * 12);

  emi = computed(() => {
    const P = this.loanAmount();
    const r = this.monthlyRate();
    const n = this.tenureMonths();

    if (r === 0) return P / n;

    return P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  });

  totalPayable = computed(() => this.emi() * this.tenureMonths());
  totalInterest = computed(() => this.totalPayable() - this.loanAmount());
}
