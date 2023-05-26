import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Assignment3Angular';
  isLoggedIn$!: Observable<boolean>;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }
}