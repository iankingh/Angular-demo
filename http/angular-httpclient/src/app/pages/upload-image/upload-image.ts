import { Component, inject, signal } from '@angular/core';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-upload-image',
  imports: [],
  templateUrl: './upload-image.html',
  styleUrl: './upload-image.css',
})
export class UploadImage {
  private readonly uploadService = inject(UploadService);

  readonly imageUrl = signal<string | null>(null);
  private file: File | null = null;

  preview(files: FileList | null): void {
    if (!files || files.length === 0) {
      return;
    }
    this.file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        this.imageUrl.set(result);
      }
    };
    reader.readAsDataURL(this.file);
  }

  uploadImage(): void {
    const image = this.imageUrl();
    if (!image) {
      return;
    }
    this.uploadService.upload(image).subscribe({
      next: () => alert('Upload OK'),
      error: () => alert('Upload failed'),
    });
  }
}