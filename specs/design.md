# Design System Strategy: ScreenBC

## 1. Overview & Creative North Star
**The Creative North Star: The Institutional Pillar**

This design system is built to convey absolute authority, medical reliability, and civic trust. We are departing from the cluttered, "web-portal" aesthetic of the past and moving toward a **High-End Editorial** experience. The goal is to make a government health service feel like a prestigious, private medical institution.

We achieve this through "The Institutional Pillar" philosophy: a design rooted in stability, high-contrast clarity, and an uncompromising commitment to readability. By utilizing intentional asymmetry and a rigid adherence to whitespace, we ensure that users—particularly those aged 50+—feel a sense of calm and control. We do not use "visual fluff." Every pixel must serve the purpose of information delivery.

---

## 2. Colors
The palette is rooted in the British Columbia institutional identity but refined for digital depth.

### Color Roles
- **Primary (`#001e41`):** Used for headers, primary CTAs, and structural anchoring. It represents the "weight" of the service.
- **Secondary (`#2d6197`):** Reserved for interactive links and secondary actions.
- **Tertiary/Accent (`#FCBA19`):** Our "Thin Gold Line." This is used sparingly as a high-contrast horizontal accent below headers to denote "Official Status."
- **Surface (`#faf9f8`):** A warm, light gray that reduces eye strain compared to pure white, providing a sophisticated, paper-like quality.

### The "No-Line" Rule
To elevate the UI beyond a standard "boxed" government form, designers are prohibited from using 1px solid borders to define major layout sections. Instead:
- **Boundaries must be defined by background shifts.** For example, a `surface-container-low` section should sit against the `surface` background to create a logical break.
- **Surface Hierarchy:** Use the `surface-container` scale (Lowest to Highest) to create nested depth. A white card (`surface-container-lowest`) should sit on a warm gray background (`surface`) to provide a natural lift.

### Signature Textures
Avoid flat, dead backgrounds. Use subtle linear gradients on primary buttons (transitioning from `primary` to `primary_container`) to provide a slight "curved" physical feel.

---

## 3. Typography
We utilize **Inter** exclusively for its neutral, highly legible characteristics. Given our demographic (50+), the scale is intentionally generous.

- **Display & Headlines:** Used for page titles and major section headers. We use a tight letter-spacing (-0.02em) on larger sizes to maintain an "official" editorial look.
- **Body-LG (`1rem` / `16px`):** This is our baseline. Never go smaller for primary information. It ensures accessibility and reduced cognitive load.
- **Authoritative Hierarchy:** The massive contrast between a `headline-lg` and `body-lg` creates a clear path for the eye, guiding the user through the screening process without the need for icons or decorative elements.

---

## 4. Elevation & Depth
In a clinical context, "shadows" can feel dark or "dirty" if not handled with extreme care. We use **Tonal Layering** to define hierarchy.

### The Layering Principle
Depth is achieved by "stacking" surface tiers.
1. **Level 0 (Base):** `surface` (`#faf9f8`)
2. **Level 1 (Sections):** `surface-container-low` (`#f4f3f2`)
3. **Level 2 (Cards):** `surface-container-lowest` (`#ffffff`)

### Ambient Shadows & The "Ghost Border"
When a component must float (e.g., a modal or a priority card), use an **Ambient Shadow**:
- **Shadow:** `0 20px 40px rgba(0, 30, 65, 0.06)` (A tinted navy shadow at very low opacity).
- **The Ghost Border:** For high-stakes containment, use a `0.5px` border of `outline_variant` at **15% opacity**. This provides a "suggestion" of a boundary that feels premium, not restrictive.

### Glassmorphism
For utility elements like the "Logout" button or help tooltips, use a backdrop-blur (`12px`) with a semi-transparent `surface` color. This keeps the user grounded in the page context.

---

## 5. Components

### Primary Buttons
- **Style:** `primary` (`#001e41`) background with `on_primary` (`#ffffff`) text.
- **Rounding:** `md` (`0.375rem`) for a sturdy, professional appearance.
- **Note:** Avoid "pill" shapes; they feel too informal/startup-like.

### Content Cards
- **Forbid Dividers:** Do not use horizontal rules to separate list items within a card. Use `spacing-5` (`1.7rem`) to create a clear "content gutter" instead.
- **Header:** White background, no shadow, defined by a 1px `surface-dim` border only if the background is also white.

### Input Fields
- **Focus State:** Use a high-contrast `secondary` (`#2d6197`) 2px ring.
- **Labels:** Always use `title-sm` for labels. Never hide labels inside inputs. For an older audience, persistence of context is vital.

### Global Header & Footer
- **Header:** Deep Navy (`#013366`) with the Thin Gold Line (`#FCBA19`) at the bottom (2px height).
- **Footer:** Minimalist and high-contrast. Use `body-sm` for the disclaimer text to keep it legally legible but visually secondary to the main tasks.

---

## 6. Do’s and Don’ts

### Do
- **Do** use massive amounts of whitespace (`spacing-12` and `spacing-16`) between unrelated sections.
- **Do** use "Editorial Centering." For simple screens (like login), center the content block to focus the user’s attention, but keep text left-aligned within that block for readability.
- **Do** favor "Type-Only" layouts. Trust the Inter typeface to do the heavy lifting.

### Don’t
- **Don’t** use stock photography of "happy seniors." This is a clinical tool; photos are distracting and can feel patronizing.
- **Don’t** use bright, neon "success" greens. Use subtle tonal shifts or clear checkmark glyphs in `primary` blue.
- **Don’t** use 100% black text. Use `on_surface` (`#1a1c1c`) to maintain a premium, softer contrast that is easier on the eyes over long periods.