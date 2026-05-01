export class GoogleDriveUtils {
  /**
   * Obtiene el link directo de una imagen de Google Drive a partir de su ID.
   */
  static getImageUrl(id: string): string {
    if (!id) return '';
    // Si ya es un link completo, devolverlo
    if (id.startsWith('http')) return id;
    
    return `https://lh3.googleusercontent.com/d/${id}=w1000-h1000?authuser=0`;
  }

  /**
   * Obtiene el link de descarga/streaming de un video de Google Drive a partir de su ID.
   */
  static getVideoUrl(id: string): string {
    if (!id) return '';
    if (id.startsWith('http')) return id;
    
    return `https://docs.google.com/uc?export=download&id=${id}`;
  }

  /**
   * Detecta si un string es probablemente un ID de Google Drive o un link externo.
   */
  static isDriveId(str: string): boolean {
    if (!str) return false;
    return !str.startsWith('http') && str.length > 10;
  }

  /**
   * Detecta si el archivo es un video basándose en la extensión o el formato del ID.
   * Si el usuario guarda algo como "id.mp4", lo detectamos.
   */
  static isVideo(url: string): boolean {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  }
}
