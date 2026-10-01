# AiraKit — Usage Examples

> **Note:** the examples in this file assume you have already added a `<main class="main-cont">` tag to your page. Place each example inside it for it to work correctly. The only exceptions are the `<head>` snippets, which go inside your `<head>` tag.

## Contents

- [Setup](#setup)
- [Base HTML structure](#base-html-structure)
- [Layout](#layout)
- [Spacing](#spacing)
- [Borders](#borders)
- [Images](#images)
- [Putting it all together](#putting-it-all-together)
- [Components](#components)
  - [Buttons](#buttons) · [UI Icons](#ui-icons) · [Input](#input) · [Select](#select) · [Text area](#text-area) · [Checkbox](#checkbox) · [Toggle](#toggle) · [Accordion](#accordion) · [Carousel](#carousel) · [Toast](#toast) · [Badge](#badge)

---

## Setup

Every project that uses AiraKit must always load these three files, in this order: `tokens.css` → `base.css` → `main.js`.

```html
<head>
    <link rel="stylesheet" href="/static/css/base/tokens.css">
    <link rel="stylesheet" href="/static/css/base/base.css">
    <script src="/static/js/main.js" defer></script>
</head>
```

- `tokens.css`: color scheme, spacing, radii and typography for the whole kit and every component.
- `base.css`: reset, base typography and the base HTML structure (content grid, flex utilities, spacing helpers). Depends on `tokens.css`.
- `main.js`: defines and switches the theme (light/dark) and injects the `<aira-navbar>` / `<aira-footer>` web components.

`layout.css` and `syntax.css` only style the AiraKit website. You can skip them.

---

## Base HTML structure

AiraKit provides a base structure with a navbar, a main body and a footer, all used inside the `<body>` tag. The `<main>` tag should always be present. The navbar and footer are optional, since `<main class="main-cont">` always stretches to fill whatever space is left.

```html
<body>
    <aira-navbar></aira-navbar>

    <main class="main-cont">
        <!-- page content -->
    </main>

    <aira-footer></aira-footer>
</body>
```

- `<aira-navbar>`: injected by `main.js`. Fixed at the top of the page, holds the logo, the theme toggle and the nav links.
- `<main class="main-cont">`: wraps the page content. Grows to fill the remaining vertical space (`flex: 1`), pushing the footer to the bottom on short pages.
- `<aira-footer>`: injected by `main.js`. Sits at the bottom of the page with links and credits.

---

## Layout

### Main content container

Use `.cont` and its variants to create a constrained-width container centered on the page.

| Class | Description |
|---|---|
| `.cont` | Centered flex container with max-width 1200px |
| `.cont-narrow` | Container with max-width 800px |
| `.cont-wide` | Container with max-width 1400px |
| `.full-width` | Breaks out of the grid to full width |

```html
<div class="cont-narrow">
    <div style="background: rgba(255, 150, 0, 0.2);">
        <h2>width of 'cont-narrow' class</h2>
    </div>
</div>

<div class="cont">
    <div style="background: rgba(0, 200, 100, 0.2);">
        <h2>width of 'cont' class (default size)</h2>
    </div>
</div>

<div class="cont-wide">
    <div style="background: rgba(0, 128, 255, 0.2);">
        <h2>width of 'cont-wide' class</h2>
    </div>
</div>

<br>

<div class="cont-wide">
    <div style="background: rgba(255, 255, 255, 0.2);">
        <h2>This grey section is inside a 'cont-wide' class. This specific line does not
            have a 'full-width'
            class</h2>
    </div>
    <div class="full-width" style="background: rgba(255, 255, 255, 0.2);">
        <h2>This line has 'full-width' class. As you can see, the full-width will ignore
            the grid and expand
            to fill the whole screen</h2>
    </div>
</div>
```

### Centering text

| Class | Description |
|---|---|
| `.txtc` | Centers the text |
| `.txtl` | Aligns the text to the left |
| `.txtr` | Aligns the text to the right |

```html
<div class="cont txtc">
    <div style="background: rgba(0, 200, 100, 0.2);">
        <h2>Text centered using 'txtc' class</h2>
    </div>
</div>

<div class="cont txtl">
    <div style="background: rgba(255, 150, 0, 0.2);">
        <h2>Text aligned left using 'txtl' class</h2>
    </div>
</div>

<div class="cont txtr">
    <div style="background: rgba(0, 128, 255, 0.2);">
        <h2>Text aligned right using 'txtr' class</h2>
    </div>
</div>
```

### Rows, columns, gaps

Use `.row` for a wrapping row and `.col` for a column. Add `.centv`, `.centh` or `.centvh` to align the content inside the div.

| Class | Description |
|---|---|
| `.row` | Flex row with wrapping |
| `.col` | Flex column |
| `.centv` | Align items center (vertical) |
| `.centh` | Justify content center (horizontal) |
| `.centvh` | Center both axes |

```html
<h3 class="txtc">row — horizontal layout</h3>
<div class="cont">
    <div class="row g3" style="background: rgba(180, 80, 220, 0.2); padding: 1rem;">
        <div>Item one</div>
        <div>Item two</div>
        <div>Item three</div>
    </div>

    <br>

    <h3 class="txtc">col — vertical layout</h3>
    <div class="col g3" style="background: rgba(255, 100, 100, 0.2); padding: 1rem;">
        <div>Item one</div>
        <div>Item two</div>
        <div>Item three</div>
    </div>

    <br>

    <h3 class="txtc">centh — horizontal</h3>
    <div style="background: rgba(0, 200, 100, 0.2); padding: 1rem;">
        <h3></h3>

        <div class="centh" style="min-height: 100px;">
            <div>Centered horizontally</div>
        </div>
    </div>

    <br>

    <h3 class="txtc">centv — vertical</h3>
    <div style="background: rgba(255, 150, 0, 0.2); padding: 1rem;">

        <div class="centv" style="min-height: 100px;">
            <div>Centered vertically</div>
        </div>
    </div>

    <br>

    <h3 class="txtc">centvh — both axes</h3>
    <div style="background: rgba(0, 128, 255, 0.2); padding: 1rem;">

        <div class="centvh" style="min-height: 100px;">
            <div>Centered horizontally and vertically</div>
        </div>
    </div>
</div>
```

---

## Spacing

Spacing classes follow the same scale everywhere: `1` = 3rem, `2` = 2rem and `3` = 1rem.

| Size | Padding | Margin | Gap | Value |
|---|---|---|---|---|
| `1` | `.p1` | `.m1` | `.g1` | 3rem |
| `2` | `.p2` | `.m2` | `.g2` | 2rem |
| `3` | `.p3` | `.m3` | `.g3` | 1rem |

To target a single side, add its letter: `t` (top), `b` (bottom), `l` (left) or `r` (right), for example `.pt1`, `.mb3`, `.ml2` or `.pr3`.

```html
<div class="cont">
    <div style="background: rgba(0, 200, 100, 0.2);">
        <div class="p2" style="background: rgba(0, 200, 100, 0.2);">
            <strong>p2</strong> — 2rem padding on every side
        </div>
    </div>
</div>

<br>

<div class="cont">
    <div style="background: rgba(255, 150, 0, 0.2);">
        <div class="pt1 pb3" style="background: rgba(255, 150, 0, 0.2);">
            <strong>pt1 pb3</strong> — 3rem padding on top, 1rem padding at the bottom
        </div>
    </div>
</div>

<br>

<div class="cont">
    <div style="background: rgba(0, 128, 255, 0.2); padding: 1rem;">
        <h2 class="mb3">Title</h2>
        <p class="mt2">Paragraph has a margin (mt2) on top of it</p>
        <p>And the title itself has a margin of mb3 at the bottom.</p>
    </div>
</div>

<br>

<div class="cont">
    <div style="background: rgba(180, 80, 220, 0.2); padding: 1rem;">
        <p>The text "Left" has a margin at its right side (mr3)</p>
        <br>
        <span class="mr3">LEFT</span>
        <span>RIGHT</span>
    </div>
</div>

<br>

<div class="cont">
    <div style="background: rgba(255, 100, 100, 0.2); padding: 1rem;">
        <p>The list items have a gap (g3) between each other</p>
        <br>
        <ul class="col g3">
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
        </ul>
    </div>
</div>
```

---

## Borders

| Class | Description |
|---|---|
| `.b` | Border on all sides |
| `.bt` | Border on the top side |
| `.bb` | Border on the bottom side |
| `.bl` | Border on the left side |
| `.br` | Border on the right side |

```html
<div class="cont">
    <div>
        <div class="b p2" style="background: rgba(0, 200, 100, 0.2);">
            The <strong>b</strong> class adds a border on all sides
        </div>
    </div>
</div>

<br>

<div class="cont">
    <div>
        <h3 class="bb pb3" style="background: rgba(255, 150, 0, 0.2);">
            Section title
        </h3>
        <p>The <strong>bb</strong> class adds a border below the
            title.</p>
    </div>
</div>

<br>

<div class="cont">
    <div>
        <blockquote class="bl pl2" style="background: rgba(0, 128, 255, 0.2);">
            The <strong>bl</strong> class adds a border left of the quote.
        </blockquote>
    </div>
</div>
```

---

## Images

Image classes only set a `max-width`, so the image keeps its proportions.

| Class | Max-width |
|---|---|
| `.img-xs` | 60px |
| `.img-sm` | 100px |
| `.img-md` | 160px |
| `.img-lg` | 240px |

```html
<div class="cont">
    <h3>Image size: 60px</h3>
    <img class="img-xs" src="/static/img/image.jpg" alt="Extra small">

    <h3>Image size: 100px</h3>
    <img class="img-sm" src="/static/img/image.jpg" alt="Small">

    <h3>Image size: 160px</h3>
    <img class="img-md" src="/static/img/image.jpg" alt="Medium">

    <h3>Image size: 240px</h3>
    <img class="img-lg" src="/static/img/image.jpg" alt="Large">
</div>
```

---

## Putting it all together

Utility classes are meant to be stacked. This is a complete profile card built only with the classes above:

```html
<section class="cont cont-narrow centvh g2 p2">

    <div class="b p2">
        <div class="row centv g3 mb3">
            <img class="img-sm" src="/static/icons/ui/human.svg" alt="Avatar">
            <div class="col g3">
                <h2>Adriel Filipe</h2>
                <span>Design &amp; Development</span>
            </div>
        </div>

        <p class="bt pt3 txtl">
            Building lightweight tools for developers.
        </p>
    </div>

</section>
```

---

## Components

To use the basic components, always include `components.css`. Also include `components.js` when using accordions, carousels, checkboxes or toggles, and `toast.js` when using toasts.

```html
<head>
    <link rel="stylesheet" href="/static/css/base/tokens.css">
    <link rel="stylesheet" href="/static/css/base/base.css">

    <link rel="stylesheet" href="/static/css/components/components.css">

    <script src="/static/js/main.js" defer></script>

    <script src="/static/js/components.js" defer></script>
    <script src="/static/js/toast.js" defer></script>
</head>
```

### Buttons

Apply only one of the classes below to any `<a>` or `<button>` tag.

| Class | Variant |
|---|---|
| `.btn_act` | Primary |
| `.btn_sec` | Secondary |
| `.btn_out` | Outline |
| `.btn_del` | Delete |
| `.btn_dis` | Disabled |

```html
<div class="cont centvh g3">
    <a href="/" class="btn_act">Get Started</a>
    <button class="btn_del" onclick="deleteItem()">Delete</button>
</div>
```

### UI Icons

Use icons with `<img>` from `/static/icons/ui/`. Icons automatically invert in dark mode. Do not use the `.logo` class or include `logo` in the filename, as either will prevent the icon from being inverted, unless that is intended. There are 19 icons available.

```html
<div class="cont centvh g3">
    <a href="/" class="btn_act">Get Started</a>
    <button class="btn_del" onclick="deleteItem()">Delete</button>
    <div class="icon-card">
        <img src="/static/icons/ui/download.svg" alt="download">
    </div>
</div>
```

### Input

Add `.error` or `.success` to `.input` for the validation states (and `.error` to `.field-hint` for the error message).

```html
<div class="cont">
    <div class="col centv g3">
        <div class="field">
            <label class="field-label">Email</label>
            <input class="input" type="text" placeholder="you@example.com" />
            <span class="field-hint">We'll never share your email.</span>
        </div>

        <!-- validation states: add .error or .success to .input -->
        <div class="field">
            <label class="field-label">Email</label>
            <input class="input error" type="text" value="not-an-email" />
            <span class="field-hint error">Enter a valid email address.</span>
        </div>

        <div class="field">
            <label class="field-label">Email</label>
            <input class="input success" type="text" value="you@example.com" />
            <span class="field-hint">Looks good!</span>
        </div>
    </div>
</div>
```

### Select

```html
<div class="cont">
    <div class="field">
        <label class="field-label">Country</label>
        <div class="select-wrap">
            <select class="select">
                <option value="" disabled selected>Choose an option</option>
                <option>Brazil</option>
                <option>Portugal</option>
            </select>
        </div>
    </div>
</div>
```

### Text area

```html
<div class="cont">
    <div class="field">
        <label class="field-label">Message</label>
        <textarea class="textarea" placeholder="Write something…"></textarea>
        <span class="field-hint">Maximum 300 characters.</span>
    </div>
</div>
```

### Checkbox

Works natively via `<input type="checkbox">`. Requires `components.js`.

```html
<!-- include components.js script inside the <head> tag -->

<!--
<script src="/static/js/components.js" defer></script>
-->

<div class="col centvh g3">
    <!-- Enabled checkbox -->
    <label class="checkbox-wrap">
        <input type="checkbox" id="chk-terms" />

        <span class="checkbox-icon" data-for="chk-terms">
            <svg class="svg-uncheck" width="22" height="22" viewBox="0 0 25 25">
                <use href="/static/icons/ui/checkbox-uncheck.svg#checkbox-uncheck"></use>
            </svg>

            <svg class="svg-check" width="22" height="22" viewBox="0 0 25 25" style="display:none;">
                <use href="/static/icons/ui/checkbox-checked.svg#checkbox-checked"></use>
            </svg>
        </span>

        <span class="checkbox-label">Example checkbox</span>
    </label>

    <!-- Disabled checkbox -->
    <label class="checkbox-wrap disabled">
        <input type="checkbox" id="chk-terms-disabled" disabled />

        <span class="checkbox-icon" data-for="chk-terms-disabled">
            <svg class="svg-uncheck" width="22" height="22" viewBox="0 0 25 25">
                <use href="/static/icons/ui/checkbox-uncheck.svg#checkbox-uncheck"></use>
            </svg>

            <svg class="svg-check" width="22" height="22" viewBox="0 0 25 25" style="display:none;">
                <use href="/static/icons/ui/checkbox-checked.svg#checkbox-checked"></use>
            </svg>
        </span>

        <span class="checkbox-label">Example checkbox (disabled)</span>
    </label>
</div>
```

### Toggle

Works natively via `<input type="checkbox">`. Requires `components.js`.

```html
<!-- include components.js script inside the <head> tag -->

<!--
<script src="/static/js/components.js" defer></script>
-->

<div class="col centvh g3">
    <!-- Enabled toggle -->
    <label class="toggle-wrap">
        <input type="checkbox" id="tgl-notifications" />

        <span class="toggle-icon" data-for="tgl-notifications">
            <svg class="svg-off" width="30" height="30" viewBox="0 0 25 25">
                <use href="/static/icons/ui/toggle-off.svg#toggle-off"></use>
            </svg>

            <svg class="svg-on" width="30" height="30" viewBox="0 0 25 25" style="display:none;">
                <use href="/static/icons/ui/toggle-on.svg#toggle-on"></use>
            </svg>
        </span>

        <span class="toggle-label">Example toggle (enabled)</span>
    </label>

    <!-- Disabled toggle -->
    <label class="toggle-wrap disabled">
        <input type="checkbox" id="tgl-notifications-disabled" disabled />

        <span class="toggle-icon" data-for="tgl-notifications-disabled">
            <svg class="svg-off" width="30" height="30" viewBox="0 0 25 25">
                <use href="/static/icons/ui/toggle-off.svg#toggle-off"></use>
            </svg>

            <svg class="svg-on" width="30" height="30" viewBox="0 0 25 25" style="display:none;">
                <use href="/static/icons/ui/toggle-on.svg#toggle-on"></use>
            </svg>
        </span>

        <span class="toggle-label">Example toggle (disabled)</span>
    </label>

</div>
```

### Accordion

Requires `components.js`.

**Single:** use `.accordion` to create accordions where only one item can be open at a time. Opening one item automatically closes any other open item.

```html
<!-- include components.js script inside the <head> tag -->

<!--
<script src="/static/js/components.js" defer></script>
-->

<div class="cont g3">
    <div class="accordion">
        <div class="accordion-item">
            <button class="accordion-trigger" aria-expanded="false">
                <span>First accordion</span>
                <svg class="accordion-icon" width="16" height="16" viewBox="0 0 24 24">
                    <use href="/static/icons/ui/accordion-chevron.svg#accordion-chevron"></use>
                </svg>
            </button>

            <div class="accordion-body">
                <div class="accordion-content">
                    <p>Details of the first accordion</p>
                </div>
            </div>
        </div>
    </div>

    <div class="accordion">
        <div class="accordion-item">
            <button class="accordion-trigger" aria-expanded="false">
                <span>Second accordion</span>
                <svg class="accordion-icon" width="16" height="16" viewBox="0 0 24 24">
                    <use href="/static/icons/ui/accordion-chevron.svg#accordion-chevron"></use>
                </svg>
            </button>

            <div class="accordion-body">
                <div class="accordion-content">
                    <p>Details of the second accordion</p>
                </div>
            </div>
        </div>
    </div>
</div>
```

**Multiple:** add `.accordion--multi` to allow several items open simultaneously. Items animate via a `grid-template-rows` transition.

```html
<!-- include components.js script inside the <head> tag -->

<!--
    <script src="/static/js/components.js" defer></script>
-->

<div class="cont g3">
    <div class="accordion accordion--multi">
        <div class="accordion-item">
            <button class="accordion-trigger" aria-expanded="true">
                <span>Can I open multiple?</span>
                <svg class="accordion-icon" width="16" height="16" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            <div class="accordion-body">
                <div class="accordion-content">
                    <p>Yes! Add <code>.accordion--multi</code> to allow multiple items open at once.</p>
                </div>
            </div>
        </div>
    </div>

    <div class="accordion accordion--multi">
        <div class="accordion-item">
            <button class="accordion-trigger" aria-expanded="false">
                <span>Can I open another one?</span>
                <svg class="accordion-icon" width="16" height="16" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            <div class="accordion-body">
                <div class="accordion-content">
                    <p>Yes! Multiple accordion items can remain open at the same time.</p>
                </div>
            </div>
        </div>
    </div>
</div>
```

### Carousel

Requires `components.js`. The carousel can be navigated using the arrows, the dots, or by dragging/swiping, and works with any content (text, cards, images). Every slide takes the height of the biggest content, so if you use an `<img>` inside one slide, all slides will have that size.

```html
<!-- include components.js script inside the <head> tag -->

<!--
<script src="/static/js/components.js" defer></script>
-->

<div class="cont">
    <div class="carousel" id="carousel-demo">
        <div class="carousel-track">
            <div class="carousel-slide">
                <div class="carousel-slide-inner">
                    <span class="carousel-slide-num">01</span>
                    <p>Drag or use the arrows to navigate between slides.</p>
                </div>
            </div>

            <div class="carousel-slide">
                <div class="carousel-slide-inner">
                    <img src="/static/img/image.jpg" alt="Example image">
                </div>
            </div>

            <div class="carousel-slide">
                <div class="carousel-slide-inner">
                    <span class="carousel-slide-num">03</span>
                    <p>Dots update automatically as you navigate.</p>
                </div>
            </div>
        </div>

        <button class="carousel-btn carousel-btn--prev" aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6" />
            </svg>
        </button>

        <button class="carousel-btn carousel-btn--next" aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6" />
            </svg>
        </button>

        <div class="carousel-dots" id="carousel-demo-dots"></div>
    </div>
</div>
```

### Toast

Requires `toast.js`. Add the `<div class="toast-kit">` once per page (anywhere, inside `<main>` works), then add a button with the `onclick` method `showToastKit(message, variant)`. Variants: `default`, `success`, `error`, `warning`.

> The `toast-kit` class is used for styling, while the `toast-kit` ID is used by `toast.js` to locate the div.

```html
<!-- include the toast.js script inside the <head> tag -->

<!--
<script src="/static/js/toast.js" defer></script>
-->

<div class="cont centvh mt3">
    <div class="mb3 g3 row">
        <button class="btn_out" onclick="showToastKit('Default message', 'default')">Default</button>
        <button class="btn_out" onclick="showToastKit('Action completed!', 'success')">Success</button>
        <button class="btn_out" onclick="showToastKit('Something went wrong.', 'error')">Error</button>
        <button class="btn_out" onclick="showToastKit('Heads up — check this.', 'warning')">Warning</button>
    </div>

    <!-- put this anywhere, once per page -->
    <div class="toast-kit" id="toast-kit" role="status" aria-live="polite"></div>
</div>
```

### Badge

Base class `.badge-kit` plus a modifier. Combine `--dot` with a color modifier (e.g. `--dot --success`) for a status indicator.

| Class | Variant |
|---|---|
| `.badge-kit` | Default |
| `.badge-kit--info` | Info |
| `.badge-kit--success` | Success |
| `.badge-kit--warning` | Warning |
| `.badge-kit--error` | Error |
| `.badge-kit--outline` | Outline |
| `.badge-kit--solid` | Solid |
| `.badge-kit--dot` | Status indicator (combine with a color) |

```html
<div class="cont centvh mt3">
    <div class="row g3">
        <span class="badge-kit">Default</span>
        <span class="badge-kit badge-kit--info">Info</span>
        <span class="badge-kit badge-kit--success">Success</span>
        <span class="badge-kit badge-kit--warning">Warning</span>
        <span class="badge-kit badge-kit--error">Error</span>
        <span class="badge-kit badge-kit--outline">Outline</span>
        <span class="badge-kit badge-kit--solid">Solid</span>
        <span class="badge-kit badge-kit--dot badge-kit--success">
            <span class="badge-dot"></span>Active
        </span>
    </div>
</div>
```
