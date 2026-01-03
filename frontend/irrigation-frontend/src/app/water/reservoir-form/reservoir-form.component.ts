import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservoirService, Reservoir } from '../../core/services/reservoir.service';

@Component({
  selector: 'app-reservoir-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reservoir-form.component.html',
  styleUrls: ['./reservoir-form.component.scss']
})
export class ReservoirFormComponent {

  reservoir: Reservoir = {
    nom: '',
    capaciteTotale: 0,
    volumeActuel: 0,
    localisation: ''
  };

  isEdit = false;
  idReservoir?: number;

  constructor(
    private route: ActivatedRoute,
    private reservoirService: ReservoirService,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.idReservoir = +id;
      this.reservoirService.getById(this.idReservoir).subscribe(r => {
        this.reservoir = r;
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit && this.idReservoir) {
      this.reservoirService.update(this.idReservoir, this.reservoir).subscribe(() => {
        this.router.navigate(['/reservoirs']);
      });
    } else {
      this.reservoirService.create(this.reservoir).subscribe(() => {
        this.router.navigate(['/reservoirs']);
      });
    }
  }
}
