import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.loginUser({ username: this.username, password: this.password })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          alert(err.error.message);
          this.router.navigate(['/login'])
        }
      });
  }
}