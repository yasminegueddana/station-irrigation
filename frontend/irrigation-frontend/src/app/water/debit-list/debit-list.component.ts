import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DebitMesureService, DebitMesure } from '../../core/services/debit-mesure.service';

@Component({
  selector: 'app-debit-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, DatePipe, RouterLink],
  templateUrl: './debit-list.component.html',
  styleUrls: ['./debit-list.component.scss']
})
export class DebitListComponent implements OnInit {

  debits: DebitMesure[] = [];
  searchTerm = '';

  constructor(private debitService: DebitMesureService) { }

  ngOnInit(): void {
    this.debitService.getAll().subscribe(list => this.debits = list);
  }

  get filteredDebits(): DebitMesure[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.debits;
    return this.debits.filter(d =>
      String(d.pompeId).includes(term) ||
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
