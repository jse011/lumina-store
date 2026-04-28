// Importar Firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: 'AIzaSyDH2uW_kse7FtPfskJ71QprSO3KC4QogBQ',
    authDomain: 'lumina-store-8409e197.firebaseapp.com',
    databaseURL: 'https://lumina-store-8409e197-default-rtdb.firebaseio.com/',
    projectId: 'lumina-store-8409e197',
    storageBucket: 'lumina-store-8409e197.firebasestorage.app',
    messagingSenderId: '613880054470',
    appId: '1:613880054470:web:24622e177dc4f5331f8dc7',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
export default app;