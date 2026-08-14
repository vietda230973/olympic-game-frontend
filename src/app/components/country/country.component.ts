import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { Country, Participation } from '../../models/olympic.model'
import Chart from 'chart.js/auto';
import { DataService } from '../../services/data.services';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy {
  public lineChart!: Chart<"line", string[], number>;
  public barChart!: Chart<"bar", number[], number>;
  public titlePage: string = '';
  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public error!: string;
 
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private dataService: DataService) {
  }

  ngOnInit() {
    let countryName: string | null = null
    this.route.paramMap.subscribe((param: ParamMap) => countryName = param.get('countryName'));
    this.dataService.getTousDonnees().pipe().subscribe(
      (data) => {
        if (data && data.length > 0) {
          const selectedCountry = data.find((i: Country) => i.country === countryName);

          if (!selectedCountry) {
            this.error = 'Pays non trouvé!';
            return;
          }
          
          const years = selectedCountry.participations.map((i: Participation) => i.year) ?? [];
          const medals = selectedCountry.participations.map((i: Participation) => i.medalsCount.toString()) ?? [];
          this.buildChart(years, medals);
          this.buildBarChart(years, medals);
        }
      },
      (error:HttpErrorResponse) => {
        console.log(`erreur : ${error}`);
        this.error = error.message
      }       
    );
  }

  buildChart(years: number[], medals: string[]) {

    this.lineChart?.destroy();

    const lineChart = new Chart("countryChart", {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: "medals",
            data: medals,
            backgroundColor: '#0b868f'
          },
        ]
      },
      options: {
        aspectRatio: 2.5,
        responsive: true        
      }
    });
    this.lineChart = lineChart;
    
  }

  buildBarChart(years: number[], medals: string[]) {

    const medalsNum: number[] = medals.map(Number);
    const barChart = new Chart("countryBarChart", {
      type: 'bar',
      data: {
        labels: years,
        datasets: [{
          label: "medals",
          data: medalsNum,
          backgroundColor: [
            'rgba(255, 206, 86, 0.7)',
            'rgba(48, 104, 31, 0.7)',
            'rgba(255, 159, 64, 0.7)'
          ],
          borderColor: [
            'rgb(255, 206, 86)',
            'rgb(79, 164, 90)',
            'rgb(255, 159, 64)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
    this.barChart = barChart;
  }

  ngOnDestroy() {
    this.lineChart?.destroy();
    this.barChart?.destroy();
  }
}
