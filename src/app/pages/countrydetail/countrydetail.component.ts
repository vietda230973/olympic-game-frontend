import { Component } from '@angular/core';
import { CountryComponent } from '../../components/country/country.component';
import { HeaderComponent } from '../../components/header/header.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-countrydetail',
  standalone: true,
  imports: [HeaderComponent, CountryComponent],
  templateUrl: './countrydetail.component.html',
  styleUrl: './countrydetail.component.scss'
})
export class CountrydetailComponent {

}
