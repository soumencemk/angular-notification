import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new BehaviorSubject<{ message: string, type: 'success' | 'error' }>({
    message: '',
    type: 'success'
  });
  notification$ = this.notificationSubject.asObservable();
  private timeOutID: any;

  showSuccess(message: string): void {
    this.triggerNotification(message, 'success');
  }

  showError(message: string): void {
    this.triggerNotification(message, 'error');
  }

  private triggerNotification(message: string, type: 'success' | 'error') {
    this.notificationSubject.next({message, type});
    if (this.timeOutID) {
      clearTimeout(this.timeOutID);
    }
    this.timeOutID = setTimeout(() => {
      this.notificationSubject.next({message: '', type});
      this.timeOutID = null;
    }, 5000);
  }
}
