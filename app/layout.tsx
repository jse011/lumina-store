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
                const currentVersion = "${APP_VERSION}";
                const urlParams = new URLSearchParams(window.location.search);
                const vParam = urlParams.get('v');

                // 1. Limpiar la URL si ya estamos en la versión correcta
                if (vParam === currentVersion) {
                  const newUrl = window.location.pathname + window.location.hash;
                  window.history.replaceState({}, '', newUrl);
                }

                const forceReload = (newVersion) => {
                  // Si ya estamos intentando cargar esta versión, no recargar más (evita bucles)
                  if (vParam === newVersion) return;
                  
                  console.log('Nueva versión detectada: ' + newVersion);
                  localStorage.setItem('app_version', newVersion);
                  window.location.href = window.location.pathname + '?v=' + newVersion + window.location.hash;
                };

                // 2. Verificar versión guardada localmente
                const storedVersion = localStorage.getItem('app_version');
                if (storedVersion && storedVersion !== currentVersion) {
                  forceReload(currentVersion);
                  return;
                }

                // 3. Verificar contra el servidor (con protección anti-caché)
                fetch('/version.json?t=' + Date.now(), { cache: 'no-store' })
                  .then(res => res.json())
                  .then(data => {
                    if (data.version && data.version !== currentVersion) {
                      forceReload(data.version);
                    } else {
                      localStorage.setItem('app_version', currentVersion);
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
