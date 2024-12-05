import {Component} from '@angular/core';
import {Gender} from "@models/quiz/gender";
import {AnimationOptions} from "ngx-lottie";
import {ZodiacService} from "@services/quiz/zodiac.service";
import {Router} from "@angular/router";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrl: './gender.component.scss'
})
export class GenderComponent {

  optionsMale: AnimationOptions | null = null;
  optionsFemale: AnimationOptions | null = null;

  constructor(
    private readonly zodiacService: ZodiacService,
    private readonly router: Router
  ) {
    this.zodiacService.data$.pipe(take(1)).subscribe((data) => {
      if (data == null) {
        this.router.navigate(['/quiz/birth-date']).then();
      }
    });
  }

  ngOnInit(): void {
    this.optionsMale = this.getRandomAnimation(Gender.Male);
    this.optionsFemale = this.getRandomAnimation(Gender.Female);
  }


  female: string[] = [
    '/assets/animation/female1.json',
    '/assets/animation/female2.json',
  ];
  male: string[] = [
    '/assets/animation/male1.json',
    '/assets/animation/male2.json',
  ];

  getRandomAnimation(gender: Gender): AnimationOptions {
    const animations = gender === Gender.Male ? this.male : this.female;
    const randomIndex = Math.floor(Math.random() * animations.length);
    return { path: animations[randomIndex] };
  }

  options: AnimationOptions = {
    path: '/assets/animation/male1.json',
  };

  protected readonly Gender = Gender;

  selectGender(male: string) {
    this.zodiacService.data$.pipe(take(1)).subscribe((data) => {
      this.zodiacService.sendData({
        ...data,
        gender: male
      });
    });

    this.router.navigate(['/quiz/send']).then();

  }
}
