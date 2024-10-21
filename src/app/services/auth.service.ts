import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: string | null = null;

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      this.userRole = 'admin';
      localStorage.setItem('userRole', 'admin');
      return true;
    } else if (username === 'user' && password === 'user') {
      this.userRole = 'user';
      localStorage.setItem('userRole', 'user');
      return true;
    }
    return false;
  }

  logout(): void {
    this.userRole = null;
    localStorage.removeItem('userRole');
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  isLoggedIn(): boolean {
    return this.getUserRole() !== null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  constructor() {
  }
}
