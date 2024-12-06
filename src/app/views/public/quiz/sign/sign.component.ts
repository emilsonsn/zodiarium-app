import {Component} from '@angular/core';
import {ZodiacService} from "@services/quiz/zodiac.service";
import {take} from "rxjs/operators";
import {ZodiacSignData} from "@models/quiz/zodiac";
import {Router} from "@angular/router";
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.scss'
})
export class SignComponent {

  public data: ZodiacSignData;

  options: AnimationOptions = {
    path: '/assets/animation/Animation - 1732981606697.json',
  };

  constructor(
    private readonly zodiacService: ZodiacService,
    private readonly router: Router
  ) {
  }

  navigateToQuiz(rota) {
    this.router.navigate([`${rota}`]);
  }

  ngOnInit() {
    this.zodiacService.data$.pipe(take(1)).subscribe((data) => {
      if (data) {

        if (data.zodiacSign) {
          this.data = data.zodiacSign;
        } else {
          this.zodiacService.getClientZodiacSign(data.day_birth, data.month_birth).subscribe((res) => {
            setTimeout(() => {
              this.data = res.data;

              this.zodiacService.sendData({
                  ...data,
                  zodiacSign: res.data
                }
              );

            }, 2000);
          });
        }
      } else {
        this.router.navigate(['/quiz/birth-date']).then();
      }
    });
  }

}
