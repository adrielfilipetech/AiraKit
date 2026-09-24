/* ============================================
   AiraKit — Main
   Load order: main.js → components.js → toast.js
   ============================================ */

/* --------------------------------------------
   Theme
   - No saved preference: <html> has NO data-theme attribute, and the CSS
     follows the system automatically (color-scheme: light dark).
   - With a saved preference: data-theme="light|dark" forces the scheme.
   -------------------------------------------- */
const STORAGE_KEY = 'airakit-theme-preference';
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
 
//data-theme is the html attribute that has the theme that should be rendered (if set by the user).
//STORAGE_KEY saves user theme preference in localStorage.
function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return null; // localStorage blocked
  }
}
 
// Returns current theme set in the data-theme attribute. 
// If the attribute is not set, then returns the system theme.
function getEffectiveTheme() {
  return document.documentElement.getAttribute('data-theme')
    ?? (systemTheme.matches ? 'dark' : 'light');
}
 
 
function storeTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (e) {
    // localStorage blocked
  }
}

(function initializeTheme() {
  const storedTheme = getStoredTheme();
  // If no preference is stored in localStorage, data-theme is left unset: the <html> element
  // stays without the attribute and the CSS (color-scheme / prefers-color-scheme) decides on its own.
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  }
})(); 

/* ------------------------------------------
   Listen for system theme changes
   If the system changes the current theme and the user hasn't chosen a theme manually
   then we update the theme button. For the rest of the html, the css already switches the colors automatically
   ------------------------------------------ */
systemTheme.addEventListener('change', function handleSystemThemeChange() {
  if (getStoredTheme()) return;
  updateThemeBtn(document.querySelector('.btn-theme'), getEffectiveTheme());
});
 
/* --------------------------------------------
   Theme button — sync icon + label
   -------------------------------------------- */
function updateThemeBtn(btn, theme) {
  if (!btn) return;
  const isDark = theme === 'dark';
  btn.querySelector('.theme-icon').textContent  = isDark ? '☀️' : '🌙';
  btn.querySelector('.theme-label').textContent = isDark ? 'Light' : 'Dark';
  btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
}

/* --------------------------------------------
   Used inside the navbar
   -------------------------------------------- */
function toggleTheme(btn) {
  const nextTheme = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', nextTheme);
  storeTheme(nextTheme);
  updateThemeBtn(btn, nextTheme);
}

/* --------------------------------------------
   Navbar — Web Component
   -------------------------------------------- */

class AiraNavbar extends HTMLElement {
  // connectedCallback is part of the custom element lifecycle and is called
  // when the element is connected to the DOM. Here, it is used to initialize the element.
  connectedCallback() {
    fetch('/components/navbar.html')
      .then(res => res.text())
      .then(html => {
        //Empty html recieves the html from /navbar.html
        this.innerHTML = html;

        const btn   = this.querySelector('.btn-theme');
        const theme = document.documentElement.getAttribute('data-theme');
        updateThemeBtn(btn, theme);

        // Adds a click event listener to detect when the user clicks the navbar's menu toggle button.
        // This could be placed elsewhere, but it makes sense to keep it here since it handles navbar-related behavior.
        document.addEventListener('click', _handleSideMenuClick);
      });
  }
}

/* --------------------------------------------
   Footer — Web Component
   -------------------------------------------- */
class AiraFooter extends HTMLElement {
  connectedCallback() {
    fetch('/components/footer.html')
      .then(res => res.text())
      .then(html => {
        this.innerHTML = html;
      });
  }
}

/* --------------------------------------------
   Side menu — outside click handler
   -------------------------------------------- */
function _handleSideMenuClick(event) {
  const menu   = document.getElementById('itensMenu');
  const toggle = document.querySelector('.navbar-toggle');
  if (!menu || !toggle) return;

  // Clicked inside or outside side menu or the toggle button for the side menu
  const clickedInside = menu.contains(event.target) || toggle.contains(event.target);
  const clickedOutside = !clickedInside;
  const isActive = menu.classList.contains('active');

  if (clickedInside && !isActive) {
    menu.classList.add('active');
  } else if (clickedOutside && isActive) {
    menu.classList.remove('active');
  }
}

customElements.define('aira-navbar', AiraNavbar);
customElements.define('aira-footer', AiraFooter);
