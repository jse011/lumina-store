import { database } from '@/core/lib/firebase';
import { ref, set } from 'firebase/database';
import { HOLOGRAM_ACTIONS } from '../../mocks/mock';

async function seed() {
  console.log('Starting video-creator seed...');

  const getBasePath = () => {
    return process.env.NODE_ENV === 'production' ? 'produccion' : 'prueba';
  };

  try {
    console.log('Seeding hologram actions...');
    const actionsRef = ref(database, `${getBasePath()}/settings/hologramActions`);
    await set(actionsRef, HOLOGRAM_ACTIONS);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
