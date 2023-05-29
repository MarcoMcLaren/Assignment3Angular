import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = new BehaviorSubject<boolean>(this.checkLoggedInStatus());

  constructor(private http: HttpClient, private router: Router) { }

  login(user: {username: string, password: string}): Observable<any> {
    return this.http.post<any>('https://localhost:7064/Account/login', user, {responseType: 'text' as 'json'})
      .pipe(
        tap(response => {
          // Handle JWT storage
          localStorage.setItem('jwt', response);

          // Notify the login status change
          this.loggedInStatus.next(true);

          // Redirect to product listing
          this.router.navigate(['/product-listing']);
        })
      );
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }

  private checkLoggedInStatus(): boolean {
    return !!localStorage.getItem('jwt');
  }

  logout(): void {
    // Remove JWT from localStorage
    localStorage.removeItem('jwt');

    // Notify the login status change
    this.loggedInStatus.next(false);

    // Redirect to login page
    this.router.navigate(['/login']);
  }

  register(user: {username: string, password: string}): Observable<any> {
    return this.http.post<any>('https://localhost:7064/Account/register', user)
      .pipe(
        tap(response => {
          // Handle successful registration
          console.log('User registered successfully: ', response);
  
          // Redirect to login page after successful registration
          this.router.navigate(['/login']);
        })
      );
  }

}
