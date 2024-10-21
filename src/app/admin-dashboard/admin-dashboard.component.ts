import {Component, OnInit} from '@angular/core';
import {FeedbackService} from "../services/feedback.service";
import {NotificationService} from "../services/notification.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  feedbacks: any[] = [];
  notificationMessage: string = '';
  notificationType: 'success' | 'error' = 'success';

  constructor(
    private feedbackService: FeedbackService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.fetchFeedbacks();

    // Subscribe to notifications
    this.notificationService.notification$.subscribe((notification) => {
      this.notificationMessage = notification.message;
      this.notificationType = notification.type;
    });
  }

  fetchFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe((data) => (this.feedbacks = data));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  deleteFeedback(id: number) {
    this.feedbackService.deleteFeedback(id).subscribe(() => {
      this.feedbacks = this.feedbacks.filter((f) => f.id !== id);
      this.notificationService.showSuccess('Feedback deleted.');
    });
  }

}
