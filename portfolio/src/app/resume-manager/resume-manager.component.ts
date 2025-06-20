import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface ResumeData {
  user: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    summary: string;
  };
  experiences: Array<{
    company: string;
    title: string;
    start_date: string;
    end_date: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    graduation_date: string;
    gpa?: string;
  }>;
  skills: Array<{
    name: string;
    category: string;
  }>;
}

@Component({
  selector: 'app-resume-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './resume-manager.component.html',
  styleUrl: './resume-manager.component.css'
})
export class ResumeManagerComponent implements OnInit {
  isLoggedIn = false;
  currentUser: any = null;
  resumeData: ResumeData | null = null;
  isLoading = false;
  activeSection = 'profile';
  aiQuestions: string[] = [];
  showAIQuestions = false;

  loginForm: FormGroup;
  profileForm: FormGroup;
  experienceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      location: [''],
      linkedin: [''],
      website: [''],
      summary: ['']
    });

    this.experienceForm = this.fb.group({
      company: ['', Validators.required],
      title: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: [''],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const savedUser = localStorage.getItem('resumeUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.isLoggedIn = true;
      this.loadResumeData();
    }
  }

  async login(): Promise<void> {
    if (this.loginForm.valid) {
      this.isLoading = true;
      try {
        const formData = new FormData();
        formData.append('email', this.loginForm.value.email);
        formData.append('password', this.loginForm.value.password);

        const response = await this.http.post(`${environment.apiBaseUrl}/api/login`, formData).toPromise();
        this.currentUser = { id: (response as any).user_id, email: this.loginForm.value.email };
        this.isLoggedIn = true;
        localStorage.setItem('resumeUser', JSON.stringify(this.currentUser));
        this.loadResumeData();
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      } finally {
        this.isLoading = false;
      }
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.currentUser = null;
    this.resumeData = null;
    localStorage.removeItem('resumeUser');
  }

  async loadResumeData(): Promise<void> {
    if (!this.currentUser) return;

    try {
      const response = await this.http.get(`${environment.apiBaseUrl}/api/resume-preview/${this.currentUser.id}`).toPromise();
      this.resumeData = response as ResumeData;
      this.populateProfileForm();
    } catch (error) {
      console.error('Failed to load resume data:', error);
    }
  }

  populateProfileForm(): void {
    if (this.resumeData?.user) {
      this.profileForm.patchValue(this.resumeData.user);
    }
  }

  async saveProfile(): Promise<void> {
    if (this.profileForm.valid && this.currentUser) {
      try {
        await this.http.post(`${environment.apiBaseUrl}/api/profile/${this.currentUser.id}`, this.profileForm.value).toPromise();
        alert('Profile saved successfully!');
        this.loadResumeData();
      } catch (error) {
        console.error('Failed to save profile:', error);
        alert('Failed to save profile');
      }
    }
  }

  async addExperience(): Promise<void> {
    if (this.experienceForm.valid && this.currentUser) {
      try {
        const formData = new FormData();
        Object.keys(this.experienceForm.value).forEach(key => {
          formData.append(key, this.experienceForm.value[key]);
        });

        await this.http.post(`${environment.apiBaseUrl}/api/experience/${this.currentUser.id}`, formData).toPromise();
        alert('Experience added successfully!');
        this.experienceForm.reset();
        this.loadResumeData();
      } catch (error) {
        console.error('Failed to add experience:', error);
        alert('Failed to add experience');
      }
    }
  }

  async getAIQuestions(): Promise<void> {
    if (!this.currentUser) return;

    try {
      const response = await this.http.get(`${environment.apiBaseUrl}/api/ai-questions/${this.currentUser.id}`).toPromise();
      this.aiQuestions = (response as any).questions;
      this.showAIQuestions = true;
    } catch (error) {
      console.error('Failed to get AI questions:', error);
      alert('Failed to get AI questions');
    }
  }

  async generateResume(type: 'short' | 'long'): Promise<void> {
    if (!this.currentUser) return;

    try {
      const response = await this.http.post(`${environment.apiBaseUrl}/api/generate-resume/${this.currentUser.id}?type=${type}`, {}, {
        responseType: 'blob'
      }).toPromise();

      const blob = new Blob([response as Blob], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume_${type}_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to generate resume:', error);
      alert('Failed to generate resume');
    }
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }
}
