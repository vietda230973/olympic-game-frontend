import { Component } from '@angular/core';
import { HomeComponent } from '../../components/home/home.component';
import { HeaderComponent } from "../../components/header/header.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HomeComponent,
    HeaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
