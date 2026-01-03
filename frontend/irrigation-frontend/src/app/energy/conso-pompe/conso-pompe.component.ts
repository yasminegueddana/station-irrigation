import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { ConsommationService, ConsommationElectrique } from '../../core/services/consommation.service';

@Component({
  selector: 'app-conso-pompe',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './conso-pompe.component.html',
  styleUrls: ['./conso-pompe.component.scss']
})
export class ConsoPompeComponent {
  pompeId!: number;
  consommations: ConsommationElectrique[] = [];
  total24h?: number;
  alerteMessage?: string;
  alerteSurconso?: boolean;

  constructor(
    private route: ActivatedRoute,
    private consoService: ConsommationService
  ) {
    this.pompeId = Number(this.route.snapshot.paramMap.get('id'));

    this.consoService.getByPompe(this.pompeId).subscribe(list => {
      this.consommations = list;
    });

    this.consoService.checkAlerteSurconsommation(this.pompeId)
      .subscribe(res => {
        this.alerteSurconso = res.surconsommation;
        this.alerteMessage = res.message;
      });

  }
}
