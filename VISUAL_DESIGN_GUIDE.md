# RealityMind - Visual Design Guide

## 🎨 Complete Visual Design System

This document provides a visual and detailed guide to all design elements used in RealityMind.

---

## 📐 Color System

### Primary Colors

#### Blue - Primary Actions
```
Color: #3b82f6
RGB: (59, 130, 246)
Usage: Buttons, links, highlights, active states
HSL: 217, 98%, 60%
```

#### Green - Secondary/Success
```
Color: #10b981
RGB: (16, 185, 129)
Usage: Success states, secondary buttons, positive feedback
HSL: 160, 84%, 39%
```

#### Red - Danger
```
Color: #ef4444
RGB: (239, 68, 68)
Usage: Error messages, delete actions, warnings
HSL: 0, 84%, 60%
```

#### Amber - Warning
```
Color: #f59e0b
RGB: (245, 158, 11)
Usage: Warnings, cautions, pending states
HSL: 38, 92%, 50%
```

### Background Colors

#### Dark Theme
```
Primary Dark:      #0f172a  (Navy)
Secondary Dark:    #0a0e27  (Darker Navy)
Dark Header/Nav:   #1f2937  (Dark Gray)
Dark Sidebar:      #111827  (Very Dark)
```

#### Light Theme
```
Light Background:  #f8fafc  (Off-white)
White Cards:       #ffffff  (Pure White)
Light Text:        #f1f5f9  (Light Gray)
```

### Neutral Colors
```
Text Primary:      #1e293b  (Dark Slate)
Text Secondary:    #475569  (Medium Slate)
Text Muted:        #64748b  (Muted Slate)
Text Light:        #cbd5e1  (Light Slate)
Border Color:      #e2e8f0  (Border Gray)
```

---

## 🔤 Typography System

### Font Family
```
Primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen'
Secondary: Google Fonts: Inter, Poppins
Fallback: sans-serif
```

### Size Scale
```
Extra Small (xs):  12px   - Labels, tags, hints
Small (sm):        14px   - Secondary text, helpers
Base:              16px   - Body text, paragraphs
Large (lg):        18px   - Subheadings, larger content
Extra Large (xl):  20px   - Section headers
2XL:               24px   - Page sections
3XL:               30px   - Hero titles
```

### Font Weights
```
Light:     300  - (Not commonly used)
Normal:    400  - Body text, regular content
Medium:    500  - Emphasized text
Semibold:  600  - Subheadings, button text
Bold:      700  - Headings, important content
```

### Line Heights
```
Headings:  1.2  - Tight for visual impact
Body:      1.6  - Comfortable reading
Small:     1.5  - Secondary text
```

---

## 📏 Spacing System

### 8px Grid Foundation
```
xs:   4px   - Minimal spacing, tight
sm:   8px   - Button gaps, input padding
md:   16px  - Default padding, margins
lg:   24px  - Section padding
xl:   32px  - Large spacing between sections
2xl:  48px  - Hero section padding
```

### Application Examples
```
Button Padding:     $spacing-sm $spacing-lg      (8px 24px)
Input Padding:      $spacing-md                  (16px)
Section Padding:    $spacing-2xl 0               (48px top/bottom)
Card Padding:       $spacing-lg                  (24px)
Header Height:      56px (3.5x grid)
Sidebar Width:      260px (varies responsive)
```

---

## ✨ Shadow System

### Depth Levels

#### Shadow Small (Subtle)
```scss
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
Usage: Minimal elevation, subtle depth
```

#### Shadow Medium (Default)
```scss
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
Usage: Card shadows, moderate elevation
```

#### Shadow Large (Prominent)
```scss
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
Usage: Hover states, modal windows
```

#### Shadow Extra Large (Strongest)
```scss
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
Usage: Important overlays, dropdowns
```

---

## 🔲 Border Radius System

### Sizes
```
Small (sm):    4px   - Minimal rounding
Medium (md):   6px   - Small elements
Default (lg):  8px   - Most elements
Large (xl):    12px  - Larger containers
Extra Large:   16px  - Hero sections, large cards
Full (rounded): 50%  - Perfect circles
```

### Application
```
Buttons:       $radius-lg  (8px)
Inputs:        $radius-lg  (8px)
Cards:         $radius-xl  (12px)
Hero/Banner:   $radius-2xl (16px)
Badges:        $radius-md  (6px)
```

---

## ⚡ Motion & Animations

### Timing Functions
```
Fast:          0.15s ease-in-out  - Micro-interactions
Normal:        0.3s ease-in-out   - Standard animations
Slow:          0.5s ease-in-out   - Large movements
Instant:       Immediate          - No animation
```

### Keyframe Animations

#### Slide Animations
- `slideInUp` - Slides up 20px with fade
- `slideInRight` - Slides right 20px with fade
- `slideInLeft` - Slides left 30px with fade

#### Fade Animations
- `fadeInLeft` - Fades in from left (-30px)
- `fadeInRight` - Fades in from right (30px)

#### Float Animation
```
@keyframes float {
  0%, 100%:  translateY(0px)
  50%:       translateY(-10px)
  Duration:  3-8s infinite
}
Used for: Icons, decorative elements
```

#### Spin Animation
```
@keyframes spin {
  0%:   rotate(0deg)
  100%: rotate(360deg)
  Duration: 0.8s linear infinite
}
Used for: Loading spinners
```

#### Shake Animation
```
@keyframes shake {
  0%, 100%:  translateX(0)
  25%:       translateX(-10px)
  75%:       translateX(10px)
  Duration: 0.4s
}
Used for: Error messages
```

#### Count Animation
```
@keyframes countUp {
  from:  opacity(0), scale(0.5)
  to:    opacity(1), scale(1)
  Duration: 0.8s
}
Used for: Statistics numbers
```

---

## 📱 Responsive Breakpoints

### Mobile-First Approach
```
Default:        Mobile first (< 640px)
Small (sm):     640px  - Large phones
Medium (md):    768px  - Tablets
Large (lg):     1024px - Desktops
Extra Large:    1280px - Large desktops
2XL:            1536px - Ultra-wide
```

### Responsive Adjustments
```
Mobile:     Full width, stacked layout, 16px font
Tablet:     2-column grid, larger touch targets
Desktop:    Multi-column, optimized width (max 1280px)
```

---

## 🎯 Component Styling Details

### Button Styles

#### Primary Button
```
Background:  Linear gradient (#3b82f6 → #1e40af)
Color:       White
Padding:     12px 24px
Border:      None
Radius:      8px
Hover:       Darker gradient, shadow, -2px translateY
Active:      -1px translateY
```

#### Secondary Button
```
Background:  White
Color:       #3b82f6 (Primary)
Border:      2px solid #3b82f6
Padding:     12px 24px
Radius:      8px
Hover:       #dbeafe background, shadow
```

#### Danger Button
```
Background:  #ef4444
Color:       White
Padding:     12px 24px
Border:      None
Radius:      8px
Hover:       Darker red, shadow
```

### Form Inputs

#### Base Input
```
Border:      2px solid #e2e8f0
Border-Radius: 8px
Padding:     12px 16px
Font-Size:   16px (prevents mobile zoom)
Transition:  All 0.15s ease-in-out

States:
- Hover:     Border #3b82f6, soft shadow
- Focus:     Border #3b82f6, strong shadow
- Disabled:  Background #f1f5f9, opacity 0.6
```

#### Floating Icon
```
Position:    Absolute left 16px
Font-Size:   18px
Pointer-Events: None (allows input focus)
Z-Index:     1
```

### Cards

#### Base Card
```
Background:  White
Border:      1px solid #e2e8f0
Border-Radius: 12px
Padding:     24px
Box-Shadow:  $shadow-md
Transition:  All 0.3s ease-out

Hover:       Transform translateY(-8px), $shadow-lg
```

### Alert Messages

#### Danger Alert
```
Background:  #fee2e2
Border:      1px solid #fecaca
Color:       #b91c1c
Padding:     16px
Border-Radius: 8px
Animation:   shake 0.4s ease-in-out
```

#### Success Alert
```
Background:  #dcfce7
Border:      1px solid #bbf7d0
Color:       #166534
Padding:     16px
Border-Radius: 8px
```

---

## 🌈 Gradient Usage

### Primary Gradient (Blue)
```scss
background: linear-gradient(135deg, #3b82f6, #1e40af);
Used for: Primary buttons, hero section overlay
```

### Secondary Gradient (Green)
```scss
background: linear-gradient(135deg, #10b981, #047857);
Used for: Secondary buttons, success states
```

### Dark Gradient (Header/Sidebar)
```scss
background: linear-gradient(180deg, #0f172a, #0a0e27);
Used for: Header, sidebar, dark sections
```

### Text Gradient
```scss
background: linear-gradient(135deg, #3b82f6, #10b981);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
Used for: Hero titles
```

---

## ♿ Accessibility Features

### Color Contrast
```
Text on Light:   #1e293b on #f8fafc  (Ratio: 18:1)
Text on Dark:    #f1f5f9 on #0f172a  (Ratio: 15:1)
Links:           #3b82f6 on white    (Ratio: 5.5:1)
All WCAG AA compliant (4.5:1 minimum)
```

### Interactive Elements
```
Buttons:         Min 44px height (mobile), 48px width
Links:           Underlined on hover for clarity
Focus:           Visible focus indicators (2px outline)
Icons:           Paired with text labels
Error Messages:  Color + text + icon (not color-only)
```

### Typography
```
Line Height:     1.6 for body text (comfortable reading)
Letter Spacing:  Adequate for legibility
Font Size:       Min 14px for body text
Contrast:        All text meets WCAG AA standards
```

---

## 📊 Component Proportions

### Header
```
Height:           56px
Logo Font Size:   24px
Logo Icon:        28px emoji
Nav Links:        18px font
Padding:          16px vertical
```

### Sidebar
```
Width:            260px (responsive)
Item Height:      40px + padding
Icon Size:        18px
Text Size:        14px
Spacing:          8px between items
```

### Card
```
Width:            Responsive (300-400px min)
Height:           Auto
Padding:          24px
Icon Size:        40-48px
Title Size:       18px bold
```

### Form Fields
```
Height:           44px (including padding)
Padding:          12px vertical, 16px horizontal
Label:            14px bold above
Input:            16px (mobile zoom prevention)
Spacing:          16px between fields
```

---

## 🎬 Animation Sequences

### Form Submission
```
1. Button shows spinner (0.3s)
2. Button opacity decreases (disabled state)
3. On success: Fade message in (0.4s)
4. On error: Shake animation (0.4s)
```

### Navigation
```
1. Link hover: Color change (0.15s)
2. Active route: Slide background (0.3s)
3. Sidebar on mobile: Slide from left (0.3s)
```

### Hero Section
```
1. Logo floats (3s infinite)
2. Buttons slide up (0.8s with stagger)
3. Cards slide from right (0.8s with stagger)
4. Backgrounds have subtle animation
```

---

## 💾 CSS Variable Summary

```scss
// Colors (27 variables)
$primary-color, $primary-dark, $primary-light
$secondary-color, $secondary-dark
$danger-color, $warning-color, $success-color
$bg-dark, $bg-darker, $bg-light
$text-dark, $text-light, $border-color
$shadow-color

// Spacing (6 variables)
$spacing-xs, $spacing-sm, $spacing-md
$spacing-lg, $spacing-xl, $spacing-2xl

// Typography (11 variables)
$font-family, $font-size-xs through $font-size-3xl
$font-weight-normal through $font-weight-bold

// Border Radius (5 variables)
$radius-sm, $radius-md, $radius-lg
$radius-xl, $radius-2xl

// Transitions (3 variables)
$transition-fast, $transition-normal, $transition-slow

// Breakpoints (5 variables)
$breakpoint-sm, $breakpoint-md, $breakpoint-lg
$breakpoint-xl, $breakpoint-2xl

// Shadows (4 variables)
$shadow-sm, $shadow-md, $shadow-lg, $shadow-xl
```

---

## 🔄 State Design

### Normal State
```
Default appearance
No special styling
Natural colors
```

### Hover State
```
Subtle color shift
Slight elevation (shadow increase)
Cursor changes
Smooth transition (0.15s)
```

### Active State
```
Darker color
Full elevation (maximum shadow)
Possible scale/translate
Animation feedback
```

### Disabled State
```
Reduced opacity (0.6)
Grayscale appearance
No hover effects
Cursor: not-allowed
```

### Loading State
```
Spinner animation
Button text changes
Disabled interaction
0.8s rotation
```

### Error State
```
Red color (#ef4444)
Shake animation
Alert message
Icon indicator
```

### Success State
```
Green color (#10b981)
Checkmark or confirmation
Brief animation
Fade out after 2-3s
```

---

## 📐 Grid Layout

### Hero Section Grid
```
Desktop:   2 columns (1fr 1fr)
Tablet:    1 column (stacked)
Mobile:    1 column (stacked)
Gap:       24px
```

### Features Grid
```
Desktop:   3 columns (auto-fit, 300px min)
Tablet:    2 columns
Mobile:    1 column
Gap:       24px
```

### Stats Grid
```
Desktop:   4 columns
Tablet:    2 columns
Mobile:    1 column
Gap:       24px
```

---

## 🎓 Design Tokens Hierarchy

```
1. Colors      → Used for backgrounds, text, borders
2. Spacing     → Used for padding, margins, gaps
3. Typography  → Used for all text elements
4. Shadows     → Used for depth and elevation
5. Radius      → Used for rounded corners
6. Transitions → Used for animations
7. Breakpoints → Used for responsive design
```

---

## ✅ Design Consistency Checklist

- [ ] All buttons use design system colors
- [ ] All spacing uses 8px grid
- [ ] All text uses defined font sizes
- [ ] All shadows use shadow system
- [ ] All radius matches component type
- [ ] All animations use defined timings
- [ ] All colors meet WCAG AA contrast
- [ ] All interactions have feedback
- [ ] All elements are responsive
- [ ] All touch targets 44px minimum

---

**Design System Version:** 1.0.0
**Last Updated:** December 2024

This visual design guide ensures consistency and quality across the entire RealityMind application!
