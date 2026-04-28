import type { Metadata } from "next";
import { Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

import { APP_VERSION } from "@/core/constants";

export const metadata: Metadata = {
  title: "Lumina Recuerdos | Inmortalizando Momentos en 3D",
  description: "Transformamos tus fotos y videos en recuerdos holográficos eternos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-PE"
      className={`dark ${spaceGrotesk.variable} ${manrope.variable}`}
    >
      <head>
        <link
          href={`https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600&display=swap&v=${APP_VERSION}`}
          rel="stylesheet"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap&v=${APP_VERSION}`}
          rel="stylesheet"
        />
        <meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="pragma" content="no-cache" />
        <meta http-equiv="expires" content="0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const getVersion = () => document.body ? document.body.getAttribute('data-version') : "${APP_VERSION}";
                
                const currentVersion = getVersion();
                const urlParams = new URLSearchParams(window.location.search);
                const vParam = urlParams.get('v');

                if (vParam) {
                  localStorage.setItem('app_version', vParam);
                  if (vParam === currentVersion) {
                    const newUrl = window.location.pathname + window.location.hash;
                    window.history.replaceState({}, '', newUrl);
                  }
                }

                const forceReload = (newVersion) => {
                  if (vParam === newVersion) return;
                  
                  console.log('Nueva versión detectada: ' + newVersion + '. Limpiando caché profunda...');
                  
                  // 1. Limpiar almacenamiento de variables
                  localStorage.clear();
                  sessionStorage.clear();
                  localStorage.setItem('app_version', newVersion);

                  // 2. Limpiar CacheStorage (Donde el Service Worker guarda los archivos)
                  if ('caches' in window) {
                    caches.keys().then(function(names) {
                      for (let name of names) caches.delete(name);
                    });
                  }

                  // 3. Limpiar Service Workers
                  if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistrations().then(function(registrations) {
                      for(let registration of registrations) { registration.unregister(); }
                    });
                  }
                  
                  // 4. Redirigir con delay para asegurar que las promesas terminen
                  setTimeout(function() {
                    window.location.replace(window.location.pathname + '?v=' + newVersion + window.location.hash);
                  }, 200);
                };

                const storedVersion = localStorage.getItem('app_version');

                // Si la página que cargó es distinta a la versión "maestra" guardada
                if (storedVersion && currentVersion && storedVersion !== currentVersion) {
                  // Si storedVersion es más reciente que currentVersion, forzamos recarga
                  // (Evitamos recargar si intentamos bajar de versión, a menos que sea necesario)
                  forceReload(storedVersion);
                  return;
                }

                fetch('/version.json?t=' + Date.now(), { cache: 'no-store' })
                  .then(res => res.json())
                  .then(data => {
                    const latestVersion = data.version;
                    const pageVersion = getVersion();
                    
                    if (latestVersion && latestVersion !== pageVersion && latestVersion !== vParam) {
                      forceReload(latestVersion);
                    } else if (pageVersion) {
                      localStorage.setItem('app_version', pageVersion);
                    }
                  })
                  .catch(err => console.log('Check skipped'));
              })();
            `,
          }}
        />
      </head>
      <body
        className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen"
        data-version={APP_VERSION}
      >
        {children}
      </body>
    </html>
  );
}
