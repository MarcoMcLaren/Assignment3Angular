import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
   
  registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.register({
        username: this.registerForm.controls.username.value!,
        password: this.registerForm.controls.password.value!
      }).subscribe(user => {
        window.alert('Registered successfully.');
        this.router.navigate(['/login']);
      }, error => {
        console.log(error);
        window.alert('Registration failed.');
      });
    }
  }
}
