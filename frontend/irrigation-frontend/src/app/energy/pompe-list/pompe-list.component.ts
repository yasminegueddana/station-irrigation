import { Component, OnInit } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { PompeService, Pompe } from '../../core/services/pompe.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pompe-list',
  standalone: true,
  imports: [NgFor, NgClass, RouterLink, FormsModule],
  templateUrl: './pompe-list.component.html',
  styleUrls: ['./pompe-list.component.scss']
})
export class PompeListComponent implements OnInit {

  pompes: Pompe[] = [];
  dispos: { [id: number]: string } = {};
  searchTerm = '';


  constructor(private pompeService: PompeService, private router: Router) { }

  ngOnInit(): void {
    this.loadPompes();
  }

  loadPompes(): void {
    this.pompeService.getAll().subscribe(data => {
      this.pompes = data;

      // charger la dispo pour chaque pompe
      this.pompes.forEach(p => {
        if (p.id != null) {
          this.pompeService.getDisponibilite(p.id).subscribe(resp => {
            this.dispos[p.id!] = resp.disponibilite;
          });
        }
      });
    });
  }


  onEdit(id?: number): void {
    if (!id) {
      return;
    }
    this.router.navigate(['/pompes', id]);
  }

  onDelete(id?: number): void {
    if (!id) {
      return;
    }
    if (!confirm('Supprimer cette pompe ?')) {
      return;
    }
    this.pompeService.delete(id).subscribe(() => {
      this.pompes = this.pompes.filter(p => p.id !== id);
    });
  }
  get filteredPompes(): Pompe[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.pompes;
    }
    return this.pompes.filter(p =>
      (p.reference && p.reference.toLowerCase().includes(term)) ||
      (p.statut && p.statut.toLowerCase().includes(term))
    );
  }
}