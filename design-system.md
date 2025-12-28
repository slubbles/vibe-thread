# VibeThread Design System

Inspired by Polar.sh's minimalist dark aesthetic, this design system provides a cohesive, professional look for VibeThread.

## 🎨 Color Palette

### Background Colors
- **Primary Background**: `#070708` - Deep dark for main backgrounds
- **Secondary Background**: `#171719` - Slightly lighter for cards and panels
- **Tertiary Background**: `#0f0f10` - Even darker for nested elements

### Border Colors
- **Primary Border**: `#1d1d20` - Subtle borders for cards and inputs
- **Hover Border**: `#2a2a2d` - Slightly brighter for hover states

### Text Colors
- **Primary Text**: `#ffffff` - Pure white for headings and important text
- **Secondary Text**: `#d7d7db` - Off-white for body text
- **Muted Text**: `#6f717b` - Gray for secondary information and placeholders

### Accent Colors
- **Primary Accent**: `#5de4c7` - Mint green for Pro badges and highlights
- **Button Primary**: `#ffffff` - White buttons with black text (inverted style)
- **Button Hover**: `#f0f0f0` - Slightly gray for button hovers

## 📏 Spacing Scale

Following Polar's generous spacing approach:

```css
/* CSS Variables (from globals.css) */
--spacing-0_5: 0.125rem;  /* 2px */
--spacing-1: 0.25rem;     /* 4px */
--spacing-2: 0.5rem;      /* 8px */
--spacing-3: 0.75rem;     /* 12px */
--spacing-4: 1rem;        /* 16px */
--spacing-5: 1.25rem;     /* 20px */
--spacing-6: 1.5rem;      /* 24px */
--spacing-8: 2rem;        /* 32px */
--spacing-10: 2.5rem;     /* 40px */
--spacing-12: 3rem;       /* 48px */
--spacing-16: 4rem;       /* 64px */
--spacing-20: 5rem;       /* 80px */
--spacing-24: 6rem;       /* 96px */
--spacing-32: 8rem;       /* 128px */
```

### Common Usage
- **Card Padding**: `py-6 px-6` (24px)
- **Section Spacing**: `py-12` (48px) or `py-24` (96px) for heroes
- **Element Gaps**: `gap-4` (16px) or `gap-6` (24px)

## 🔲 Border Radius

Polar uses rounded, friendly corners:

```css
--radius-xs: 0.475rem;   /* 7.6px */
--radius-sm: 0.625rem;   /* 10px */
--radius-md: 0.825rem;   /* 13.2px */
--radius-lg: 1rem;       /* 16px */
--radius-xl: 1.5rem;     /* 24px */
--radius-2xl: 2rem;      /* 32px */
```

### Component Usage
- **Cards**: `rounded-xl` (24px) or `rounded-2xl` (32px)
- **Buttons**: `rounded-xl` (24px)
- **Inputs**: `rounded-xl` (24px)
- **Small Elements**: `rounded-lg` (16px)

## 📝 Typography

### Font Weights
Following Polar's medium-weight approach:

- **Headings**: `font-bold` (700) for main headings
- **Subheadings**: `font-medium` (500) for section titles
- **Body**: `font-normal` (400) for regular text
- **Buttons**: `font-medium` (500) for buttons

### Text Hierarchy
```tsx
// Hero Title
<h1 className="text-5xl md:text-6xl font-bold text-white">

// Section Title
<h2 className="text-3xl font-bold text-white">

// Card Title
<h3 className="text-lg font-medium text-white">

// Body Text
<p className="text-[#6f717b]">

// Small Text
<p className="text-sm text-[#6f717b]">
```

## 🎯 Components

### Buttons

#### Primary (White on Dark)
```tsx
<button className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-[#f0f0f0] transition">
  Generate Thread
</button>
```

#### Secondary (Outlined)
```tsx
<button className="px-4 py-2 rounded-xl border border-[#1d1d20] text-white hover:bg-[#171719] transition">
  Sign Out
</button>
```

### Cards

```tsx
<div className="bg-[#171719] rounded-xl border border-[#1d1d20] p-6">
  <h3 className="font-medium text-white mb-2">Card Title</h3>
  <p className="text-[#6f717b]">Card description</p>
</div>
```

### Inputs

```tsx
<input
  className="w-full px-4 py-3 rounded-xl border border-[#1d1d20] bg-[#171719] text-white placeholder-[#6f717b] focus:ring-2 focus:ring-[#5de4c7] focus:border-transparent"
  placeholder="Enter text..."
/>
```

### Navigation

```tsx
<nav className="border-b border-[#1d1d20]">
  <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
    <div className="text-2xl font-bold text-white">VibeThread</div>
    <div className="flex items-center gap-6">
      <a className="text-sm text-[#6f717b] hover:text-white transition">Home</a>
    </div>
  </div>
</nav>
```

## 🎨 Tailwind Classes Reference

### Most Common Patterns

**Backgrounds:**
- `bg-[#070708]` - Page background
- `bg-[#171719]` - Card background
- `bg-white` - Primary buttons

**Text:**
- `text-white` - Headings
- `text-[#6f717b]` - Body/muted
- `text-black` - Button text (on white)

**Borders:**
- `border border-[#1d1d20]` - Standard borders
- `hover:border-[#2a2a2d]` - Hover state

**Spacing:**
- `py-24` - Large section padding
- `p-6` - Card padding
- `gap-6` - Element spacing

**Border Radius:**
- `rounded-xl` - Buttons, inputs
- `rounded-2xl` - Cards, large elements

## 🌟 Accent Usage

The mint green accent (`#5de4c7`) is used sparingly for:
- Pro/Active badges
- Focus rings on inputs
- Highlighted navigation items
- Loading spinners

```tsx
// Pro Badge
<span className="px-3 py-1 rounded-xl bg-[#5de4c7] text-black font-medium">
  Pro
</span>

// Active Link
<span className="text-sm font-medium text-[#5de4c7]">
  Generate
</span>
```

## 📱 Responsive Design

All components should be mobile-first with responsive breakpoints:

```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
```

## ✨ Transitions

All interactive elements should have smooth transitions:

```tsx
className="... transition"  // Default transition for most elements
className="... transition-all duration-300"  // Custom timing
```

## 🎭 Dark Mode

This design system is dark-first. All colors are optimized for dark backgrounds. No separate dark mode toggle is needed.

## 📦 Implementation Notes

1. **Consistency**: Always use the exact hex values provided, not approximations
2. **Spacing**: Use Polar's generous spacing for a professional, breathable layout
3. **Typography**: Keep font weights medium (500) rather than semibold (600) for body text
4. **Contrast**: Ensure sufficient contrast between text and backgrounds for readability
5. **Focus States**: Always include focus rings on interactive elements for accessibility

## 🔗 References

- **Inspiration**: [Polar.sh](https://polar.sh)
- **Design Philosophy**: Minimalist, professional, dark aesthetic with generous spacing
- **Color Scheme**: Dark backgrounds with mint green accents and white CTAs
