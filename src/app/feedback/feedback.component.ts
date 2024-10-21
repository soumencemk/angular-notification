import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../services/notification.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {FeedbackService} from "../services/feedback.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbacks: any[] = [];
  newFeedback: string = '';
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
    this.notificationService.notification$.subscribe((notification) => {
      this.notificationMessage = notification.message;
      this.notificationType = notification.type;
    });
  }

  fetchFeedbacks() {
    this.feedbackService.getFeedbacks().subscribe((data) => (this.feedbacks = data));
  }

  addFeedback() {
    if (this.newFeedback.trim().length === 0) {
      this.notificationService.showError('Feedback is required.');
      return;
    }

    if (this.newFeedback.length > 200) {
      this.notificationService.showError('Feedback cannot exceed 200 characters.');
      return;
    }

    this.feedbackService.addFeedback({text: this.newFeedback, helpfulCount: 0}).subscribe(
      (response) => {
        this.feedbacks.push(response);
        this.newFeedback = '';
        this.notificationService.showSuccess('Feedback submitted successfully!');
      },
      (error) => {
        this.notificationService.showError('Failed to submit feedback.');
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  rateFeedback(feedback: any) {
    feedback.helpfulCount++;
    this.feedbackService.rateFeedback(feedback).subscribe(() => {
      this.notificationService.showSuccess('Feedback rated as helpful!');
    });
  }

}
