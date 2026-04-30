import { database } from '@/core/lib/firebase';
import { ref, get, set } from 'firebase/database';
import { ICodeRepository } from '../../repositories';

export class FirebaseCodeRepository implements ICodeRepository {
  async validateCode(code: string): Promise<boolean> {
    const dbRef = ref(database, `produccion/${code}`);
    const snapshot = await get(dbRef);
    return snapshot.exists();
  }

  async assignCodeToUser(code: string, email: string): Promise<void> {
    const dbRef = ref(database, `produccion/${code}/ownerEmail`);
    await set(dbRef, email);
    
    const resourcesRef = ref(database, `produccion/${code}/resources`);
    const resourcesSnapshot = await get(resourcesRef);
    if (!resourcesSnapshot.exists()) {
      await set(resourcesRef, { initialized: true, createdAt: new Date().toISOString() });
    }
  }

  async isCodeAssigned(code: string): Promise<boolean> {
    const dbRef = ref(database, `produccion/${code}/ownerEmail`);
    const snapshot = await get(dbRef);
    return snapshot.exists();
  }
}
