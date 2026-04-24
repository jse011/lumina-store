# Sistema de Diseño: Holographic Memory

Este sistema de diseño se basa en el concepto de "Inmortalidad Digital", una mezcla entre la calidez humana y la precisión tecnológica futura. El estilo visual es una ejecución refinada de **Glassmorphism** integrado con **Minimalismo**.

## Paleta de Colores (Modo Oscuro Obligatorio)

- **Fondo (Void):** `#101415` (o `#050B18` para máxima profundidad)
- **Primario (Night Blue):** `#c0c6d9` - Usado para el fondo infinito y profundidad.
- **Secundario (Ethereal Violet):** `#d0bcff` - Representa el espectro emocional; usado para brillos suaves y estados interactivos.
- **Terciario (Cyan Flare):** `#00dbe7` - El pulso tecnológico; usado para indicadores activos y puntos de datos holográficos.
- **Superficies (Glass):** `#1d2022` con variaciones desde `#191c1e` (bajo) hasta `#323537` (muy alto).
- **Texto (Luminous White):** `#e0e3e5` (On-Surface) y `#c6c6cc` (Variante).

## Tipografía

- **Headlines / Títulos:** **Space Grotesk**
  - Estilo: Geométrico, técnico, futurista.
- **Body / Texto de cuerpo:** **Manrope**
  - Estilo: Proporciones equilibradas, suaviza el borde tecnológico con calidez humana.

### Tokens de Tipografía (Uso Obligatorio)

- **Display (`text-display`)**:
  - Familia: Space Grotesk
  - Tamaño (fontSize): `72px`
  - Peso (fontWeight): `700`
  - Altura de línea (lineHeight): `1.1`
  - Espaciado (letterSpacing): `-0.02em`

- **Headline Large (`text-headline-lg`)**:
  - Familia: Space Grotesk
  - Tamaño (fontSize): `40px`
  - Peso (fontWeight): `500`
  - Altura de línea (lineHeight): `1.2`

- **Headline Medium (`text-headline-md`)**:
  - Familia: Space Grotesk
  - Tamaño (fontSize): `32px`
  - Peso (fontWeight): `500`
  - Altura de línea (lineHeight): `1.3`

- **Body Large (`text-body-lg`)**:
  - Familia: Manrope
  - Tamaño (fontSize): `18px`
  - Peso (fontWeight): `400`
  - Altura de línea (lineHeight): `1.6`

- **Body Medium (`text-body-md`)**:
  - Familia: Manrope
  - Tamaño (fontSize): `16px`
  - Peso (fontWeight): `400`
  - Altura de línea (lineHeight): `1.6`

- **Label Small (`text-label-sm`)**:
  - Familia: Space Grotesk
  - Tamaño (fontSize): `12px`
  - Peso (fontWeight): `600`
  - Altura de línea (lineHeight): `1`
  - Espaciado (letterSpacing): `0.1em`

## Elevación y Profundidad (Capas)

1. **Capa 0 (Void):** Fondo base azul medianoche.
2. **Capa 1 (Submerged):** Cambios sutiles de opacidad para definir áreas grandes.
3. **Capa 2 (Glass):** El efecto "Panel Holográfico".
   - `backdrop-filter: blur(20px)`
   - Bordes de 1px con degradado (Cian a Transparente).
4. **Capa 3 (Emission):** Elementos que emiten luz.
   - `box-shadow` con desenfoque alto (30px+) y baja opacidad (20%) usando colores Cian o Violeta.

## Formas y Bordes

- **Radio de borde (Rounded):**
  - Base: `0.5rem` (8px) para componentes estándar.
  - Grande: `1.5rem` (24px) para tarjetas grandes.
- **Strokes:** Es obligatorio el uso de bordes de 1px semi-transparentes para definir límites en el entorno oscuro.

## Prioridades

- Trabaja pensando en reutilizar componentes y estilos.
- Crea componentes para las tarjetas o cualquier elemento que se repita
- Maneja carpetas y subcarpetas acorde a las páginas que estás trabajando
- No hagas configuraciones ni instalaciones de librerías sin consultar primero.

## Componentes Clave

- **Tarjetas Holográficas:** Contenedores con desenfoque de fondo pesado, brillo en la esquina superior izquierda y textura sutil de "líneas de escaneo".
- **Botones Primarios:** Degradado sólido de Cian a Violeta con texto blanco.
- **Botones Secundarios (Ghost Glass):** Transparentes con borde de 1px y brillo sutil al pasar el mouse.
- **Inputs:** Minimalistas, solo un borde inferior que brilla en Cian al estar en foco.
- **Chips:** Forma de píldora con brillo Violeta para metadatos (fechas, etiquetas).
