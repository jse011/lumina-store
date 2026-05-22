import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { removeBackground } from '@imgly/background-removal';
import { CreatorState } from '../types/CreatorState';

interface UseImageUploadProps {
    onUpdate: (updates: Partial<CreatorState>) => void;
}

export function useImageUpload({ onUpdate }: UseImageUploadProps) {
    const [isPreparing, setIsPreparing] = useState(false);
    const [processingMessage, setProcessingMessage] = useState('Analizando imagen...');

    const messages = [
        'Analizando rasgos faciales...',
        'Eliminando fondo original...',
        'Generando mapa de profundidad...',
        'Optimizando para holograma...',
        'Finalizando preparación...'
    ];

    const processAndUpload = async (file: File) => {
        setIsPreparing(true);
        let msgIndex = 0;
        const interval = setInterval(() => {
            setProcessingMessage(messages[msgIndex % messages.length]);
            msgIndex++;
        }, 3000);

        try {
            // 1. Opciones de compresión
            const options = {
                maxSizeMB: 2,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                preserveExif: true,
            };

            setProcessingMessage('Optimizando imagen...');
            const compressedFile = await imageCompression(file, options);
            const originalUrl = URL.createObjectURL(compressedFile);
            
            onUpdate({ 
                originalPreviewUrl: originalUrl,
                compressedBlob: compressedFile
            });

            // 2. Quitar fondo usando el archivo comprimido
            setProcessingMessage('IA: Eliminando fondo...');
            const blob = await removeBackground(compressedFile);
            const preparedUrl = URL.createObjectURL(blob);

            onUpdate({ 
                preparedImage: preparedUrl,
                preparedBlob: blob
            });
        } catch (error) {
            console.error('Error al procesar la imagen:', error);
            alert('Ocurrió un error al procesar la imagen. Asegúrate de que sea un formato compatible.');
        } finally {
            setIsPreparing(false);
            clearInterval(interval);
        }
    };

    return {
        isPreparing,
        processingMessage,
        processAndUpload
    };
}

