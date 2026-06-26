// Renders docs/complete-platform-guide.md to one self-contained HTML
// (images inlined, embedded CSS, GitHub-style heading anchors). Mermaid fences
// become <pre class="mermaid"> and mermaid.js is inlined so diagrams render
// client-side after staticrypt decrypts the page (staticrypt uses document.write,
// which executes scripts). Output path is argv[2].
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const anchor = require('markdown-it-anchor');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'docs', 'complete-platform-guide.md');
const IMAGES = path.join(ROOT, 'docs', 'images');
const OUT = process.argv[2] || path.join(ROOT, 'standalone.html');

// mermaid UMD bundle, inlined. Escape "</script>" so it can't close the tag early.
const MERMAID_JS = fs
  .readFileSync(path.join(ROOT, 'node_modules', 'mermaid', 'dist', 'mermaid.min.js'), 'utf8')
  .replace(/<\/script>/gi, '<\\/script>');

function slugify(s) {
  return s.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s/g, '-');
}

const md = new MarkdownIt({ html: false, linkify: true, typographer: false })
  .use(anchor, { slugify, tabIndex: false });

// Render ```mermaid fences as <pre class="mermaid"> (mermaid.run picks these up).
const defaultFence = md.renderer.rules.fence.bind(md.renderer.rules);
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  if (tokens[idx].info.trim() === 'mermaid') {
    return `<pre class="mermaid">${md.utils.escapeHtml(tokens[idx].content)}</pre>\n`;
  }
  return defaultFence(tokens, idx, options, env, self);
};

let src = fs.readFileSync(SRC, 'utf8');
src = src.replace(/^---\n[\s\S]*?\n---\n/, ''); // strip Docusaurus YAML front matter

let html = md.render(src);

let inlined = 0;
html = html.replace(/src="(?:\.\/)?images\/([^"]+)"/g, (m, file) => {
  const p = path.join(IMAGES, file);
  try {
    const b64 = fs.readFileSync(p).toString('base64');
    inlined++;
    return `src="data:image/png;base64,${b64}"`;
  } catch (e) {
    console.error('MISSING IMAGE:', p);
    return m;
  }
});

const css = `
:root{--fg:#1f2328;--muted:#656d76;--border:#d0d7de;--bg:#fff;--code:#f6f8fa;--link:#0969da;}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;}
.doc{max-width:940px;margin:0 auto;padding:40px 24px 140px;}
h1,h2,h3,h4{line-height:1.25;margin-top:1.7em;font-weight:600;scroll-margin-top:16px;}
h1{font-size:2em;border-bottom:1px solid var(--border);padding-bottom:.3em}
h2{font-size:1.5em;border-bottom:1px solid var(--border);padding-bottom:.3em}
h3{font-size:1.2em}
a{color:var(--link);text-decoration:none}a:hover{text-decoration:underline}
table{border-collapse:collapse;width:100%;margin:1em 0;display:block;overflow-x:auto}
th,td{border:1px solid var(--border);padding:6px 12px;text-align:left;vertical-align:top}
th{background:var(--code)}
code{background:var(--code);padding:.15em .35em;border-radius:6px;font-size:85%;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
pre{background:var(--code);padding:16px;border-radius:8px;overflow:auto}
pre code{background:none;padding:0}
pre.mermaid{background:none;padding:0;overflow:visible;text-align:center;margin:1.4em 0}
pre.mermaid svg{max-width:100%;height:auto}
blockquote{margin:1em 0;padding:0 1em;color:var(--muted);border-left:.25em solid var(--border)}
img{max-width:100%;height:auto;border:1px solid var(--border);border-radius:6px}
hr{border:0;border-top:1px solid var(--border);margin:2.2em 0}
ul,ol{padding-left:1.6em}
`;

const out = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>ECLAT.Retrieve — Complete Platform Guide</title>
<style>${css}</style>
</head><body><main class="doc">
${html}
</main>
<script>${MERMAID_JS}</script>
<script>
(function () {
  function run() {
    try {
      window.mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'loose' });
      window.mermaid.run({ querySelector: 'pre.mermaid' });
    } catch (e) { console.error('mermaid render failed:', e); }
  }
  if (window.mermaid) run();
  else document.addEventListener('DOMContentLoaded', run);
})();
</script>
</body></html>`;

fs.writeFileSync(OUT, out);
const mermaidCount = (out.match(/<pre class="mermaid">/g) || []).length;
console.log(
  'wrote', OUT,
  (fs.statSync(OUT).size / 1024 / 1024).toFixed(2), 'MB',
  '| images inlined:', inlined,
  '| mermaid blocks:', mermaidCount,
  '| external img refs left:', (out.match(/src="(?:\.\/)?images\//g) || []).length
);
