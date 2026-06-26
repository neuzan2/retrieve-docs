// Renders docs/complete-platform-guide.md to one self-contained HTML styled to
// match the Docusaurus classic theme (top navbar, Infima green accent, sidebar
// menu, content typography), with an auto-built sidebar (scrollspy + mobile
// toggle), inlined images, and inlined mermaid (renders client-side after
// staticrypt decrypts via document.write). Output path is argv[2].
const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it');
const anchor = require('markdown-it-anchor');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'docs', 'complete-platform-guide.md');
const IMAGES = path.join(ROOT, 'docs', 'images');
const OUT = process.argv[2] || path.join(ROOT, 'standalone.html');

const MERMAID_JS = fs
  .readFileSync(path.join(ROOT, 'node_modules', 'mermaid', 'dist', 'mermaid.min.js'), 'utf8')
  .replace(/<\/script>/gi, '<\\/script>');

function slugify(s) {
  return s.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s/g, '-');
}
const stripTags = (s) => s.replace(/<[^>]+>/g, '').trim();

const md = new MarkdownIt({ html: false, linkify: true, typographer: false })
  .use(anchor, { slugify, tabIndex: false });

const defaultFence = md.renderer.rules.fence.bind(md.renderer.rules);
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  if (tokens[idx].info.trim() === 'mermaid') {
    return `<pre class="mermaid">${md.utils.escapeHtml(tokens[idx].content)}</pre>\n`;
  }
  return defaultFence(tokens, idx, options, env, self);
};

let src = fs.readFileSync(SRC, 'utf8');
src = src.replace(/^---\n[\s\S]*?\n---\n/, '');
let html = md.render(src);

let inlined = 0;
html = html.replace(/src="(?:\.\/)?images\/([^"]+)"/g, (m, file) => {
  const p = path.join(IMAGES, file);
  try {
    inlined++;
    return `src="data:image/png;base64,${fs.readFileSync(p).toString('base64')}"`;
  } catch (e) {
    console.error('MISSING IMAGE:', p);
    return m;
  }
});

const heads = [];
const re = /<h([123]) id="([^"]+)">([\s\S]*?)<\/h\1>/g;
let m;
while ((m = re.exec(html))) heads.push({ level: +m[1], id: m[2], html: m[3] });

const GROUP = /^(VOLUME \d|Part \d+:|Appendix [A-C]:|About This Guide|The End-to-End Flow|Table of Contents|From the Pipeline|The Chart Lifecycle)/i;
function navClass(h) {
  if (h.level === 3) return 'g2';
  if (h.level === 1 || GROUP.test(stripTags(h.html))) return 'g0';
  return 'g1';
}
const title = heads[0] && heads[0].level === 1 ? stripTags(heads[0].html) : 'ECLAT.Retrieve';
const navItems = heads.filter((h, i) => !(i === 0 && h.level === 1));
const nav = '<ul class="menu__list">' +
  navItems.map((h) => `<li class="menu__list-item"><a class="menu__link ${navClass(h)}" href="#${h.id}">${h.html}</a></li>`).join('') +
  '</ul>';

// Docusaurus classic-theme look (Infima defaults).
const css = `
:root{
  --ifm-color-primary:#2e8555;--ifm-color-primary-dark:#29784c;--ifm-color-primary-darker:#277148;
  --fg:#1c1e21;--muted:#606770;--bg:#fff;--border:#dadde1;--code:#f6f8fa;
  --sb-bg:#fff;--navbar-bg:#fff;--navbar-h:60px;
  --menu-active-bg:#e6f6ec;--link:#2e8555;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--fg);
  font:16px/1.65 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Helvetica,Arial,sans-serif;}
a{color:var(--link);text-decoration:none}a:hover{text-decoration:underline}

/* navbar */
.navbar{position:fixed;top:0;left:0;right:0;height:var(--navbar-h);z-index:100;background:var(--navbar-bg);
  box-shadow:0 1px 2px 0 rgba(0,0,0,.1);display:flex;align-items:center;padding:0 16px;}
.navbar__title{font-weight:700;font-size:1.15rem;color:var(--fg)}
.navbar__sub{color:var(--muted);font-size:.9rem;margin-left:12px;border-left:1px solid var(--border);padding-left:12px}
.menu-toggle{display:none;background:none;border:0;font-size:22px;cursor:pointer;margin-right:10px;color:var(--fg)}

/* layout */
.layout{display:flex;align-items:flex-start;padding-top:var(--navbar-h)}
.sidebar{position:sticky;top:var(--navbar-h);height:calc(100vh - var(--navbar-h));width:300px;min-width:300px;
  overflow-y:auto;background:var(--sb-bg);border-right:1px solid var(--border);padding:16px 12px 60px}

/* sidebar menu (Infima .menu) */
.menu__list{list-style:none;margin:0;padding:0}
.menu__list-item{margin:1px 0}
.menu__link{display:block;padding:7px 12px;border-radius:.4rem;color:var(--fg);font-size:.92rem;line-height:1.35;}
.menu__link:hover{background:#f0f1f2;text-decoration:none}
.menu__link.active{background:var(--menu-active-bg);color:var(--ifm-color-primary-darker);font-weight:600}
.menu__link.g0{font-weight:700}
.menu__link.g1{padding-left:26px}
.menu__link.g2{padding-left:40px;color:var(--muted);font-size:.86rem}

/* content (Infima .markdown) */
.doc{flex:1;min-width:0;max-width:900px;margin:0 auto;padding:24px 40px 160px}
.markdown h1,.markdown h2,.markdown h3,.markdown h4{line-height:1.25;margin-top:1.8rem;font-weight:700;scroll-margin-top:calc(var(--navbar-h) + 12px)}
.markdown h1{font-size:2rem}
.markdown h2{font-size:1.5rem;border-bottom:1px solid var(--border);padding-bottom:.3em;margin-top:2.4rem}
.markdown h3{font-size:1.25rem}
.markdown table{border-collapse:collapse;display:block;width:100%;margin:1rem 0;overflow-x:auto}
.markdown th,.markdown td{border:1px solid var(--border);padding:8px 13px;text-align:left;vertical-align:top}
.markdown tr:nth-child(2n){background:#f6f8fa}
.markdown th{background:#f6f8fa;font-weight:600}
.markdown code{background:var(--code);padding:.1rem .4rem;border-radius:.4rem;font-size:85%;
  font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.markdown pre{background:#f6f8fa;padding:16px;border-radius:.5rem;overflow:auto;border:1px solid var(--border)}
.markdown pre code{background:none;padding:0;border:0}
.markdown pre.mermaid{background:none;border:0;padding:0;overflow:visible;text-align:center;margin:1.6rem 0}
.markdown pre.mermaid svg{max-width:100%;height:auto}
.markdown blockquote{margin:1rem 0;padding:.5rem 1rem;color:var(--fg);
  border-left:5px solid var(--ifm-color-primary);background:#f6faf7;border-radius:.25rem}
.markdown img{max-width:100%;height:auto;border:1px solid var(--border);border-radius:.4rem}
.markdown hr{border:0;border-top:1px solid var(--border);margin:2.4rem 0}
.markdown ul,.markdown ol{padding-left:1.6em}

@media (max-width:996px){
  .menu-toggle{display:inline-flex}
  .sidebar{position:fixed;left:0;top:var(--navbar-h);height:calc(100vh - var(--navbar-h));z-index:90;
    transform:translateX(-100%);transition:transform .2s;box-shadow:0 0 24px rgba(0,0,0,.18)}
  .sidebar.open{transform:none}
  .doc{padding:20px 20px 140px}
}
`;

const sidebarJs = `
(function(){
  var sb=document.querySelector('.sidebar'), btn=document.querySelector('.menu-toggle');
  if(btn&&sb) btn.addEventListener('click',function(){sb.classList.toggle('open');});
  var links={};
  document.querySelectorAll('.sidebar a.menu__link').forEach(function(a){
    links[decodeURIComponent(a.getAttribute('href').slice(1))]=a;
    a.addEventListener('click',function(){ if(window.innerWidth<=996&&sb) sb.classList.remove('open'); });
  });
  var obs=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){
        for(var k in links) links[k].classList.remove('active');
        var a=links[e.target.id];
        if(a){a.classList.add('active'); a.scrollIntoView({block:'nearest'});}
      }
    });
  },{rootMargin:'0px 0px -82% 0px',threshold:0});
  document.querySelectorAll('h1[id],h2[id],h3[id]').forEach(function(h){obs.observe(h);});
})();
`;

const out = `<!doctype html>
<html lang="en" data-theme="light"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>ECLAT.Retrieve — Complete Platform Guide</title>
<style>${css}</style>
</head><body>
<nav class="navbar">
  <button class="menu-toggle" aria-label="Toggle contents">☰</button>
  <span class="navbar__title">ECLAT.Retrieve</span>
  <span class="navbar__sub">Complete Platform Guide</span>
</nav>
<div class="layout">
<aside class="sidebar"><nav class="menu">${nav}</nav></aside>
<main class="doc markdown">
${html}
</main>
</div>
<script>${MERMAID_JS}</script>
<script>
(function(){function run(){try{window.mermaid.initialize({startOnLoad:false,theme:'neutral',securityLevel:'loose'});window.mermaid.run({querySelector:'pre.mermaid'});}catch(e){console.error('mermaid render failed:',e);}}if(window.mermaid)run();else document.addEventListener('DOMContentLoaded',run);})();
</script>
<script>${sidebarJs}</script>
</body></html>`;

fs.writeFileSync(OUT, out);
console.log(
  'wrote', OUT, (fs.statSync(OUT).size / 1024 / 1024).toFixed(2), 'MB',
  '| images:', inlined,
  '| mermaid:', (out.match(/<pre class="mermaid">/g) || []).length,
  '| nav items:', navItems.length
);
