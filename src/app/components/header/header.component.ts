import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { Country, Participation } from '../../models/olympic.model'
import { DataService } from '../../services/data.services';
import { CommonModule } from '@angular/common';
import { NotificationService } from 'src/app/core/error-handling/notification.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  public indicateurs : any[] = [];
  public error!:string;
  titlePage: string = "";

  constructor (private route: ActivatedRoute, private http: HttpClient, private dataService: DataService, private notificationService : NotificationService) {

  }

  ngOnInit () {
    let countryName: string | null = null
    this.route.paramMap.subscribe((param: ParamMap) => countryName = param.get('countryName'));
    this.dataService.getTousDonnees().pipe().subscribe(
      (data) => {
        console.log(`Liste des données : ${JSON.stringify(data)}`);
        if (data && data.length > 0) {
          this.titlePage = "Medals per Country";
          const totalJOs = Array.from(new Set(data.map((i: Country) => i.participations.map((f: Participation) => f.year)).flat())).length;
          this.indicateurs = [...this.indicateurs, { libelle : 'Number of countries', valeur : totalJOs.toString() }];
          const countries: string[] = data.map((i: Country) => i.country);
          const totalCountries = countries.length;
          this.indicateurs = [...this.indicateurs, { libelle : 'Number of JOs', valeur : totalCountries.toString()   }];
        }  else {
          this.notificationService.afficherErreur("Aucune donnée !");
          this.error = 'Aucune donnée';
        }

        const selectedCountry = data.find((i: Country) => i.country === countryName);
        if (!selectedCountry) {
          return;
        }

        if (selectedCountry) {
          this.indicateurs = [];
          this.titlePage = selectedCountry.country ?? '';
          const participations = selectedCountry.participations.map((i: Participation) => i);
          const totalEntries = participations.length ?? 0;
          this.indicateurs = [...this.indicateurs, { libelle : 'Number of entries', valeur : totalEntries.toString() }   ];
        
          const medals = selectedCountry.participations.map((i: Participation) => i.medalsCount.toString()) ?? [];
          const totalMedals = medals.reduce((accumulator: number, item: string) => accumulator + parseInt(item), 0);
          this.indicateurs = [...this.indicateurs, { libelle : 'Total Number of medals', valeur : totalMedals.toString()  } ];
        
          const nbAthletes = selectedCountry.participations.map((i: Participation) => i.athleteCount.toString()) ?? [];
          const totalAthletes = nbAthletes.reduce((accumulator: number, item: string) => accumulator + parseInt(item), 0);            
          this.indicateurs = [...this.indicateurs, { libelle : 'Total Number of athletes', valeur : totalAthletes.toString() }  ];
        
        } 
          
      }) ,
      (error:HttpErrorResponse) => {
        console.log(`erreur : ${error}`);
        this.error = error.message
      }

  }

  ngOnDestroy () {

  }
}
