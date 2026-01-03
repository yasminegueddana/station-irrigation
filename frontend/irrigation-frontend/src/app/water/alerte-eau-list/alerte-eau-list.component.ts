import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, NgClass, DatePipe, LowerCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlerteEauService, AlerteEau } from '../../core/services/alerte-eau.service';

@Component({
  selector: 'app-alerte-eau-list',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule, DatePipe, LowerCasePipe],
  templateUrl: './alerte-eau-list.component.html',
  styleUrls: ['./alerte-eau-list.component.scss']
})
export class AlerteEauListComponent implements OnInit {

  alertes: AlerteEau[] = [];
  searchTerm = '';
  filtreStatut = 'TOUS'; // TOUS / NON_TRAITEE / EN_COURS / RESOLUE
  loading = false;

  constructor(private alerteService: AlerteEauService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.alerteService.getAll().subscribe({
      next: data => {
        this.alertes = data;
        this.loading = false;
      },
      error: err => {
        console.error('Erreur chargement alertes eau:', err);
        this.loading = false;
      }
    });
  }

  get filteredAlertes(): AlerteEau[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.alertes.filter(a => {
      const matchText =
        !term ||
        String(a.pompeId).includes(term) ||
        (a.message && a.message.toLowerCase().includes(term)) ||
        (a.severite && a.severite.toLowerCase().includes(term));

      const matchStatut =
        this.filtreStatut === 'TOUS' || a.statut === this.filtreStatut;

      return matchText && matchStatut;
    });
  }

  getBadgeClass(a: AlerteEau): string {
    switch (a.statut) {
      case 'NON_TRAITEE': return 'badge badge-danger';
      case 'EN_COURS': return 'badge badge-warning';
      case 'RESOLUE': return 'badge badge-success';
      default: return 'badge';
    }
  }

  nextStatut(current: string): string {
    if (current === 'NON_TRAITEE') return 'EN_COURS';
    if (current === 'EN_COURS') return 'RESOLUE';
    return 'RESOLUE';
  }

  onChangeStatut(a: AlerteEau): void {
    const nouveauStatut = this.nextStatut(a.statut);
    this.alerteService.updateStatut(a.id!, nouveauStatut).subscribe({
      next: updated => {
        a.statut = updated.statut;
      },
      error: err => console.error('Erreur maj statut:', err)
    });
  }
}
