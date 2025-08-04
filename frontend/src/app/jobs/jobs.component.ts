import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JobsService } from '../services/jobs.service';

interface Job {
  company_logo_url: string;
  employment_type: string;
  job_description: string;
  location: string;
  package_per_annum: string;
  rating: number;
  title: string;
}

@Component({
  selector: 'app-jobs',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})

export class JobsComponent {
  
constructor(private jobService: JobsService) {}
jobs: Job[] = [];

ngOnInit() {
  this.jobService.getAllJobs().subscribe(data => {
    this.jobs = data;
  });
}
}
