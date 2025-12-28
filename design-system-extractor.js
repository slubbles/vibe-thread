/**
 * DESIGN SYSTEM EXTRACTOR
 * 
 * Usage:
 * 1. Open any website you want to extract design from
 * 2. Open browser DevTools (F12)
 * 3. Go to Console tab
 * 4. Paste this entire script and press Enter
 * 5. Copy the output JSON
 * 
 * This will extract:
 * - Colors (backgrounds, text, borders)
 * - Typography (fonts, sizes, weights, line heights)
 * - Spacing (padding, margins, gaps)
 * - Border radius values
 * - Shadows
 * - Breakpoints
 */

(function() {
  console.log('🎨 Extracting Design System...\n');

  // Helper function to get computed style
  const getStyle = (el, prop) => window.getComputedStyle(el).getPropertyValue(prop);

  // Helper to convert px to rem
  const pxToRem = (px) => {
    const value = parseFloat(px);
    return value ? `${(value / 16).toFixed(3)}rem` : px;
  };

  // Extract colors from all elements
  const extractColors = () => {
    const colors = {
      backgrounds: new Set(),
      text: new Set(),
      borders: new Set(),
      accents: new Set()
    };

    document.querySelectorAll('*').forEach(el => {
      const bg = getStyle(el, 'background-color');
      const color = getStyle(el, 'color');
      const border = getStyle(el, 'border-color');
      
      if (bg && bg !== 'rgba(0, 0, 0, 0)') colors.backgrounds.add(bg);
      if (color && color !== 'rgba(0, 0, 0, 0)') colors.text.add(color);
      if (border && border !== 'rgba(0, 0, 0, 0)') colors.borders.add(border);
    });

    return {
      backgrounds: Array.from(colors.backgrounds).slice(0, 20),
      text: Array.from(colors.text).slice(0, 15),
      borders: Array.from(colors.borders).slice(0, 10)
    };
  };

  // Extract typography
  const extractTypography = () => {
    const fonts = new Set();
    const sizes = new Set();
    const weights = new Set();
    const lineHeights = new Set();

    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, button, a').forEach(el => {
      fonts.add(getStyle(el, 'font-family'));
      sizes.add(getStyle(el, 'font-size'));
      weights.add(getStyle(el, 'font-weight'));
      lineHeights.add(getStyle(el, 'line-height'));
    });

    return {
      families: Array.from(fonts).slice(0, 5),
      sizes: Array.from(sizes).map(s => ({
        px: s,
        rem: pxToRem(s)
      })).sort((a, b) => parseFloat(a.px) - parseFloat(b.px)).slice(0, 15),
      weights: Array.from(weights).sort((a, b) => a - b),
      lineHeights: Array.from(lineHeights).slice(0, 10)
    };
  };

  // Extract spacing
  const extractSpacing = () => {
    const paddings = new Set();
    const margins = new Set();
    const gaps = new Set();

    document.querySelectorAll('*').forEach(el => {
      const pt = getStyle(el, 'padding-top');
      const pr = getStyle(el, 'padding-right');
      const pb = getStyle(el, 'padding-bottom');
      const pl = getStyle(el, 'padding-left');
      const mt = getStyle(el, 'margin-top');
      const mr = getStyle(el, 'margin-right');
      const mb = getStyle(el, 'margin-bottom');
      const ml = getStyle(el, 'margin-left');
      const gap = getStyle(el, 'gap');

      [pt, pr, pb, pl].forEach(p => p !== '0px' && paddings.add(p));
      [mt, mr, mb, ml].forEach(m => m !== '0px' && m !== 'auto' && margins.add(m));
      if (gap !== 'normal' && gap !== '0px') gaps.add(gap);
    });

    const sortSpacing = (arr) => arr.sort((a, b) => parseFloat(a) - parseFloat(b));

    return {
      padding: sortSpacing(Array.from(paddings)).map(s => ({
        px: s,
        rem: pxToRem(s)
      })).slice(0, 20),
      margin: sortSpacing(Array.from(margins)).map(s => ({
        px: s,
        rem: pxToRem(s)
      })).slice(0, 20),
      gap: sortSpacing(Array.from(gaps)).map(s => ({
        px: s,
        rem: pxToRem(s)
      })).slice(0, 15)
    };
  };

  // Extract border radius
  const extractBorderRadius = () => {
    const radii = new Set();

    document.querySelectorAll('*').forEach(el => {
      const radius = getStyle(el, 'border-radius');
      if (radius && radius !== '0px') radii.add(radius);
    });

    return Array.from(radii).map(r => ({
      px: r,
      rem: pxToRem(r)
    })).slice(0, 15);
  };

  // Extract shadows
  const extractShadows = () => {
    const shadows = new Set();

    document.querySelectorAll('*').forEach(el => {
      const shadow = getStyle(el, 'box-shadow');
      if (shadow && shadow !== 'none') shadows.add(shadow);
    });

    return Array.from(shadows).slice(0, 10);
  };

  // Extract animations/transitions
  const extractAnimations = () => {
    const transitions = new Set();
    const animations = new Set();

    document.querySelectorAll('*').forEach(el => {
      const transition = getStyle(el, 'transition');
      const animation = getStyle(el, 'animation');
      
      if (transition && transition !== 'all 0s ease 0s') transitions.add(transition);
      if (animation && animation !== 'none 0s ease 0s 1 normal none running') animations.add(animation);
    });

    return {
      transitions: Array.from(transitions).slice(0, 10),
      animations: Array.from(animations).slice(0, 5)
    };
  };

  // Get viewport/breakpoints info
  const extractBreakpoints = () => {
    return {
      currentWidth: window.innerWidth,
      currentHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio,
      commonBreakpoints: {
        mobile: '375px',
        mobileLg: '425px',
        tablet: '768px',
        laptop: '1024px',
        desktop: '1440px',
        desktopLg: '1920px'
      }
    };
  };

  // Main extraction
  const designSystem = {
    metadata: {
      url: window.location.href,
      title: document.title,
      extractedAt: new Date().toISOString()
    },
    colors: extractColors(),
    typography: extractTypography(),
    spacing: extractSpacing(),
    borderRadius: extractBorderRadius(),
    shadows: extractShadows(),
    animations: extractAnimations(),
    viewport: extractBreakpoints()
  };

  // Output
  console.log('%c═══════════════════════════════════════', 'color: #3b82f6; font-weight: bold');
  console.log('%c🎨 DESIGN SYSTEM EXTRACTED', 'color: #3b82f6; font-size: 16px; font-weight: bold');
  console.log('%c═══════════════════════════════════════', 'color: #3b82f6; font-weight: bold');
  console.log('\n');
  
  console.log('%c📋 COPY THIS JSON:', 'color: #10b981; font-size: 14px; font-weight: bold');
  console.log(JSON.stringify(designSystem, null, 2));
  
  console.log('\n');
  console.log('%c💡 Quick Summary:', 'color: #f59e0b; font-weight: bold');
  console.log(`Colors: ${designSystem.colors.backgrounds.length} backgrounds, ${designSystem.colors.text.length} text colors`);
  console.log(`Typography: ${designSystem.typography.families.length} fonts, ${designSystem.typography.sizes.length} sizes`);
  console.log(`Spacing: ${designSystem.spacing.padding.length} padding values, ${designSystem.spacing.margin.length} margin values`);
  console.log(`Border Radius: ${designSystem.borderRadius.length} values`);
  console.log(`Shadows: ${designSystem.shadows.length} box shadows`);
  
  console.log('\n');
  console.log('%c🎯 Tailwind CSS Config Suggestions:', 'color: #8b5cf6; font-weight: bold');
  
  // Generate Tailwind config suggestions
  const tailwindColors = designSystem.colors.backgrounds.slice(0, 5).map((c, i) => `  primary-${i + 1}: '${c}'`);
  const tailwindSpacing = designSystem.spacing.padding.slice(0, 8).map((s, i) => `  ${i * 2}: '${s.rem}'`);
  
  console.log('\ncolors: {');
  console.log(tailwindColors.join(',\n'));
  console.log('}');
  
  console.log('\nspacing: {');
  console.log(tailwindSpacing.join(',\n'));
  console.log('}');

  console.log('\n');
  console.log('%c✅ Done! Copy the JSON above and save it.', 'color: #10b981; font-weight: bold');
  console.log('%c═══════════════════════════════════════', 'color: #3b82f6; font-weight: bold');

  // Also copy to clipboard if possible
  try {
    navigator.clipboard.writeText(JSON.stringify(designSystem, null, 2));
    console.log('\n%c📋 JSON copied to clipboard!', 'background: #10b981; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold');
  } catch (e) {
    console.log('\n%c⚠️  Could not copy to clipboard automatically. Please copy manually.', 'color: #f59e0b');
  }

  // Return for programmatic access
  return designSystem;
})();
