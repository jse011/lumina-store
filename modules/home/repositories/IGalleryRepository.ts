export interface IGalleryRepository {
  getGalleryImages(): Promise<string[]>;
  saveGalleryImages(images: string[]): Promise<void>;
}
