import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({ // 
  selector: 'app-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
user: any = {};
  profileImageUrl: string | ArrayBuffer | null = '';
  isEditMode: boolean = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.profileService.getUserProfile().subscribe((data) => {
      this.user = data;
      this.profileImageUrl = data.profileImageUrl;
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  onImageSelected(event: any) {
    if (!this.isEditMode) return;

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.profileImageUrl = reader.result;
      this.user.profileImageUrl = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  updateProfile() {
    this.profileService.updateUserProfile(this.user).subscribe((response) => {
      alert('Profile updated successfully!');
      this.isEditMode = false;
    });
  }
}
