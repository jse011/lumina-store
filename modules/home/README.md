# Arquitectura Modular del Módulo Home

Este directorio está diseñado bajo los principios de **Arquitectura Escalable de Next.js** en combinación con **Domain-Driven Design (Feature-Sliced Design)**.

La filosofía detrás de esta estructura es mantener la lógica altamente cohesiva (todo lo referente a "Home" vive aquí) y débilmente acoplada con el resto de la aplicación, permitiendo un escalado a largo plazo sin dolor.

---

## Estructura del Módulo

```text
modules/home/
├── components/          # Componentes visuales de React
│   ├── ui/              # (Vacío) Los componentes básicos se movieron a /components/ui global.
│   ├── layout/          # Componentes estructurales (Navbar, Footer).
│   ├── features/        # Componentes que implementan partes del negocio (AccessCard, Catalog).
│   └── common/          # Componentes reutilizables dentro del propio módulo (Dialogs, Toasts).
│
├── hooks/               # Custom hooks de React (Lógica de presentación o contenedores).
│   ├── useAccess.ts     # Maneja validación, estados de error y vinculación con Firebase.
│   └── useHomeData.ts   # Orquesta la carga de múltiples repositorios.
│
├── models/              # (o types) Definiciones de interfaces de TypeScript del dominio.
│   └── HomeModels.ts    # Product, Testimonial, AppSettings, etc.
│
├── repositories/        # Capa de Datos. Interacción directa con Base de Datos o APIs.
│   ├── HomeInterfaces.ts
│   └── FirebaseHomeRepositories.ts
│
├── utils/               # Funciones puras de ayuda que NO contienen lógica de negocio compleja.
│   └── formatTime.ts    # Cálculos y transformaciones simples.
│
└── stores/              # (Si se requiere en el futuro) Manejo de estado complejo con Zustand.
```

---

## Reglas y Mejores Prácticas (Basadas en "Scalable Next.js Architecture")

1. **Separación de Utils vs Lógica (Services/Repositories)**
   - No pongas en `utils/` código que llame a una API o a Firebase. `utils/` debe contener funciones puras (ej. formato de strings o fechas).
   - Toda llamada externa (Firebase) pertenece estrictamente a la capa de `repositories/` o `services/`.

2. **Categorización de Componentes**
   - Agrupar componentes previene una carpeta plana con docenas de archivos difíciles de navegar.
   - Si creas un componente grande, analízalo: ¿Es de diseño global (`layout/`)? ¿Resuelve un caso de uso específico (`features/`)? ¿Es un auxiliar (`common/`)?

3. **Performance First: Lazy Loading**
   - Importaciones pesadas (como Carruseles, Galerías o scripts de terceros) que no son visibles al inicio (*below the fold*) deben ser cargadas bajo demanda con `next/dynamic`. Ejemplo en `app/home/page.tsx` con `Gallery` y `Testimonials`.

4. **Componentes 'Dumb' y Hooks Inteligentes**
   - Mantenemos `AccessCard` lo más limpio posible. La lógica de cuenta regresiva, estados y validaciones con Firebase vive en `useAccess.ts` dentro de la carpeta `hooks/`.

5. **Manejo de Estado a Futuro (Zustand)**
   - Si más adelante múltiples componentes dispersos necesitan leer el estado del usuario o del código de acceso, en lugar de pasar 'props' por todas partes, se deberá crear una carpeta `stores/` y definir un hook de Zustand para manejar el estado global del módulo.
