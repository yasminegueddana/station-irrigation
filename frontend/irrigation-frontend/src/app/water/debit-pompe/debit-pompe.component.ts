import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DebitMesureService, DebitMesure } from '../../core/services/debit-mesure.service';

@Component({
  selector: 'app-debit-pompe',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, DatePipe, RouterLink],
  templateUrl: './debit-pompe.component.html',
  styleUrls: ['./debit-pompe.component.scss']
})
export class DebitPompeComponent {

  pompeId!: number;
  debits: DebitMesure[] = [];
  searchTerm = '';

  constructor(
    private route: ActivatedRoute,
    private debitService: DebitMesureService
  ) {
    this.pompeId = Number(this.route.snapshot.paramMap.get('id'));
    this.load();
  }

  load(): void {
    this.debitService.getByPompe(this.pompeId).subscribe({
      next: list => this.debits = list,
      error: err => console.error('Erreur chargement débits :', err)
    });
  }

  get filteredDebits(): DebitMesure[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.debits;
    return this.debits.filter(d =>
      String(d.debit).toLowerCase().includes(term) ||
      (d.unite && d.unite.toLowerCase().includes(term))
    );
  }

  onDelete(id?: number): void {
    if (!id) return;
    if (!confirm('Supprimer cette mesure de débit ?')) return;
    this.debitService.delete(id).subscribe(() => {
      this.debits = this.debits.filter(d => d.id !== id);
    });
  }
}
