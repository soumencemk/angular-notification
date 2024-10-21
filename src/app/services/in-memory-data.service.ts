import {Injectable} from '@angular/core';
import {InMemoryDbService, RequestInfo} from "angular-in-memory-web-api";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() {
  }

  createDb() {
    const feedbacks = [
      {id: 1, text: 'Great service!', helpfulCount: 0},
      {id: 2, text: 'Could be better.', helpfulCount: 0},
    ];
    const users = [
      {username: 'admin', password: 'admin', role: 'admin'},
      {username: 'user', password: 'user', role: 'user'},
    ];
    return {feedbacks, users};
  }
}
