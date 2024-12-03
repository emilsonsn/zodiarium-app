import {Component} from '@angular/core';
import {Gender} from "@models/quiz/gender";
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrl: './gender.component.scss'
})
export class GenderComponent {

  optionsMale: AnimationOptions | null = null;
  optionsFemale: AnimationOptions | null = null;

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
    return { path: animations[randomIndex] }; // Retorna no formato AnimationOptions
  }


  options: AnimationOptions = {
    path: '/assets/animation/male1.json',
  };

  protected readonly Gender = Gender;
}
