import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'api/feedbacks';

  constructor(private http: HttpClient) {
  }

  getFeedbacks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addFeedback(feedback: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, feedback);
  }

  rateFeedback(feedback: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${feedback.id}`, feedback);
  }

  deleteFeedback(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
