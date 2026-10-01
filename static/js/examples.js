/* Syntax highlighter used inside the documentation.html page
   Used together with /static/css/base/syntax.css file
   Minimal HTML syntax highlighter (no dependencies).
   Builds DOM nodes with textContent, so example code is never parsed as HTML. */
const HTML_TOKEN = /(<!--[\s\S]*?-->)|(<\/?)([A-Za-z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)(\/?>)/g;
const ATTR_TOKEN = /([^\s=]+)(\s*=\s*)?("[^"]*"|'[^']*')?|(\s+)/g;

function span(cls, text) {
    const el = document.createElement("span");
    el.className = cls;
    el.textContent = text;
    return el;
}

function highlightHTML(source) {
    const frag = document.createDocumentFragment();
    let last = 0;

    for (const m of source.matchAll(HTML_TOKEN)) {
        if (m.index > last) {
            frag.append(source.slice(last, m.index));
        }

        if (m[1]) {
            frag.append(span("tok-comment", m[1]));
        } else {
            frag.append(span("tok-punct", m[2]), span("tok-tag", m[3]));

            for (const a of m[4].matchAll(ATTR_TOKEN)) {
                if (a[4]) {
                    frag.append(a[4]);
                    continue;
                }
                frag.append(span("tok-attr", a[1]));
                if (a[2]) frag.append(span("tok-punct", a[2]));
                if (a[3]) frag.append(span("tok-string", a[3]));
            }

            frag.append(span("tok-punct", m[5]));
        }
        last = m.index + m[0].length;
    }

    if (last < source.length) {
        frag.append(source.slice(last));
    }
    return frag;
}

document.addEventListener("DOMContentLoaded", () => {
    const targets = document.querySelectorAll("code[data-example]");

    targets.forEach(async (code) => {
        const url = code.dataset.example;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const text = await response.text();

            if (code.dataset.highlight === "html") {
                code.replaceChildren(highlightHTML(text));
            } else {
                code.textContent = text;
            }
        } catch (error) {
            console.error(`Failed to load example "${url}":`, error);
        }
    });
});

/* ---------- Copy button ---------- */

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        // Fallback for non-secure contexts (plain http, file://)
        const area = document.createElement("textarea");
        area.value = text;
        area.setAttribute("readonly", "");
        area.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
        document.body.appendChild(area);
        area.select();
        let ok = false;
        try {
            ok = document.execCommand("copy");
        } catch (e) {
            ok = false;
        }
        area.remove();
        return ok;
    }
}

const copyTimers = new WeakMap();

document.addEventListener("click", async (event) => {
    const btn = event.target.closest(".copy-btn");
    if (!btn) return;

    const code = btn.closest(".download-box")?.querySelector("code");
    if (!code || !code.textContent) return;

    const ok = await copyText(code.textContent);

    // Feedback toast (showToastKit comes from toast.js)
    if (typeof showToastKit === "function") {
        showToastKit(ok ? "Code copied to clipboard" : "Could not copy the code", ok ? "success" : "error");
    }

    // Optional state class for styling the button
    btn.classList.remove("is-copied", "is-error");
    btn.classList.add(ok ? "is-copied" : "is-error");

    clearTimeout(copyTimers.get(btn));
    copyTimers.set(btn, setTimeout(() => {
        btn.classList.remove("is-copied", "is-error");
    }, 1500));
});
