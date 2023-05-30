import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../service/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from '../Models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
   
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const user = {
        username: this.loginForm.get('username')!.value || '',
        password: this.loginForm.get('password')!.value || ''
      };
      this.authService.login(user).subscribe(
        () => console.log('User logged in'),
        error => console.log('Login failed', error)
      );
    }
  }
}
