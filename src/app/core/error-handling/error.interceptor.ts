import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { NotificationService } from './notification.service';
import { HttpErrorResponse } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  
  const notificationService = inject(NotificationService);
  return next(req).pipe(
    catchError((error) => {
      const message = extraireMessageErreur(error);
      notificationService.afficherErreur(message);
      return throwError(() => error);
    })
  );
}

function extraireMessageErreur(erreur: HttpErrorResponse): string {
  if (erreur.error?.message) {
    return erreur.error.message;
  }
  if (erreur.status === 0) {
    return 'Impossible de contacter le serveur. Vérifiez votre connexion.';
  }
  if (erreur.status === 404) {
    return 'Ressource introuvable.';
  }
  if (erreur.status === 500) {
    return 'Erreur interne du serveur. Veuillez réessayer.';
  }
  return `Une erreur est survenue (code ${erreur.status}).`;
}

