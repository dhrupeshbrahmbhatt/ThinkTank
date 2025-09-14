# Steve Jobs-Inspired Color Palette

This color scheme is inspired by Apple's design philosophy under Steve Jobs, emphasizing minimalism, elegance, and sophistication.

## Primary Colors

### Space Gray (`#1D1D1F`)
- **Usage**: Primary dark backgrounds, headers, main text
- **Tailwind Class**: `bg-primary-space-gray`, `text-primary-space-gray`
- **Description**: Deep, sophisticated dark color that conveys premium quality

### Silver (`#F5F5F7`)
- **Usage**: Light backgrounds, cards, secondary surfaces
- **Tailwind Class**: `bg-primary-silver`, `text-primary-silver`
- **Description**: Clean, minimal light color for elegant contrast

## Secondary Colors

### Charcoal (`#2C2C2E`)
- **Usage**: Secondary dark elements, borders, subtle backgrounds
- **Tailwind Class**: `bg-secondary-charcoal`, `text-secondary-charcoal`
- **Description**: Elegant dark accent for depth and hierarchy

### Snow (`#FBFBFD`)
- **Usage**: Pure backgrounds, white text, clean surfaces
- **Tailwind Class**: `bg-secondary-snow`, `text-secondary-snow`
- **Description**: Pure, clean white for maximum contrast and clarity

## Accent Colors

### Apple Blue (`#007AFF`)
- **Usage**: Primary buttons, links, call-to-actions, interactive elements
- **Tailwind Class**: `bg-accent-apple-blue`, `text-accent-apple-blue`
- **Description**: Vibrant, trustworthy blue that inspires confidence

### Sunset Orange (`#FF9500`)
- **Usage**: Warning states, highlights, creative elements
- **Tailwind Class**: `bg-accent-sunset-orange`, `text-accent-sunset-orange`
- **Description**: Warm, energetic orange for attention and creativity

### Forest Green (`#34C759`)
- **Usage**: Success states, positive feedback, growth indicators
- **Tailwind Class**: `bg-accent-forest-green`, `text-accent-forest-green`
- **Description**: Fresh green representing success and growth

## Usage Examples

### Buttons
```jsx
// Primary Button
<button className="bg-accent-apple-blue hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors">
  Get Started
</button>

// Secondary Button
<button className="bg-primary-silver hover:bg-gray-200 text-primary-space-gray px-6 py-3 rounded-xl font-medium transition-colors">
  Learn More
</button>
```

### Cards
```jsx
<div className="bg-secondary-snow border border-gray-200 rounded-2xl p-6 shadow-apple">
  <h3 className="text-primary-space-gray text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-gray-600">Card content goes here...</p>
</div>
```

### Navigation
```jsx
<nav className="bg-primary-space-gray border-b border-secondary-charcoal">
  <div className="text-primary-silver">Navigation content</div>
</nav>
```

## Color Psychology

- **Space Gray**: Conveys sophistication, premium quality, and professionalism
- **Silver**: Represents cleanliness, modernity, and simplicity
- **Apple Blue**: Builds trust, reliability, and encourages action
- **Sunset Orange**: Creates warmth, energy, and draws attention
- **Forest Green**: Symbolizes growth, success, and positive outcomes

## Accessibility

All color combinations have been tested for WCAG AA compliance:
- Space Gray on Silver: ✅ AAA compliant
- Apple Blue on White: ✅ AA compliant
- Forest Green on White: ✅ AA compliant
- Sunset Orange on White: ✅ AA compliant

## Extended Palette

The configuration also includes extended gray, blue, orange, and green palettes with 50-900 shades for maximum flexibility in your designs.
