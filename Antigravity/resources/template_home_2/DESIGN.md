---
name: Holographic Memory Design System
colors:
  surface: '#101415'
  surface-dim: '#101415'
  surface-bright: '#363a3b'
  surface-container-lowest: '#0b0f10'
  surface-container-low: '#191c1e'
  surface-container: '#1d2022'
  surface-container-high: '#272a2c'
  surface-container-highest: '#323537'
  on-surface: '#e0e3e5'
  on-surface-variant: '#c6c6cc'
  inverse-surface: '#e0e3e5'
  inverse-on-surface: '#2d3133'
  outline: '#909096'
  outline-variant: '#45474c'
  surface-tint: '#c0c6d9'
  primary: '#c0c6d9'
  on-primary: '#2a303f'
  primary-container: '#050b18'
  on-primary-container: '#737a8b'
  inverse-primary: '#585e6e'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#00dbe7'
  on-tertiary: '#00363a'
  tertiary-container: '#000e0f'
  on-tertiary-container: '#00878f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dce2f5'
  primary-fixed-dim: '#c0c6d9'
  on-primary-fixed: '#151c29'
  on-primary-fixed-variant: '#404756'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#74f5ff'
  tertiary-fixed-dim: '#00dbe7'
  on-tertiary-fixed: '#002022'
  on-tertiary-fixed-variant: '#004f54'
  background: '#101415'
  on-background: '#e0e3e5'
  surface-variant: '#323537'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is built upon the concept of "Digital Immortality"—a bridge between the visceral warmth of human nostalgia and the cold precision of future technology. It targets an audience seeking a premium, contemplative experience where memories are treated as sacred artifacts rather than mere data.

The visual style is a refined execution of **Glassmorphism** integrated with **Minimalism**. It utilizes deep spatial layers to simulate the physical presence of a light-based projection. The aesthetic prioritizes visual breathing room, allowing high-fidelity holographic assets to be the focal point. The interface should feel like a high-end optical instrument: silent, responsive, and ethereal.

## Colors

This design system operates exclusively in **dark mode** to maximize the contrast of light-based elements. 

- **Primary (Night Blue):** Used for the infinite background, providing a sense of depth and vastness.
- **Secondary (Ethereal Violet):** Representing the "emotional" spectrum of the brand. Used for soft glows, overlays, and secondary interactive states.
- **Tertiary (Cyan Flare):** The "technological" pulse. Used for active indicators, holographic data points, and sharp highlights.
- **Neutral (Luminous White):** High-clarity typography and icons, often paired with a slight outer glow to simulate light emission.

The palette relies on gradients that transition from deep blues to vibrant purples, mimicking the refraction of light through a prism.

## Typography

Typography in this design system balances technical precision with human warmth. 

- **Space Grotesk** is used for headlines and data labels. Its geometric nature evokes a sense of high-tech instrumentation and futuristic clarity.
- **Manrope** is utilized for body text. Its refined, balanced proportions ensure that emotional narratives are easy to read and feel approachable, softening the technological edge of the brand.

Large headings should use tight letter spacing to feel impactful, while labels use expanded tracking and uppercase styling to evoke a "scanned" or "projected" data aesthetic.

## Layout & Spacing

This design system employs a **fixed grid** model for desktop (12 columns) and a fluid model for mobile. 

The spacing philosophy is "Generous and Intentional." Large `xl` values should be used between major sections to prevent visual clutter and maintain the premium, gallery-like feel. Content is centered within a maximum container width to ensure focus. 

Horizontal alignment should be strict to reflect a digital architecture, while vertical spacing can be more organic to allow for floating, "weightless" elements.

## Elevation & Depth

Depth is the cornerstone of this design system. We move away from traditional shadows and instead use **Backdrop Blurs** and **Inner Glows**.

1.  **Layer 0 (Void):** The base midnight blue background (#050B18).
2.  **Layer 1 (Submerged):** Slight opacity changes on the background to define large areas.
3.  **Layer 2 (Glass):** Elements with `backdrop-filter: blur(20px)` and a 1px border with a gradient (Cyan to Transparent). This creates the "holographic pane" effect.
4.  **Layer 3 (Emission):** Interactive elements that emit light. Use `box-shadow` with high blur (30px+) and low opacity (20%) using the Cyan or Violet colors to simulate a glow hitting the surface below.

All components should feel as if they are floating in a 3D space, with more important elements "nearer" to the user, represented by higher transparency and sharper border highlights.

## Shapes

The shape language is **Rounded**, avoiding both the aggression of sharp corners and the playfulness of pill shapes. 

A base radius of `0.5rem` is applied to standard components, increasing to `1.5rem` for large cards. This "Soft-Tech" approach makes the technology feel advanced yet safe and inviting. Subtle 1px strokes are mandatory for all shapes to define their boundaries in a dark environment; these strokes should ideally be semi-transparent gradients.

## Components

- **Buttons:** Primary buttons use a solid Cyan-to-Violet gradient with white text. Secondary buttons are "Ghost Glass"—transparent with a 1px border and a subtle hover glow.
- **Holographic Cards:** The primary container for memories. Features a heavy background blur, a top-left corner highlight, and a subtle "scan-line" texture (low opacity horizontal lines).
- **Chips/Tags:** Small, pill-shaped elements with a Violet glow. Used for metadata like "Date" or "Location."
- **Input Fields:** Minimalist. Only a bottom border that glows Cyan when focused. Labels should float and use the `label-sm` typography style.
- **Progress Indicators:** Circular, thin-stroke loaders using the Cyan accent, designed to look like data being "materialized."
- **Interactive Scrims:** When a modal or memory is opened, the background doesn't just darken; it increases in blur, creating a sense of total immersion in the selected item.