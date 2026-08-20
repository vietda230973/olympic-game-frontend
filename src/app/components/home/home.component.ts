import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Country, Participation } from '../../models/olympic.model'
import Chart from 'chart.js/auto';
import { DataService } from '../../services/data.services';
import { NotificationService } from 'src/app/core/error-handling/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public pieChart!: Chart<"pie", number[], string>;
  public totalCountries: number = 0
  public totalJOs: number = 0
  public error!:string
  public loading = true; 
  titlePage: string = "Medals per Country";

  constructor(private router: Router, private http:HttpClient, private dataService: DataService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.dataService.getTousDonnees().pipe().subscribe(
      (data) => {
        this.loading = false;
        console.log(`Liste des données : ${JSON.stringify(data)}`);
        if (data && data.length > 0) {
          const countries: string[] = [...new Set(data.map((i: Country) => Number(i.id) + " - " + i.country))];
          const medals = data.map((i: Country) => i.participations.map((i: Participation) => (i.medalsCount)));
          const sumOfAllMedalsYears = medals.map((i) => i.reduce((acc: number, i: number) => acc + i, 0));
          this.buildPieChart(countries, sumOfAllMedalsYears);
        } else {
          this.notificationService.afficherErreur("Aucune donnée !");
        }
      },
      (error:HttpErrorResponse) => {
        console.log(`erreur : ${error}`);
        this.loading = false;
        this.error = error.message
      }
    )
  }

  buildPieChart(countries: string[], sumOfAllMedalsYears: number[]) {

    this.pieChart?.destroy();

    const pieChart = new Chart("DashboardPieChart", {
      type: 'pie',
      data: {
        labels: countries,
        datasets: [{
          label: 'Medals',
          data: sumOfAllMedalsYears,
          backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        onClick: (e) => {
          if (e.native) {
            const points = pieChart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true)
            if (points.length) {
              const firstPoint = points[0];
              const countryNameEtId = pieChart.data.labels ? pieChart.data.labels[firstPoint.index] : '';
              // Extract country name and ID (assuming format is "ID - Country")
              const [countryId, countryName] = countryNameEtId.split(' - ');
              this.router.navigate(['country', countryId]);
            }
          }
        }
      }
    });
    this.pieChart = pieChart;
  }

   ngOnDestroy() {
    this.pieChart?.destroy();
  }
}

