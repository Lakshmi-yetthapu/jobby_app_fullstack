import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private authService: AuthService){}
username:string = ''
password: string = ''
graduationStatus: string = ''
workStatus: string = ''
designation: string = ''
bio: string = ''

onSignup() {
    this.authService.signinUser({ username: this.username, password: this.password, graduationStatus: this.graduationStatus, workStatus: this.workStatus, designation: this.designation, bio: this.bio })
      .subscribe({
        next: () => alert("Signup Successful"),
        error: (err) => alert(err.error.message)
      });
  }
}
