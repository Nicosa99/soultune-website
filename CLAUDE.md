# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **WordPress website project** for **SoulTune** - a healing frequency and binaural beats mobile app. The website will promote the app and drive downloads.

**Technology Stack:**
- **Bricks Builder** (WordPress visual builder)
- **WordPress** as CMS
- **Custom HTML/CSS/JavaScript** for advanced sections
- **Glassmorphism design** aesthetic

**SoulTune App Features:**
- Real-time pitch shifting to 432 Hz and 528 Hz healing frequencies
- Binaural beats generator for meditation, sleep, focus
- 9+ preset categories including CIA Gateway protocols
- Music library integration with frequency transformation

## Repository Structure

```
/
├── Prototyp/                    # Hero section prototype
│   ├── Herore-proto.html       # HTML structure
│   ├── Heroe-proto.css         # Glassmorphism styles
│   └── heroe-proto.js          # 3D parallax interactions
│
├── Soultune Screenshots/        # App screenshots (29 MB)
│   ├── Banner.png              # Marketing banner
│   ├── custom_gen_screen.png   # Generator UI
│   ├── discovery_lab_screen.jpg # Educational content
│   ├── music_player_screen.png # Music player
│   ├── splash_screen.png       # App splash
│   └── visualizer_screen.png   # Audio visualizer
│
├── discovery_screen.dart        # REFERENCE ONLY: App screen code
├── generator_screen.dart        # REFERENCE ONLY: App screen code
├── claude.md                    # Bricks Builder expertise definition
└── CLAUDE.md                   # This file
```

**Note:** The `.dart` files are Flutter app code included ONLY as reference to understand what the app does. The website will be built in Bricks Builder/WordPress, not Flutter.

## Bricks Builder Development Approach

### Core Principle (from claude.md)

**"ALLES was wir angehen machen wir schritt für schritt, dafür vernünftig."**

Work step-by-step, thoroughly and optimized:
1. **HTML first** - Structure and content
2. **CSS second** - Styling and responsive design
3. **JavaScript third** - Interactions (wenn nötig)

Use Bricks Builder's separate code editors (HTML, CSS, JS) for each section.

### Bricks Builder Workflow

1. **Create sections** with Bricks containers
2. **Add code elements** for custom HTML/CSS/JS
3. **Build responsively** - mobile-first approach
4. **Test performance** - Core Web Vitals optimization
5. **Optimize assets** - lazy loading, image optimization

### Key Bricks Builder Elements

- **Container** - Layout structure, flexbox/grid
- **Code** - Custom HTML/CSS/JS sections
- **Heading/Text** - Typography elements
- **Button** - CTAs with hover states
- **Image** - Optimized with lazy loading
- **Video** - Background or embedded content
- **Div** - Generic wrapper for complex layouts

## Design System

### Color Palette

```css
--c-bg: #030305              /* Deep dark background */
--c-text-main: #ffffff       /* Primary white text */
--c-text-muted: #94a3b8      /* Secondary gray text */
--c-primary: #8b5cf6         /* SoulTune Purple */
--c-accent: #00ff94          /* Healing Green */
--c-gradient: linear-gradient(135deg, #8b5cf6 0%, #00ff94 100%);
```

### Glassmorphism Effect

```css
--glass-bg: rgba(255, 255, 255, 0.03);
--glass-border: rgba(255, 255, 255, 0.08);
--glass-blur: 20px;

.glass-panel {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(var(--glass-blur));
    border-radius: 16px;
}
```

### Typography

```css
/* Recommended font stack */
font-family: 'Inter', system-ui, -apple-system, sans-serif;

/* Hierarchy */
--text-hero: 64px / 1.1 / 700
--text-h1: 48px / 1.2 / 700
--text-h2: 36px / 1.3 / 600
--text-h3: 24px / 1.4 / 600
--text-body: 16px / 1.6 / 400
--text-small: 14px / 1.5 / 400
```

### Spacing System

```css
--space-xs: 8px
--space-sm: 16px
--space-md: 24px
--space-lg: 48px
--space-xl: 96px
```

### Animation Easing

```css
--ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);
--ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);
```

## Hero Section Prototype Analysis

### Structure (Herore-proto.html)

```
.st-hero (full viewport container)
  ├── .st-ambient-bg (animated background layer)
  │   ├── .st-blob--1 (purple gradient blob)
  │   ├── .st-blob--2 (green gradient blob)
  │   └── .st-grid-overlay (subtle grid pattern)
  │
  └── .st-container (content wrapper, max-width 1280px)
      ├── .st-nav (glassmorphic navigation)
      │   ├── .st-logo
      │   └── .st-nav-links
      │
      └── .st-hero-grid (2-column grid)
          ├── .st-hero-content (left column)
          │   ├── .st-badge (new feature pill)
          │   ├── .st-headline (main heading with gradient)
          │   ├── .st-subheadline (description)
          │   ├── .st-cta-group (button group)
          │   └── .st-trust (social proof)
          │
          └── .st-hero-visual (right column)
              └── .st-phone-mockup (3D phone with app preview)
```

### Interactive Features (heroe-proto.js)

**3D Parallax Phone Mockup:**
- Tracks mouse movement across hero section
- Applies subtle 3D rotation to phone (-15° to +15°)
- Smooth transitions with perspective transform
- Resets to center on mouse leave

```javascript
// Mouse tracking for parallax
xRotation = ((mouseY - centerY) / height) * -15
yRotation = ((mouseX - centerX) / width) * 15
```

### Animations (Heroe-proto.css)

**Floating Blobs:**
```css
@keyframes float {
    /* 20s infinite alternate movement */
}
```

**Key Techniques:**
- CSS Grid for hero layout
- Backdrop-filter for glassmorphism
- Transform + perspective for 3D effects
- Radial gradients with blur for ambient glow
- Mask-image for grid fade effect

## App Feature Reference

Use these when writing website copy:

### Core Features
1. **432 Hz & 528 Hz Pitch Shifting** - Transform any music to healing frequencies
2. **Binaural Beats Generator** - Custom frequency combinations
3. **9 Preset Categories** - Sleep, Meditation, Focus, Healing, Energy, CIA, OOBE, Remote Viewing, Consciousness
4. **Discovery Lab** - Educational content about frequency science
5. **Music Library Integration** - Works with user's existing music

### Frequency Science (from discovery_screen.dart)

**Healing Frequencies:**
- **432 Hz**: "Natural tuning" in harmony with nature
- **528 Hz**: "Love frequency" / DNA repair frequency
- **Solfeggio Scale**: Ancient 6-tone scale (396, 417, 528, 639, 741, 852 Hz)

**Binaural Beats:**
- **Delta (0.5-4 Hz)**: Deep sleep, healing
- **Theta (4-8 Hz)**: Meditation, REM sleep, creativity
- **Alpha (8-14 Hz)**: Relaxation, light meditation
- **Beta (14-30 Hz)**: Focus, alertness, active thinking
- **Gamma (30-100 Hz)**: Peak concentration, consciousness

**Unique Features:**
- CIA Gateway Process protocols (declassified research)
- Out of Body Experience (OOBE) programs
- Remote Viewing frequencies
- Schumann Resonance (7.83 Hz - Earth's frequency)

### Target Audience

- **Biohackers** - Optimizing mental/physical performance
- **Meditators** - Deepening practice with audio tools
- **Consciousness Explorers** - CIA Gateway, OOBE, Remote Viewing
- **Audiophiles** - Appreciating frequency precision
- **Wellness Seekers** - Natural stress reduction and healing

### Brand Voice

- **Tone**: Scientific yet mystical, grounded yet curious
- **Language**: Accessible but credible (cite research)
- **Trust Signals**: CIA documents, peer-reviewed studies, Monroe Institute
- **Differentiation**: Real-time AI pitch shifting (not just preset tracks)
- **Ethics**: Wellness tool, not medical device (no health claims)

## Content Strategy

### Homepage Sections (Recommended)

1. **Hero** - Transform Music to Healing Frequencies
2. **Problem** - Stress, poor sleep, difficulty focusing
3. **Solution** - Science-backed frequency technology
4. **Features** - 432/528 Hz, binaural beats, presets
5. **Science** - CIA Gateway, research citations
6. **App Preview** - Screenshots with captions
7. **Testimonials** - User experiences
8. **FAQ** - How it works, safety, compatibility
9. **CTA** - Download app (iOS/Android)

### Copy Guidelines

**Headlines:**
- Clear benefit-focused
- Use power words: Transform, Unlock, Experience, Discover
- Include specifics: "432 Hz & 528 Hz"

**Body Copy:**
- Short paragraphs (2-3 sentences)
- Bullet points for features
- Scientific backing without jargon
- Social proof and credibility markers

**CTAs:**
- Primary: "Download Alpha" / "Get Early Access"
- Secondary: "View Research" / "Learn More"
- Urgent: "Limited Alpha Spots"

## Responsive Design

### Breakpoints

```css
/* Mobile First */
.st-hero-grid {
    grid-template-columns: 1fr; /* Stack on mobile */
    gap: 32px;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
    .st-hero-grid {
        grid-template-columns: 1fr 1fr; /* Side-by-side */
        gap: 48px;
    }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
    .st-container {
        padding: 3rem;
    }
}
```

### Mobile Optimizations

- Reduce hero font sizes (48px → 32px)
- Stack navigation links vertically
- Simplify phone mockup (less 3D effects)
- Disable parallax on touch devices
- Optimize blob blur (80px → 40px)

## Performance Optimization

### Bricks Builder Settings

- **Lazy load images** - Enable for all images below fold
- **Defer JavaScript** - Non-critical scripts
- **Minify CSS/JS** - Production mode
- **Critical CSS** - Inline above-fold styles
- **Preload fonts** - Inter font files
- **Optimize database** - Regular cleanup

### Image Optimization

- **Format**: WebP with JPEG fallback
- **Sizes**: Responsive srcset
- **Compression**: 80% quality
- **Dimensions**: Max 1920px width
- **Screenshots**: Compress to ~200-500 KB each

### Animation Performance

```css
/* Use transform and opacity only */
.st-phone-mockup {
    will-change: transform; /* GPU acceleration */
    transform: translateZ(0); /* Force GPU layer */
}

/* Avoid animating: width, height, margin, padding */
```

## Common Tasks

### Adding a New Section in Bricks

1. **Create Container** - Set width, padding, background
2. **Add Code Element** - Choose HTML/CSS/JS tabs
3. **HTML Tab** - Write semantic structure
4. **CSS Tab** - Add styles with CSS variables
5. **JS Tab** - Add interactions if needed
6. **Test Responsive** - Check mobile/tablet/desktop
7. **Optimize** - Lazy load, defer scripts

### Implementing Glassmorphism

```html
<!-- HTML -->
<div class="glass-card">
    <h3>Feature Title</h3>
    <p>Description text</p>
</div>
```

```css
/* CSS */
.glass-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    padding: 32px;
}
```

### Adding App Screenshots

1. **Optimize image** - WebP, ~300 KB target
2. **Upload to Media Library**
3. **Add Image Element** in Bricks
4. **Set alt text** - Describe screen content
5. **Enable lazy loading**
6. **Add caption** - Explain feature shown

### Integrating Download Links

```html
<!-- iOS -->
<a href="https://apps.apple.com/app/soultune" class="st-btn st-btn--primary">
    <svg><!-- Apple icon --></svg>
    <span>Download for iOS</span>
</a>

<!-- Android -->
<a href="https://play.google.com/store/apps/details?id=com.soultune" class="st-btn st-btn--primary">
    <svg><!-- Android icon --></svg>
    <span>Download for Android</span>
</a>
```

## SEO & Accessibility

### Meta Information

```html
<title>SoulTune - Transform Music to 432 Hz & 528 Hz Healing Frequencies</title>
<meta name="description" content="AI-powered music player that shifts your library to healing frequencies. Experience scientifically proven stress reduction with binaural beats and Solfeggio frequencies.">
```

### Schema Markup

```json
{
  "@type": "MobileApplication",
  "name": "SoulTune",
  "operatingSystem": "iOS, Android",
  "applicationCategory": "HealthApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

### Accessibility

- **Alt text** on all images
- **ARIA labels** on interactive elements
- **Color contrast** - WCAG AA minimum (4.5:1)
- **Keyboard navigation** - All interactive elements
- **Focus states** - Visible focus indicators
- **Semantic HTML** - Proper heading hierarchy

## Development Workflow

1. **Design Review** - Finalize mockups and copy
2. **Setup WordPress** - Install Bricks Builder
3. **Create Prototype** - Convert HTML/CSS/JS to Bricks
4. **Build Sections** - One at a time, top to bottom
5. **Add Content** - Copy, images, videos
6. **Test Responsive** - Mobile, tablet, desktop
7. **Optimize Performance** - Images, scripts, fonts
8. **SEO Setup** - Meta, schema, sitemap
9. **Launch** - Domain, hosting, SSL

## Notes

- `README_APP.md` is unrelated (web scraper docs) - ignore it
- `claude.md` contains Bricks Builder expertise definition
- Flutter `.dart` files are reference only - not part of the website build
- Screenshots folder is 29 MB - optimize before using on web
