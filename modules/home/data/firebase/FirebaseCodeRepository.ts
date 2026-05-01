import { database } from '@/core/lib/firebase';
import { ref, get, set } from 'firebase/database';
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

  async assignCodeToUser(code: string, email: string): Promise<void> {
    const basePath = getBasePath();
    const sanitizedEmail = email.replace(/\./g, ',');


    // 1. Obtener datos del código (para saber cuántos créditos vale)
    const codeRef = ref(database, `${basePath}/code/${code}`);
    const codeSnapshot = await get(codeRef);
    const codeData = codeSnapshot.val();
    const creditsToAdd = codeData?.credits || 0;
    const existingOwner = codeData?.ownerEmail;

    // 2. Validar si el código ya fue usado por alguien más
    if (existingOwner && existingOwner !== email) {
      throw new Error("El código ya ha sido utilizado por otro usuario.");
    }

    // 3. Verificar si el usuario ya tiene este código activado (para no duplicar créditos)
    const userCodeRef = ref(database, `${basePath}/users/${sanitizedEmail}/codes/${code}`);
    const userCodeSnapshot = await get(userCodeRef);
    const alreadyHasCode = userCodeSnapshot.exists();

    // 4. Asignar el código al usuario (o re-confirmar asignación)
    const ownerEmailRef = ref(database, `${basePath}/code/${code}/ownerEmail`);
    await set(ownerEmailRef, email);

    const resourcesRef = ref(database, `${basePath}/code/${code}/resources`);
    const resourcesSnapshot = await get(resourcesRef);
    if (!resourcesSnapshot.exists()) {
      await set(resourcesRef, { initialized: true, createdAt: new Date().toISOString() });
    }

    if (alreadyHasCode) return; // Si ya lo tenía, no seguimos con los créditos

    // 5. Actualizar créditos totales del usuario
    const userCreditsRef = ref(database, `${basePath}/users/${sanitizedEmail}/credits`);
    const userCreditsSnapshot = await get(userCreditsRef);
    const currentCredits = userCreditsSnapshot.val() || 0;
    await set(userCreditsRef, currentCredits + creditsToAdd);

    // 6. Agregar el código a la lista del usuario
    const userCodeEntryRef = ref(database, `${basePath}/users/${sanitizedEmail}/codes/${code}`);
    await set(userCodeEntryRef, {
      activatedAt: new Date().toISOString(),
      creditsEarned: creditsToAdd
    });
  }


  async isCodeAssigned(code: string): Promise<boolean> {
    const dbRef = ref(database, `${getBasePath()}/code/${code}/ownerEmail`);
    const snapshot = await get(dbRef);
    return snapshot.exists();
  }
}
