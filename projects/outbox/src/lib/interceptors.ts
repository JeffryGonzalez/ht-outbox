import {
  HttpErrorResponse,
  HttpEventType,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

import { injectDispatch } from '@ngrx/signals/events';
import { catchError, tap } from 'rxjs';
import { outboxEvents, outboxInternalEvents } from './events';
import {
  ErrorResponseEntity,
  OUTBOX_SOURCED,
  OUTBOX_SOURCED_ID,
  RequestEntity,
} from './types';

export function withOutboxFeatureInterceptor(): HttpInterceptorFn {
  return (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const outbox = req.context.get(OUTBOX_SOURCED);
    const dispatcher = injectDispatch(outboxEvents);
    const internalDispatcher = injectDispatch(outboxInternalEvents);
    if (outbox) {
      const id = req.context.get(OUTBOX_SOURCED_ID) || crypto.randomUUID();
      const payload: RequestEntity = {
        id,
        timestamp: Date.now(),
        body: outbox.body,
        name: outbox.name,
        kind: outbox.kind,
        method: req.method,
      };
      internalDispatcher.requestSent(payload);
      return next(req).pipe(
        tap((r) => {
          if (r.type === HttpEventType.Response) {
            internalDispatcher.responseReceived({
              ...payload,
              timestamp: Date.now(),
            });
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.log({
            msg: 'Got an Outbox Error',
            statusText: error.statusText,
            code: error.status,
          });
          const errorPayload: ErrorResponseEntity = {
            ...payload,
            statusText: error.statusText,
            statusCode: error.status,
            message: error.error,

            timestamp: Date.now(),
          };
          dispatcher.responseHadError(errorPayload);
          throw error;
        }),
      );
    } else {
      return next(req);
    }
  };
}
