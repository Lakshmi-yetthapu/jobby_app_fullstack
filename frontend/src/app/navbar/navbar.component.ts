import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authservice: AuthService) {}

  // isLoggedIn(): boolean {
  //   return this.authservice.isLoggedIn();
  // }
onLogout() {
  this.authservice.logout();
}
}
