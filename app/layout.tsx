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

import { APP_VERSION } from "@/data/mock";

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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const version = "${APP_VERSION}";
                const storedVersion = localStorage.getItem('app_version');
                if (storedVersion && storedVersion !== version) {
                  console.log('Nueva versión detectada: ' + version + '. Limpiando caché...');
                  localStorage.clear();
                  sessionStorage.clear();
                  localStorage.setItem('app_version', version);
                  // Intentamos forzar una recarga limpia
                  window.location.href = window.location.href.split('?')[0] + '?v=' + version;
                } else {
                  localStorage.setItem('app_version', version);
                }
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
