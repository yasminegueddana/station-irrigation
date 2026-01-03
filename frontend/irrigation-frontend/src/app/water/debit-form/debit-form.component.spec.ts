import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DebitMesureService, DebitMesure } from '../../core/services/debit-mesure.service';

@Component({
  selector: 'app-debit-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './debit-form.component.html',
  styleUrls: ['./debit-form.component.scss']
})
export class DebitFormComponent {

  debit: DebitMesure = {
    pompeId: 0,
    debit: 0,
    dateMesure: '',
    unite: 'm3/h'
  };

  isEdit = false;
  idDebit?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private debitService: DebitMesureService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    const pompeIdParam = this.route.snapshot.queryParamMap.get('pompeId');

    if (id) {
      this.isEdit = true;
      this.idDebit = +id;
      this.debitService.getById(this.idDebit).subscribe(d => this.debit = d);
    } else if (pompeIdParam) {
      this.debit.pompeId = +pompeIdParam;
      this.debit.dateMesure = new Date().toISOString(); // valeur par défaut
    }
  }

  onSubmit(): void {
    const redirectPompeId = this.debit.pompeId;

    if (this.isEdit && this.idDebit) {
      this.debitService.update(this.idDebit, this.debit).subscribe(() => {
        this.router.navigate(['/pompes', redirectPompeId, 'debits']);
      });
    } else {
      this.debitService.create(this.debit).subscribe(() => {
        this.router.navigate(['/pompes', redirectPompeId, 'debits']);
      });
    }
  }
}
