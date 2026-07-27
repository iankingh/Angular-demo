import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-image',
  imports: [],
  templateUrl: './upload-image.html',
  styleUrl: './upload-image.css',
})
export class UploadImage {
  private readonly http = inject(HttpClient);

  readonly imageUrl = signal<string | null>(null);
  private file: File | null = null;

  preview(files: FileList | null): void {
    if (!files || files.length === 0) return;
    this.file = files[0];
    const reader = new FileReader();
    reader.onload = () => this.imageUrl.set(reader.result as string);
    reader.readAsDataURL(this.file);
  }

  uploadImage(): void {
    if (!this.imageUrl()) return;
    const formData = new FormData();
    formData.append('img', this.imageUrl() as string);
    this.http.post('http://localhost:8080/upload/base64', formData).subscribe({
      next: () => alert('Upload OK'),
      error: () => alert('Upload failed'),
    });
  }
}