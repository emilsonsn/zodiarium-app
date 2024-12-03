import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ZodiacService} from "@services/quiz/zodiac.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrl: './send.component.scss'
})
export class SendComponent {

  constructor(
    private readonly zodiacService: ZodiacService,
    private readonly router: Router
  ) {

    this.zodiacService.data$.pipe(take(1)).subscribe((data) => {
      console.log('Received data from child:', data);
    });

  }

}
