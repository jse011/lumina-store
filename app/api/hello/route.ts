import { NextRequest, NextResponse } from 'next/server';
import { GreetingService } from '@/modules/home/services/GreetingService';

/**
 * Route Handler siguiendo la arquitectura de capas.
 * No escribimos lógica aquí, solo manejamos la entrada/salida HTTP.
 */
export async function GET(request: NextRequest) {
  // 1. Obtener parámetros de la URL
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  // 2. Instanciar servicio (Inyección de dependencias simplificada)
  const greetingService = new GreetingService();

  // 3. Ejecutar lógica y obtener resultado tipado
  const response = greetingService.generateGreeting(name);

  // 4. Retornar respuesta HTTP
  return NextResponse.json(response);
}
