import {Component} from '@angular/core';
import {ZodiacService} from "@services/quiz/zodiac.service";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";
import {ZodiacData} from "@models/quiz/zodiac";
import { ClientService } from '@services/client.service';
import { Client } from '@models/client';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

  public data: ZodiacData;
  public clientDetails: Client;

  public step: string = 'begin'; 
  // ['begin', 'sun', 'moon', 'mission', 'luck', 'relationships']

  constructor(
    private readonly _zodiacService: ZodiacService,
    private readonly _clientService: ClientService,
    private readonly router: Router
  ) {}

  ngOnInit(){
    this._zodiacService.data$.pipe(take(1)).subscribe((data) => {
      this.data = data;

      if (this.data == null) {
        // this.router.navigate(['/quiz/birth-date']).then();
      }

      this.data['address'] = this.data['address'];

      this.data['hour_birth'] = this.getHourOrMinute(this.data['birth_hour'], 'hour');
      this.data['minute_birth'] = this.getHourOrMinute(this.data['birth_hour'], 'minute');
    
    });

    

    this.getSmallReport();
  }

  getSmallReport(){
    this._clientService.create({
      ...this.data,
      day_birth: parseInt(this.data.day_birth+''),
      month_birth: parseInt(this.data.month_birth+''),
      year_birth: parseInt(this.data.year_birth+''),
      hour_birth: parseInt(this.data.hour_birth+''),
      minute_birth: parseInt(this.data.minute_birth+''),
    })
    .subscribe({
      next: (response) => {
        this.clientDetails = response.data;
        localStorage.setItem('client_id', this.clientDetails.id+'');
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  nextStep(step){
    this.step = step;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  viewFullReport() {
    this.router.navigate(['/sale']).then();
  }
  
  private displayFn(city: any): string {
    return city && city.name ? city.name : '';
  }

  private getHourOrMinute(hour_and_minutes, search = 'hour'){
    hour_and_minutes = hour_and_minutes.split(':');
    return search == 'hour' ? hour_and_minutes[0] : hour_and_minutes[1]
  }

}
