# AiraKit

A lightweight, static design kit built with pure HTML, CSS and JavaScript. Drop it into any project — no build tools, no dependencies, no framework required.

## Getting Started

Download or clone the repository:

```bash
git clone https://github.com/adrielfilipedesign/AiraKit.git
```

Then copy the `components/` and `static/` directories into the root of your project.

### Core files

Every project that uses AiraKit must always load these three files, in this order:

`tokens.css` → `base.css` → `main.js`

```html
<head>
  <link rel="stylesheet" href="/static/css/base/tokens.css">
  <link rel="stylesheet" href="/static/css/base/base.css">
  <script src="/static/js/main.js" defer></script>
</head>
```

| File | Description |
|---|---|
| `tokens.css` | Color scheme, spacing, radii and typography for the whole kit and every component |
| `base.css` | Reset, base typography and the base HTML structure (content grid, flex utilities, spacing helpers). Depends on `tokens.css` |
| `main.js` | Defines and switches the theme (light/dark) and injects the `<aira-navbar>` / `<aira-footer>` web components |

> `examples.js,` `layout.css` and `syntax.css` also exist, but they only style the AiraKit website. You can skip them.

### Correcting file paths

Some AiraKit files rely on specific file paths, specifically `main.js` and `base.css`. They ship with the `/AiraKit/` prefix (used by the GitHub Pages site), so you need to adjust them for your own project.

**main.js**

```js
fetch('/AiraKit/components/navbar.html') -> fetch('/components/navbar.html')
fetch('/AiraKit/components/footer.html') -> fetch('/components/footer.html')
```

**base.css**

```css
src: url('/AiraKit/static/fonts/Inter/Inter-VariableFont_opsz,wght.ttf') format('truetype');
/* change it to: */
src: url('/static/fonts/Inter/Inter-VariableFont_opsz,wght.ttf') format('truetype');
```

---

## Base HTML structure

AiraKit provides a base structure with a navbar, a main body and a footer, all used inside `<body>`:

```html
<body>
  <aira-navbar></aira-navbar>

  <main class="main-cont">
    <!-- your content -->
  </main>

  <aira-footer></aira-footer>
</body>
```

| Element | Description |
|---|---|
| `<aira-navbar>` | Injected by `main.js`. Fixed at the top of the page, holds the logo, the theme toggle and the nav links |
| `<main class="main-cont">` | Wraps the page content. Grows to fill the remaining vertical space (`flex: 1`), pushing the footer to the bottom on short pages |
| `<aira-footer>` | Injected by `main.js`. Sits at the bottom of the page with links and credits |

The `<main>` tag should always be present. The navbar and footer are optional.

---

## Layout

| Class | Description |
|---|---|
| `.cont` | Centered flex container with max-width 1200px |
| `.cont-narrow` | Container with max-width 800px |
| `.cont-wide` | Container with max-width 1400px |
| `.full-width` | Breaks out of the grid to full width |
| `.row` | Flex row with wrapping |
| `.col` | Flex column |
| `.centv` | Align items center (vertical) |
| `.centh` | Justify content center (horizontal) |
| `.centvh` | Center both axes |

## Spacing

Spacing classes follow the same scale everywhere: `1` = 3rem, `2` = 2rem, `3` = 1rem.

| Size | Padding | Margin | Gap | Value |
|---|---|---|---|---|
| `1` | `.p1` | `.m1` | `.g1` | 3rem |
| `2` | `.p2` | `.m2` | `.g2` | 2rem |
| `3` | `.p3` | `.m3` | `.g3` | 1rem |

To target a single side, add its letter: `t` (top), `b` (bottom), `l` (left) or `r` (right) — for example `.pt1`, `.mb3`, `.ml2` or `.pr3`.

## Text

| Class | Description |
|---|---|
| `.txtc` | Center |
| `.txtl` | Left |
| `.txtr` | Right |

## Borders

| Class | Description |
|---|---|
| `.b` | All sides |
| `.bt` | Top |
| `.bb` | Bottom |
| `.bl` | Left |
| `.br` | Right |

## Images

Image classes only set a `max-width`, so the image keeps its proportions.

| Class | Max-width |
|---|---|
| `.img-xs` | 60px |
| `.img-sm` | 100px |
| `.img-md` | 160px |
| `.img-lg` | 240px |

---

## Components

To use components, always include `components.css`. Also include `components.js` when using accordions, carousels, checkboxes or toggles, and `toast.js` when using toasts.

- **Buttons:** primary, secondary, outline, delete and disabled variants
- **UI Icons:** 19 icons that automatically invert in dark mode
- **Input:** with default, error and success states
- **Select**
- **Text area**
- **Checkbox:** enabled and disabled
- **Toggle:** enabled and disabled
- **Accordion:** single and multiple
- **Carousel:** arrows, dots and drag/swipe
- **Toast:** default, success, error and warning
- **Badge:** 8 variants, including a status dot

For more details and usage examples, go to [components.md](components.md).

---

## Dark Mode

AiraKit supports dark mode automatically via `prefers-color-scheme` and manually via a toggle button. Theme switching is handled by `main.js`, and the injected `<aira-navbar>` already includes the theme toggle.

The chosen theme is saved to `localStorage` and persists across sessions.

---

## File Structure

```
AiraKit/
├── components/
│   ├── footer.html         # <aira-footer> markup
│   └── navbar.html         # <aira-navbar> markup
├── static/
│   ├── css/
│   │   ├── base/
│   │   │   ├── base.css    # Reset, base typography, layout utilities, spacing
│   │   │   ├── layout.css  # AiraKit website layout (can be skipped)
│   │   │   ├── syntax.css  # AiraKit website code highlighting (can be skipped)
│   │   │   └── tokens.css  # Colors, spacing, radii, typography
│   │   └── components/
│   │       └── components.css  # Buttons, forms, accordion, carousel, toast, badge...
│   ├── fonts/
│   ├── icons/
│   ├── img/
│   └── js/
│       ├── components.js   # Accordion, carousel, checkbox, toggle
│       ├── main.js         # Theme (light/dark), navbar/footer injection
│       ├── toast.js        # Toasts
│       └── examples.js     # Syntax highlighting for documentation.html
└── index.html
```

---

## Contributing

Contributions are welcome. Fork the repository, create a feature branch and open a pull request with a clear description of the change.

## License

MIT License.
