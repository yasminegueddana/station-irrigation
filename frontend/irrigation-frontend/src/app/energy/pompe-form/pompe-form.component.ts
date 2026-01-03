import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PompeService, Pompe } from '../../core/services/pompe.service';

@Component({
  selector: 'app-pompe-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pompe-form.component.html',
  styleUrls: ['./pompe-form.component.scss']
})
export class PompeFormComponent {

  pompe: Pompe = {
    reference: '',
    puissance: 0,
    statut: 'ACTIVE',
    dateMiseEnService: ''
  };

  isEdit = false;
  idPompe?: number;

  constructor(
    private route: ActivatedRoute,
    private pompeService: PompeService,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.idPompe = +id;
      this.pompeService.getById(this.idPompe).subscribe(p => {
        this.pompe = p;
      });
    }
  }

  onSubmit(): void {
    if (this.isEdit && this.idPompe) {
      this.pompeService.update(this.idPompe, this.pompe).subscribe(() => {
        this.router.navigate(['/pompes']);
      });
    } else {
      this.pompeService.create(this.pompe).subscribe(() => {
        this.router.navigate(['/pompes']);
      });
    }
  }
}
