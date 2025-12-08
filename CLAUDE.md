# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SoulTune** is a healing frequency and binaural beats application that transforms music into therapeutic frequencies (432 Hz, 528 Hz) and generates custom binaural beats for meditation, focus, sleep, and consciousness exploration.

The repository contains:
1. **Flutter app screens** - Core UI components from the mobile app
2. **Website prototype** - Landing page design in HTML/CSS/JS
3. **App screenshots** - Visual references for the app design

## Repository Structure

```
/
├── discovery_screen.dart       # Educational content screen (Flutter)
├── generator_screen.dart       # Frequency generator UI (Flutter)
├── Prototyp/                   # Website landing page prototype
│   ├── Herore-proto.html      # Hero section HTML
│   ├── Heroe-proto.css        # Glassmorphism styles
│   └── heroe-proto.js         # Interactive animations
├── Soultune Screenshots/       # App UI screenshots
│   ├── Banner.png
│   ├── custom_gen_screen.png
│   ├── discovery_lab_screen.jpg
│   ├── music_player_screen.png
│   ├── splash_screen.png
│   └── visualizer_screen.png
└── README_APP.md              # (Unrelated web scraper docs - ignore)
```

## Key Concepts

### Healing Frequencies
- **432 Hz**: "Natural tuning" frequency believed to be in harmony with nature
- **528 Hz**: "Love frequency" or "DNA repair frequency" from Solfeggio scale
- **Real-time pitch shifting**: Converts user's music library to healing frequencies

### Binaural Beats
The app generates binaural beats by playing slightly different frequencies in each ear:
- **Delta (0.5-4 Hz)**: Deep sleep, healing
- **Theta (4-8 Hz)**: Meditation, creativity, REM sleep
- **Alpha (8-14 Hz)**: Relaxation, light meditation
- **Beta (14-30 Hz)**: Focus, alertness
- **Gamma (30-100 Hz)**: Peak concentration, consciousness

### Preset Categories
The generator organizes presets into categories:
- **Sleep**: Deep rest and sleep induction
- **Meditation**: Mindfulness and relaxation
- **Focus**: Concentration and productivity
- **Healing**: Physical and emotional healing
- **Energy**: Vitality and motivation
- **CIA Gateway**: Based on declassified CIA research on altered consciousness
- **OOBE (Out of Body Experience)**: Astral projection protocols
- **Remote Viewing**: Psychic perception techniques
- **Consciousness**: Advanced awareness exploration

## Flutter App Architecture

### Screen Structure

**discovery_screen.dart** (2,184 lines)
- Educational content about brain synchronization
- CIA Gateway Process information
- Scientific research references
- How-to guides for using the app
- Links to external research and documentation
- Uses `flutter_riverpod` for state management
- Expansion tiles for organized content sections

**generator_screen.dart** (608+ lines)
- Tabbed interface with 9 categories
- Preset browsing and selection
- Integration with audio player
- Premium feature gating
- Custom generator and binaural editor access
- Real-time playback controls

### Dependencies (inferred from imports)
```dart
flutter/material.dart          // UI framework
flutter_riverpod              // State management
url_launcher                  // External links
```

### Key Providers (referenced)
```dart
currentGeneratorPresetProvider    // Currently selected preset
generatorIsPlayingProvider        // Playback state
premiumStatusProvider            // Premium subscription status
```

## Website Prototype

### Design System

The prototype uses a modern **glassmorphism** design with:

**Color Palette:**
```css
--c-bg: #030305              /* Deep dark background */
--c-text-main: #ffffff       /* White text */
--c-text-muted: #94a3b8      /* Muted gray */
--c-primary: #8b5cf6         /* SoulTune Purple */
--c-accent: #00ff94          /* Healing Green */
```

**Glassmorphism Effect:**
```css
--glass-bg: rgba(255, 255, 255, 0.03)
--glass-border: rgba(255, 255, 255, 0.08)
--glass-blur: 20px
```

### Component Structure

The hero section (`Prototyp/Herore-proto.html`) includes:
1. **Ambient background** with animated gradient blobs and grid overlay
2. **Navigation bar** with glassmorphic styling
3. **Two-column hero layout**:
   - Left: Marketing copy, CTAs, trust indicators
   - Right: Phone mockup with app preview
4. **Animated elements** powered by heroe-proto.js

### Interactive Features (heroe-proto.js)

Expected animations:
- Floating blob animations (20s infinite alternate)
- Parallax effects on scroll
- Phone mockup interactions
- Smooth transitions with cubic-bezier easing

## Working with This Repository

### Flutter Screens

When modifying Flutter screens:
1. These are **partial files** from a larger app - they reference packages and providers not in this repo
2. Focus on UI/UX improvements, copy changes, and layout modifications
3. State management uses Riverpod - providers are defined elsewhere
4. Follow Flutter Material Design 3 patterns (already implemented)
5. Maintain accessibility with semantic labels and proper contrast

### Website Prototype

When updating the website:
1. **HTML** (`Herore-proto.html`): Semantic structure, no inline styles
2. **CSS** (`Heroe-proto.css`): CSS custom properties for theming, mobile-first responsive design
3. **JavaScript** (`heroe-proto.js`): Vanilla JS, no framework dependencies
4. Test glassmorphism effects in modern browsers (Chrome, Firefox, Safari)
5. Ensure animations are performant (use transforms and opacity)

### Design Consistency

Maintain these visual principles:
- **Dark theme**: Deep blacks with purple/green accents
- **Glassmorphism**: Frosted glass effects with subtle borders
- **Typography**: Clean, readable fonts (Inter for web)
- **Spacing**: Generous whitespace for breathing room
- **Gradients**: Purple to green for primary brand gradient
- **Motion**: Smooth, natural easing functions

### Content Guidelines

When writing copy:
- **Scientific but accessible**: Reference research without jargon
- **Trust-building**: Cite CIA documents, peer-reviewed studies
- **Clear benefits**: Focus on outcomes (better sleep, focus, healing)
- **Ethical**: No medical claims, position as wellness tool
- **Educational**: Explain how frequencies work

## Technical Notes

### Missing Build System

This repository contains source files only. To integrate:

**For Flutter screens:**
- Add to a Flutter project with matching dependencies
- Ensure these packages are in `pubspec.yaml`:
  - `flutter_riverpod`
  - `url_launcher`
- Set up corresponding provider files
- Import the frequency preset models and services

**For website:**
- Serve with any static web server
- No build process required (vanilla HTML/CSS/JS)
- For production: minify CSS/JS and optimize images

### Code Organization

The Flutter code follows clean architecture patterns:
```
features/
  generator/
    presentation/
      screens/           # UI screens (this repo)
      widgets/          # Reusable components
      providers/        # State management
    data/
      models/           # FrequencyPreset, PresetCategory
    domain/            # Business logic
```

## Common Tasks

### Adding a New Frequency Preset

1. Define preset in the predefined presets model (not in this repo)
2. Update `generator_screen.dart` if adding new category
3. Add corresponding info to `discovery_screen.dart` educational content
4. Update website copy if highlighting the new preset

### Updating Discovery Content

Edit `discovery_screen.dart`:
- Each section is an `_buildXSection()` method
- Uses `ExpansionTile` for collapsible content
- Add external links with `url_launcher`
- Include trust signals (research papers, CIA documents)

### Modifying Website Design

1. **Colors**: Update CSS custom properties in `:root` or `.st-hero`
2. **Layout**: Modify `.st-hero-grid` for different arrangements
3. **Animations**: Adjust keyframes and timing functions
4. **Glassmorphism**: Tune `--glass-*` variables for different effects

### Responsive Design

The website prototype uses:
```css
/* Mobile-first approach */
.st-hero-grid {
    /* Mobile: stacked */
    grid-template-columns: 1fr;
}

@media (min-width: 768px) {
    /* Desktop: side-by-side */
    grid-template-columns: 1fr 1fr;
}
```

## Brand Voice

When writing content:
- **Tone**: Scientific yet mystical, grounded but curious
- **Audience**: Biohackers, meditators, consciousness explorers, audiophiles
- **Message**: Ancient wisdom meets modern science
- **Differentiator**: AI-powered real-time pitch shifting (not just preset tracks)

## External References

The app references these real-world sources:
- **CIA Gateway Process**: Declassified document on consciousness exploration
- **Monroe Institute**: Hemi-Sync and binaural beat research
- **Solfeggio Frequencies**: Ancient musical scale (396, 417, 528, 639, 741, 852 Hz)
- **Schumann Resonance**: Earth's electromagnetic frequency (7.83 Hz)

These should be accurately represented in educational content.
