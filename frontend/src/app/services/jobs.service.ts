import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }
 url = 'http://localhost:3000'

  getAllJobs() {
    return this.http.get<any>(`${this.url}/jobs`);
}

 postJob(jobData: any){
    return this.http.post<any>(`${this.url}/jobs`, jobData);
 }

  getJobById(jobId: string) {
    return this.http.get<any>(`${this.url}/jobs/${jobId}`);
  }

  updateJob(jobId: string, jobData: any) {
    return this.http.put<any>(`${this.url}/jobs/${jobId}`, jobData);
  }

  deleteJob(jobId: string) {
    return this.http.delete<any>(`${this.url}/jobs/${jobId}`);
  }
}
