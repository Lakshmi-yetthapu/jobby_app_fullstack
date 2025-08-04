import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // ✅ Correct import
import { AuthService } from '../services/auth.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private authservice: AuthService,
    private router: Router
  ) {}

  onFindJobs() {
    this.router.navigate(['/jobs']);
  }
}
