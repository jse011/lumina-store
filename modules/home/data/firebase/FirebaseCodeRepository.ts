import { database } from '@/core/lib/firebase';
import { ref, get, update } from 'firebase/database';
import { ICodeRepository } from '../../repositories';

const getBasePath = () => {
  return process.env.NODE_ENV === 'production' ? 'produccion' : 'prueba';
};

export class FirebaseCodeRepository implements ICodeRepository {
  async validateCode(code: string): Promise<boolean> {
    const dbRef = ref(database, `${getBasePath()}/code/${code}`);
    const snapshot = await get(dbRef);
    return snapshot.exists();
  }

  async assignCodeToUser(code: string, userId: string, email: string): Promise<void> {
    const basePath = getBasePath();

    // 1. Obtener datos del código (para saber cuántos créditos vale)
    const codeRef = ref(database, `${basePath}/code/${code}`);
    const codeSnapshot = await get(codeRef);
    const codeData = codeSnapshot.val();
    
    if (!codeSnapshot.exists()) {
      throw new Error("El código no existe.");
    }

    const creditsToAdd = codeData?.credits || 0;
    const existingOwner = codeData?.ownerEmail;

    // 2. Validar si el código ya fue usado por alguien más
    if (existingOwner && existingOwner !== email) {
      throw new Error("El código ya ha sido utilizado por otro usuario.");
    }

    // 3. Verificar si el usuario ya tiene este código activado
    const userCodeRef = ref(database, `${basePath}/users/${userId}/codes/${code}`);
    const userCodeSnapshot = await get(userCodeRef);
    if (userCodeSnapshot.exists()) {
      return; // Ya lo tiene, no hacemos nada
    }

    // 4. Preparar actualización atómica
    const userCreditsRef = ref(database, `${basePath}/users/${userId}/credits`);
    const userCreditsSnapshot = await get(userCreditsRef);
    const currentCredits = userCreditsSnapshot.val() || 0;

    const updates: any = {};
    
    // Asignar dueño al código
    updates[`code/${code}/ownerEmail`] = email;
    
    // Inicializar recursos si no existen
    updates[`code/${code}/resources`] = {
      initialized: true,
      activatedAt: new Date().toISOString()
    };

    // Actualizar datos del usuario
    updates[`users/${userId}/email`] = email;
    updates[`users/${userId}/credits`] = currentCredits + creditsToAdd;
    
    // Registrar el código en el historial del usuario
    updates[`users/${userId}/codes/${code}`] = {
      activatedAt: new Date().toISOString(),
      creditsEarned: creditsToAdd
    };

    // Campo auxiliar para que las Security Rules validen que el incremento es correcto
    updates[`users/${userId}/lastCodeRedeemed`] = code;

    // Ejecutar todo de forma atómica
    await update(ref(database, basePath), updates);
  }


  async isCodeAssigned(code: string): Promise<boolean> {
    const dbRef = ref(database, `${getBasePath()}/code/${code}/ownerEmail`);
    const snapshot = await get(dbRef);
    return snapshot.exists();
  }

  async isUserRegistered(userId: string): Promise<boolean> {
    const dbRef = ref(database, `${getBasePath()}/users/${userId}`);
    const snapshot = await get(dbRef);
    return snapshot.exists();
  }
}
