---
name: Lumina Code Logic
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#ffb783'
  on-tertiary: '#4f2500'
  tertiary-container: '#d97721'
  on-tertiary-container: '#452000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  container-max: 1440px
---

## Brand & Style

The design system is engineered for a premium, developer-centric ecosystem where artificial intelligence acts as a sophisticated mentor. The aesthetic sits at the intersection of **Minimalism** and **Glassmorphism**, emphasizing clarity, focus, and technical precision.

The UI evokes a sense of "quiet intelligence"—a workspace that feels both futuristic and highly stable. By utilizing deep charcoal surfaces and sharp, glowing accents, the design system provides a high-contrast environment that reduces eye strain during long coding sessions while maintaining a prestigious, high-end SaaS atmosphere. It is professional without being cold, and technical without being cluttered.

## Colors

The palette is anchored in a true dark-mode experience. 
- **Primary (Intelligent Indigo):** Used for primary actions, active states, and AI-driven insights.
- **Secondary (Technical Cyan):** Reserved for technical highlights, status indicators, and secondary data visualizations.
- **Backgrounds:** The foundation uses a deep charcoal (#0A0A0B), while elevated surfaces utilize a slightly lighter slate (#161618) to create structural hierarchy.
- **Borders:** Thin, low-contrast borders (#262626) are the primary method of element separation, replacing heavy shadows to maintain a clean, architectural feel.

## Typography

This design system utilizes **Geist** for its core interface language, providing a clean, technical, and highly legible sans-serif experience that feels native to developer tools. **JetBrains Mono** is employed for code snippets, terminal outputs, and metadata labels to reinforce the technical nature of the platform.

Text should follow a strict hierarchy. Headlines use tighter letter spacing to feel "locked-in" and authoritative. Body text prioritizes generous line-height to ensure readability of complex technical explanations. Monospaced elements are treated with a slightly smaller font size to balance their visual weight against the sans-serif body text.

## Layout & Spacing

The layout follows a **Fluid Grid** model based on an 8px rhythmic scale. On desktop, a 12-column grid is used with 24px gutters to allow for complex multi-pane developer interfaces (e.g., Code Editor, AI Chat, and File Explorer side-by-side).

Spacing should be used to group related technical concepts. Compact spacing (8px-12px) is used within component internals (like button groups or list items), while larger "breathable" spacing (32px-48px) is used to separate major sections of the dashboard. Margins adapt from 16px on mobile to 40px on large displays to maintain a premium, expansive feel.

## Elevation & Depth

Hierarchy in this design system is achieved through **Tonal Layers** and **Subtle Glassmorphism** rather than traditional heavy shadows.

1.  **Level 0 (Base):** #0A0A0B - The main canvas background.
2.  **Level 1 (Surface):** #161618 - Primary containers and cards.
3.  **Level 2 (Floating):** Glassmorphic overlays with a 12px backdrop blur and a 10% white tint. This is reserved for modals, dropdowns, and sticky navigation headers.
4.  **Borders:** Every container must have a 1px solid border (#262626). For active or "AI-focused" states, the border can transition to a subtle Indigo glow.

Depth is communicated by "stacking" lighter shades of gray on darker ones, creating a sense of physical layering without breaking the minimalist aesthetic.

## Shapes

The shape language is refined and "Softly Technical." The design system uses **Level 2 Roundedness** to balance the precision of code with the approachability of a mentor.

- **Standard Elements (Buttons, Inputs):** 8px (0.5rem) radius.
- **Containers (Cards, Section Wrappers):** 16px (1rem) radius.
- **Large Layout Blocks:** 24px (1.5rem) radius for outer-most container wrappers to create a "contained" app-like feel.

Interactive elements should maintain consistent corner radii to ensure the UI feels like a single, cohesive tool.

## Components

### Buttons
Primary buttons use a solid Indigo (#6366F1) background with white text. Secondary buttons are "Ghost" style with #262626 borders and a subtle hover state that increases background opacity.

### Cards & Surfaces
Cards utilize the Slate (#161618) background with a 1px border. For AI-recommended content, cards may feature a very subtle top-border gradient transitioning from Indigo to Cyan.

### Input Fields
Inputs are dark-filled (#0A0A0B) with #262626 borders. On focus, the border color shifts to Indigo with a 2px outer "glow" (blur).

### Code Blocks
Code containers should have a slightly darker, recessed look with JetBrains Mono typography. Syntax highlighting must be curated to contrast against the charcoal background, using the Indigo and Cyan accents for keywords and functions.

### Chips & Badges
Chips use a low-opacity Indigo tint (e.g., Indigo at 15% opacity) with a solid Indigo border, making them appear "lit" from within.

### AI Mentor Indicator
A specific "Lumina" component: A small, glassmorphic floating element with a Technical Cyan glow, used whenever the AI is processing or providing a suggestion.