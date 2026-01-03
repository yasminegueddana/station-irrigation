import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReservoirService, Reservoir } from '../../core/services/reservoir.service';

@Component({
  selector: 'app-reservoir-list',
  standalone: true,
  imports: [NgFor, FormsModule, RouterLink],
  templateUrl: './reservoir-list.component.html',
  styleUrls: ['./reservoir-list.component.scss']
})
export class ReservoirListComponent implements OnInit {

  reservoirs: Reservoir[] = [];
  searchTerm = '';

  constructor(private reservoirService: ReservoirService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.reservoirService.getAll().subscribe(data => {
      this.reservoirs = data;
    });
  }

  get filteredReservoirs(): Reservoir[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.reservoirs;
    return this.reservoirs.filter(r =>
      (r.nom && r.nom.toLowerCase().includes(term)) ||
      (r.localisation && r.localisation.toLowerCase().includes(term))
    );
  }

  onDelete(id?: number): void {
    if (!id) return;
    if (!confirm('Supprimer ce réservoir ?')) return;
    this.reservoirService.delete(id).subscribe(() => {
      this.reservoirs = this.reservoirs.filter(r => r.id !== id);
    });
  }
}
