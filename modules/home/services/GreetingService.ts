import { HelloResponse } from '../types';

export class GreetingService {
  /**
   * Procesa la lógica de saludo encapsulada en el módulo Home.
   */
  public generateGreeting(name: string | null): HelloResponse {
    const finalName = name || 'Mundo';
    
    return {
      message: `¡Hola ${finalName}! Este saludo viene encapsulado desde el módulo Home.`,
      timestamp: new Date().toISOString(),
      success: true
    };
  }
}
