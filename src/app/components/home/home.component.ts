import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Country, Participation } from '../../models/olympic.model'
import Chart from 'chart.js/auto';
import { DataService } from '../../services/data.services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public pieChart!: Chart<"pie", number[], string>;
  public totalCountries: number = 0
  public totalJOs: number = 0
  public error!:string
  titlePage: string = "Medals per Country";

  constructor(private router: Router, private http:HttpClient, private dataService: DataService ) { }

  ngOnInit() {
    this.dataService.getTousDonnees().pipe().subscribe(
      (data) => {
        console.log(`Liste des données : ${JSON.stringify(data)}`);
        if (data && data.length > 0) {
          const countries: string[] = data.map((i: Country) => i.country);
          const medals = data.map((i: Country) => i.participations.map((i: Participation) => (i.medalsCount)));
          const sumOfAllMedalsYears = medals.map((i) => i.reduce((acc: number, i: number) => acc + i, 0));
          this.buildPieChart(countries, sumOfAllMedalsYears);
        }
      },
      (error:HttpErrorResponse) => {
        console.log(`erreur : ${error}`);
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
              const countryName = pieChart.data.labels ? pieChart.data.labels[firstPoint.index] : '';
              this.router.navigate(['country', countryName]);
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

