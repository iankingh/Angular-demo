import { TestBed } from '@angular/core/testing';
import { ImageUpload } from './image-upload';

describe('ImageUpload', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageUpload],
    }).compileComponents();
  });

  function createComponent() {
    const fixture = TestBed.createComponent(ImageUpload);
    const component = fixture.componentInstance as unknown as {
      previewUrl: { set: (v: string | null) => void; (): string | null };
      errorMessage: { set: (v: string | null) => void; (): string | null };
      selectFile: (file: File | null) => void;
      onInputChange: (event: Event) => void;
      clear: () => void;
    };
    return { fixture, component };
  }

  it('creates the component', () => {
    const { component } = createComponent();
    expect(component).toBeTruthy();
  });

  it('starts without a preview or error', () => {
    const { component } = createComponent();
    expect(component.previewUrl()).toBeNull();
    expect(component.errorMessage()).toBeNull();
  });

  it('ignores a null file selection', () => {
    const { component } = createComponent();
    component.selectFile(null);
    expect(component.previewUrl()).toBeNull();
    expect(component.errorMessage()).toBeNull();
  });

  it('rejects a non-image file with an error message', () => {
    const { component } = createComponent();
    const file = new File(['hello'], 'notes.txt', { type: 'text/plain' });
    component.selectFile(file);
    expect(component.errorMessage()).toContain('image');
    expect(component.previewUrl()).toBeNull();
  });

  it('sets the preview when an image file is selected', async () => {
    const stub = makeFileReaderStub('data:image/png;base64,AAAA');
    const restore = replaceFileReader(stub);
    try {
      const { component } = createComponent();
      const file = new File(['data'], 'photo.png', { type: 'image/png' });
      component.selectFile(file);
      await Promise.resolve();
      expect(component.errorMessage()).toBeNull();
      expect(component.previewUrl()).toContain('data:image/png');
    } finally {
      restore();
    }
  });

  it('clears the preview and error', () => {
    const { component } = createComponent();
    component.errorMessage.set('oops');
    component.previewUrl.set('data:,x');
    component.clear();
    expect(component.previewUrl()).toBeNull();
    expect(component.errorMessage()).toBeNull();
  });

  it('reads the file from the input change event', async () => {
    const stub = makeFileReaderStub('data:image/jpeg;base64,BB==');
    const restore = replaceFileReader(stub);
    try {
      const { component } = createComponent();
      const input = document.createElement('input');
      input.type = 'file';
      const file = new File(['data'], 'pic.jpg', { type: 'image/jpeg' });
      Object.defineProperty(input, 'files', { value: [file] });
      component.onInputChange({ target: input } as unknown as Event);
      await Promise.resolve();
      expect(component.errorMessage()).toBeNull();
      expect(component.previewUrl()).toContain('data:image/jpeg');
    } finally {
      restore();
    }
  });
});

function makeFileReaderStub(result: string) {
  return class {
    result: string | ArrayBuffer | null = result;
    onload: ((event: ProgressEvent) => void) | null = null;
    readAsDataURL(_file: Blob): void {
      queueMicrotask(() => this.onload?.({} as ProgressEvent));
    }
  };
}

function replaceFileReader(stub: unknown): () => void {
  const original = (globalThis as { FileReader?: unknown }).FileReader;
  (globalThis as { FileReader?: unknown }).FileReader = stub;
  return () => {
    (globalThis as { FileReader?: unknown }).FileReader = original;
  };
}