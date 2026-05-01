# Lumina Store | Arquitectura Escalable

Este proyecto utiliza **Next.js (App Router)** y ha sido diseñado siguiendo los principios de la **Scalable Next.js Architecture** combinada con **Feature-Sliced Design (FSD)**.

El objetivo principal es mantener el código altamente cohesivo, predecible y fácil de escalar a largo plazo, evitando el acoplamiento y el código espagueti.

---

## 🏗 Estructura del Proyecto

La estructura de carpetas prohíbe tener carpetas de herramientas específicas en la raíz (ej. `firebase/`, `data/`). Todo debe vivir en capas con responsabilidades claras:

```text
/
├── app/                  # Routing de Next.js. Exclusivamente para armar páginas y layouts.
│
├── core/                 # Infraestructura compartida (Shared Layer). Usado por toda la app.
│   ├── lib/              # Inicialización de terceros (ej. Firebase init).
│   ├── services/         # Lógica de negocio global (ej. AuthService).
│   ├── providers/        # Proveedores de estado global (React Context).
│   └── constants/        # Variables de entorno y constantes globales (ej. APP_VERSION).
│
├── modules/              # Dominio de la aplicación (Feature-Sliced).
│   └── home/             # Módulo específico (ej. Home).
│       ├── components/   # UI del módulo (dividido en features, layout, common).
│       ├── hooks/        # Lógica de presentación de React.
│       ├── models/       # Entidades de Dominio (un archivo por entidad: Product, etc.).
│       ├── types/        # Tipos técnicos de UI (NavItem, ProcessStep, etc.).
│       ├── repositories/ # Contratos e Interfaces (Capa de Abstracción SOLID).
│       ├── data/         # Implementaciones concretas (ej. firebase/).
│       ├── scripts/      # Scripts utilitarios del módulo (ej. seed).
│       └── mocks/        # Datos de prueba exclusivos del módulo.
│
├── components/           # Componentes globales y primitivos (Botones, Layouts base).
│
└── scripts/              # Scripts de infraestructura global.
```

---

## 📜 Reglas Arquitectónicas y Mejores Prácticas

Para mantener la mantenibilidad del proyecto a medida que crece, todo el equipo debe adherirse a las siguientes convenciones:

### 1. Inversión de Dependencias (SOLID)
- **Las interfaces mandan.** Los componentes UI no dependen de Firebase directamente, sino de las interfaces en `repositories/`.
- La implementación concreta vive en `data/` (ej. `data/firebase`). Esto permite cambiar de base de datos sin tocar la lógica visual.

### 2. Granularidad en Modelos y Tipos
- **Un archivo por interfaz.** No agrupamos todo en archivos gigantes. Cada entidad (`Product.ts`) y cada tipo visual (`NavItem.ts`) tiene su propio lugar.
- Usamos **Barrel Files** (`index.ts`) para mantener las importaciones limpias.

### 3. Centralización de Infraestructura (Core)
- **No crear carpetas raíz para tecnologías específicas.** (Ej. no crear `/firebase`, `/axios`).
- Toda la configuración técnica pesada y clientes de APIs deben ir en `core/lib/`.

### 4. Aislamiento de Módulos (Feature-Sliced)
- Un módulo (ej. `modules/home/`) no debe depender de las entrañas de otro módulo.
- Si algo es usado en múltiples partes, debe promoverse a `components/` o `core/`.

### 5. Categorización de Componentes
Nunca dejar una carpeta de componentes plana. Clasifica siempre:
- `ui/`: Componentes primitivos (Botones, Inputs).
- `layout/`: Estructura de la página (Header, Footer).
- `features/`: Componentes con lógica de negocio (ej. `AccessCard`).
- `common/`: Reutilizables auxiliares (Modales, Toasts).

### 6. Separación Lógica vs UI
- Los componentes deben ser lo más "Dumb" (tontos) posible.
- Mueve la lógica pesada de estado, validación y temporizadores a un **Custom Hook** (ej. `useAccess.ts`).
- Los componentes llaman al hook, el hook llama al **Service/Repository**, el Repository llama a la base de datos.

### 5. Utilities Puras
- Las carpetas `utils/` están estrictamente reservadas para **funciones puras** (ej. formatear fechas, calcular porcentajes).
- Si la función hace una llamada HTTP, manipula una base de datos o usa el estado global, pertenece a `services/` o `repositories/`.

### 6. Performance First
- Todos los componentes pesados o librerías de terceros que no son visibles al cargar la página inicial (*below the fold*) deben importarse usando **Lazy Loading** (`next/dynamic`).

---

## 🚀 Inicio Rápido

Para iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

---

## 🔐 Seguridad (Firebase Realtime Database)

El proyecto implementa un sistema de seguridad robusto basado en **Security Rules** para prevenir fraudes, especialmente en el sistema de créditos.

### Lógica de Protección de Créditos
Para evitar que un usuario manipule su saldo de créditos manualmente desde la consola o herramientas externas, se han implementado las siguientes medidas:

1.  **Actualización Atómica**: La redención de un código se realiza mediante una operación `update()` atómica que vincula el código, el usuario y el saldo en un solo paso.
2.  **Validación Cruzada**: Las reglas de seguridad detectan qué código se está redimiendo (mediante el campo `lastCodeRedeemed`) y verifican en tiempo real que el incremento de créditos sea **exactamente igual** al valor configurado para ese código en la base de datos maestra.
3.  **Aislamiento de Usuario**: Cada usuario solo tiene permisos de lectura y escritura sobre su propio nodo, identificado por su email sanitizado (reemplazando `.` por `,`), validado contra su token de autenticación.

### Reglas de Seguridad Actuales

```json
{
  "rules": {
    "produccion": {
      "code": {
        "$code": {
          ".read": true,
          "ownerEmail": {
            ".write": "auth != null && (!data.exists() || data.val() === auth.token.email)"
          },
          "credits": { ".write": false }
        }
      },
      "users": {
        "$userEmail": {
          ".read": "auth != null && $userEmail === auth.token.email.replace('.', ',')",
          ".write": "auth != null && $userEmail === auth.token.email.replace('.', ',')",
          "credits": {
            ".validate": "((data.exists() && newData.val() === data.val() + root.child('produccion/code').child(newData.parent().child('lastCodeRedeemed').val()).child('credits').val()) || (!data.exists() && newData.val() === root.child('produccion/code').child(newData.parent().child('lastCodeRedeemed').val()).child('credits').val())) && newData.parent().child('codes').child(newData.parent().child('lastCodeRedeemed').val()).exists()"
          }
        }
      }
    }
  }
}
```
