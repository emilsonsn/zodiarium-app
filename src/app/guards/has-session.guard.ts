import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {SessionService} from '@store/session.service';
import {of} from 'rxjs';

export const hasSessionGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const sessionService = inject(SessionService);

  if (!sessionService.isAuthenticated()) {
    router.navigate(['/session/login']).then();
    return of(false);
  } else {
    return of(true);
  }

};
