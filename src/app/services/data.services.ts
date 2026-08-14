import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Country, Participation } from '../models/olympic.model';


@Injectable({ providedIn: 'root' })
export class DataService {
  
  private olympicUrl = './assets/mock/olympic.json';

  constructor(private http: HttpClient) {}

  getTousDonnees(): Observable<Country[]> {
     return this.http.get<Country[]>(this.olympicUrl);
  }
}