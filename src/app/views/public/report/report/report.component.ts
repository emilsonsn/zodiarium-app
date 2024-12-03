import {Component} from '@angular/core';
import {ZodiacService} from "@services/quiz/zodiac.service";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";
import {ZodiacData} from "@models/quiz/zodiac";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

  public data: ZodiacData;

  constructor(
    private readonly zodiacService: ZodiacService,
    private readonly router: Router
  ) {

    this.zodiacService.data$.pipe(take(1)).subscribe((data) => {
      this.data = data;
      if (data == null) {
        this.router.navigate(['/quiz/birth-date']).then();
      }
    });

  }

  displayFn(city: any): string {
    return city && city.name ? `${city.name}, ${city.state}, ${city.country}` : '';
  }
}
