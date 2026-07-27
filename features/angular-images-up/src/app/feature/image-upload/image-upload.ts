import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.html',
  styleUrl: './image-upload.css',
})
export class ImageUpload {
  readonly previewUrl = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.selectFile(file);
  }

  selectFile(file: File | null): void {
    this.errorMessage.set(null);

    if (!file) {
      return;
    }

    if (!file.type.match(/image\//)) {
      this.errorMessage.set('Please select an image file.');
      this.previewUrl.set(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => this.previewUrl.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  clear(): void {
    this.previewUrl.set(null);
    this.errorMessage.set(null);
  }
}