import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  notificationMessage: string = '';
  notificationType: 'success' | 'error' = 'success';

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    // Subscribe to the notification observable to update message and type
    this.notificationService.notification$.subscribe((notification) => {
      this.notificationMessage = notification.message;
      this.notificationType = notification.type;
    });
  }

  login() {
    if (this.authService.login(this.username, this.password)) {
      this.notificationService.showSuccess('Login successful!');
      if (this.authService.isAdmin()) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/feedback']);
      }
    } else {
      this.notificationService.showError('Invalid credentials');
    }
  }
}
