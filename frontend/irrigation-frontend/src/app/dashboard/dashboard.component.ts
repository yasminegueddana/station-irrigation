import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { PompeService } from '../core/services/pompe.service';
import { ReservoirService } from '../core/services/reservoir.service';
import { AlerteEauService, AlerteEau } from '../core/services/alerte-eau.service';
import { ConsommationService } from '../core/services/consommation.service';
import { DebitMesureService } from '../core/services/debit-mesure.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading = true;

  // KPIs
  nbPompes = 0;
  nbPompesDisponibles = 0;
  nbReservoirs = 0;
  alertes: AlerteEau[] = [];

  // Chart Properties
  // 1. Pumps (Donut)
  public pumpChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  };
  public pumpChartType: ChartType = 'doughnut';
  public pumpChartData: ChartData<'doughnut'> = {
    labels: ['Actives', 'Inactives'],
    datasets: [{ data: [0, 0], backgroundColor: ['#4caf50', '#bdbdbd'] }]
  };

  // 2. Alerts (Bar Horizontal)
  public alertChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: { legend: { display: false } }
  };
  public alertChartType: ChartType = 'bar';
  public alertChartData: ChartData<'bar'> = {
    labels: ['Non traitée', 'En cours', 'Résolue'],
    datasets: [
      { data: [0, 0, 0], label: 'Alertes', backgroundColor: ['#ef5350', '#ffca28', '#66bb6a'] }
    ]
  };

  // 3. Reservoirs (Bar Vertical)
  public reservoirChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true } }
  };
  public reservoirChartType: ChartType = 'bar';
  public reservoirChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Volume Actuel', backgroundColor: '#42a5f5' },
      { data: [], label: 'Capacité Totale', backgroundColor: '#e3f2fd' }
    ]
  };

  // 4. Energy (Bar Vertical)
  public energyChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, title: { display: true, text: 'kWh' } } }
  };
  public energyChartType: ChartType = 'bar';
  public energyChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Consommation (kWh)', backgroundColor: '#ffb74d' }]
  };

  // 5. Debits (Bar Vertical)
  public debitChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, title: { display: true, text: 'm³/h' } } }
  };
  public debitChartType: ChartType = 'bar';
  public debitChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Débit (m³/h)', backgroundColor: '#26c6da' }]
  };

  constructor(
    private pompeService: PompeService,
    private reservoirService: ReservoirService,
    private alerteService: AlerteEauService,
    private consoService: ConsommationService,
    private debitService: DebitMesureService
  ) { }

  ngOnInit(): void {
    this.loading = true;

    // Load Pumps, Energy & Debits
    this.pompeService.getAll().subscribe(pompes => {
      this.nbPompes = pompes.length;
      const actives = pompes.filter(p => p.statut === 'ACTIVE').length;
      this.nbPompesDisponibles = actives;
      const inactives = this.nbPompes - actives;

      this.pumpChartData = {
        ...this.pumpChartData,
        datasets: [{
          data: [actives, inactives],
          backgroundColor: ['#4caf50', '#bdbdbd']
        }]
      };

      // Load Consumption
      this.consoService.getAll().subscribe(consos => {
        const consoByPump: { [key: number]: number } = {};
        consos.forEach(c => {
          consoByPump[c.pompeId] = (consoByPump[c.pompeId] || 0) + c.energieUtilisee;
        });

        const labels: string[] = [];
        const dataConso: number[] = [];

        pompes.forEach(p => {
          if (p.id) {
            labels.push(p.reference || `Pompe ${p.id}`);
            dataConso.push(consoByPump[p.id] || 0);
          }
        });

        this.energyChartData = {
          labels: labels,
          datasets: [{ data: dataConso, label: 'Consommation (kWh)', backgroundColor: '#ffb74d' }]
        };

        // Load Debits (Latest per pump)
        this.debitService.getAll().subscribe(debits => {
          const debitByPump: { [key: number]: number } = {};
          // Assuming simple logic: just take the last found or max? 
          // Better: last by date. Sorting...
          debits.sort((a, b) => new Date(a.dateMesure).getTime() - new Date(b.dateMesure).getTime());
          debits.forEach(d => {
            // Overwrite ensures we get the latest
            debitByPump[d.pompeId] = d.debit;
          });

          const dataDebit: number[] = [];
          pompes.forEach(p => {
            if (p.id) {
              dataDebit.push(debitByPump[p.id] || 0);
            }
          });

          this.debitChartData = {
            labels: labels, // same labels as energy (pumps)
            datasets: [{ data: dataDebit, label: 'Débit (m³/h)', backgroundColor: '#26c6da' }]
          };

          this.loading = false;
        });
      });
    });

    // Load Reservoirs
    this.reservoirService.getAll().subscribe(res => {
      this.nbReservoirs = res.length;
      const labels = res.map(r => r.nom);
      const currentVol = res.map(r => r.volumeActuel);
      const capacity = res.map(r => r.capaciteTotale);

      this.reservoirChartData = {
        labels: labels,
        datasets: [
          { data: currentVol, label: 'Volume Actuel', backgroundColor: '#42a5f5' },
          { data: capacity, label: 'Capacité Totale', backgroundColor: '#90caf9' }
        ]
      };
    });

    // Load Alerts
    this.alerteService.getAll().subscribe(alertes => {
      this.alertes = alertes;
      const nonTraitees = alertes.filter(a => a.statut === 'NON_TRAITEE').length;
      const enCours = alertes.filter(a => a.statut === 'EN_COURS').length;
      const resolues = alertes.filter(a => a.statut === 'RESOLUE').length;

      this.alertChartData = {
        ...this.alertChartData,
        datasets: [{
          data: [nonTraitees, enCours, resolues],
          label: 'Alertes',
          backgroundColor: ['#ef5350', '#ffca28', '#66bb6a']
        }]
      };
    });
  }
}
