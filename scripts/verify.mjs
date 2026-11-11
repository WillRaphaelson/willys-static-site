import assert from 'node:assert/strict';
const base = process.argv[2] || 'http://localhost:8080';
const paths = ['/', '/index.html', '/menu.html', '/menu-print.html', '/about.html', '/visit.html', '/assets/style.css', '/assets/rigatoni.svg', '/assets/favicon.svg', '/robots.txt'];
for (const path of paths) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, path);
  if (path.endsWith('.html') || path === '/') {
    const html = await response.text();
    assert.match(html, /Willys/);
    for (const [, target] of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
      const url = new URL(target, base);
      if (url.origin !== new URL(base).origin) continue;
      const linked = await fetch(url);
      assert.equal(linked.status, 200, `${path} -> ${target}`);
    }
  }
  console.log(`PASS 200 ${path}`);
}
const moved = await fetch(new URL('/food.html', base), {redirect: 'manual'});
assert.equal(moved.status, 301);
assert.equal(moved.headers.get('location'), '/menu.html');
console.log('PASS 301 /food.html -> /menu.html');
for (const path of ['/missing-page', '/.env', '/Caddyfile', '/assets/missing.css']) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 404, path);
  assert.match(await response.text(), /off/);
  console.log(`PASS real 404 ${path}`);
}
const asset = await fetch(new URL('/assets/rigatoni.svg', base));
assert.match(asset.headers.get('content-type'), /image\/svg\+xml/);
assert.match(asset.headers.get('cache-control'), /max-age=60/);
console.log('PASS SVG content type and conservative cache policy');
