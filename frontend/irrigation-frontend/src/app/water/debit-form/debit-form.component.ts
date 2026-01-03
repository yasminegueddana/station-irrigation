import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DebitMesure, DebitMesureService } from '../../core/services/debit-mesure.service';

@Component({
  selector: 'app-debit-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './debit-form.component.html',
  styleUrl: './debit-form.component.scss'
})
export class DebitFormComponent implements OnInit {
  debit: DebitMesure = {
    pompeId: 0,
    debit: 0,
    dateMesure: new Date().toISOString().slice(0, 16)
  };
  isEdit = false;

  constructor(
    private debitService: DebitMesureService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.debitService.getById(+id).subscribe({
        next: (data) => {
          this.debit = data;
          if (this.debit.dateMesure) {
            this.debit.dateMesure = this.debit.dateMesure.slice(0, 16);
          }
        },
        error: (err) => console.error('Error loading debit:', err)
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit && this.debit.id) {
      this.debitService.update(this.debit.id, this.debit).subscribe({
        next: () => this.goBack(),
        error: (err) => console.error('Error updating debit:', err)
      });
    } else {
      this.debitService.create(this.debit).subscribe({
        next: () => this.goBack(),
        error: (err) => console.error('Error creating debit:', err)
      });
    }
  }

  goBack(): void {
    if (this.debit.pompeId) {
      this.router.navigate(['/pompes', this.debit.pompeId, 'debits']);
    } else {
      this.router.navigate(['/pompes']);
    }
  }
}
