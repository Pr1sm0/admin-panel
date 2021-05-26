import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    name: null,
    email: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  message = '';
  state = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { name, email, password } = this.form;
    const role = 'user';

    this.authService.register(name, role, email, password).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.message = data.message;
        this.router
          .navigate(['/login'], {
            state: { successMessage: this.message },
          });
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
