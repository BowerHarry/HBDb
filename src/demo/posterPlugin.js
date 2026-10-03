// Vite dev-server plugin for demo mode: serves a generated SVG poster for each
// fictional film at /demo-posters/<size>/<id>.jpg. Dev server only.
import { films } from './films.js';

const W = 600;
const H = 900;

const motifs = {
  sun: ([a]) => `
    <circle cx="300" cy="330" r="150" fill="${a}" opacity="0.9"/>
    <rect x="0" y="400" width="${W}" height="6" fill="#fff" opacity="0.35"/>
    <rect x="0" y="430" width="${W}" height="4" fill="#fff" opacity="0.25"/>
    <rect x="0" y="456" width="${W}" height="2" fill="#fff" opacity="0.18"/>`,
  waves: ([a]) => [0, 1, 2, 3, 4].map((i) => `
    <path d="M0 ${250 + i * 60} Q 150 ${200 + i * 60} 300 ${250 + i * 60} T 600 ${250 + i * 60}"
      fill="none" stroke="${a}" stroke-width="${10 - i}" opacity="${0.9 - i * 0.15}"/>`).join(''),
  dots: ([a]) => [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => `
    <circle cx="${150 + (i % 3) * 150}" cy="${180 + Math.floor(i / 3) * 140}" r="${34 + ((i * 7) % 3) * 10}"
      fill="${i % 2 ? '#fff' : a}" opacity="${i % 2 ? 0.25 : 0.85}"/>`).join(''),
  rings: ([a]) => [0, 1, 2, 3].map((i) => `
    <circle cx="300" cy="330" r="${60 + i * 50}" fill="none" stroke="${i ? '#fff' : a}"
      stroke-width="${i ? 3 : 14}" opacity="${i ? 0.3 : 0.9}"/>`).join(''),
  hills: ([a]) => `
    <circle cx="430" cy="220" r="60" fill="#fff" opacity="0.6"/>
    <path d="M0 520 L160 300 L300 460 L440 260 L600 500 L600 560 L0 560 Z" fill="${a}" opacity="0.85"/>
    <path d="M0 560 L220 400 L380 520 L600 420 L600 600 L0 600 Z" fill="#000" opacity="0.25"/>`,
  bars: ([a]) => [0, 1, 2, 3, 4, 5].map((i) => `
    <rect x="${90 + i * 75}" y="${160 + ((i * 53) % 140)}" width="45" height="${220 + ((i * 37) % 120)}"
      fill="${i % 2 ? '#fff' : a}" opacity="${i % 2 ? 0.25 : 0.85}"/>`).join(''),
};

function titleLines(title) {
  const lines = [];
  for (const word of title.toUpperCase().split(' ')) {
    const last = lines[lines.length - 1];
    if (last && (last + ' ' + word).length <= 11) lines[lines.length - 1] = last + ' ' + word;
    else lines.push(word);
  }
  return lines;
}

function poster(film) {
  const [a, b] = film.colors;
  const lines = titleLines(film.title);
  const startY = 760 - (lines.length - 1) * 72;
  const text = lines.map((line, i) => `
    <text x="50" y="${startY + i * 72}" font-size="68" font-weight="800" letter-spacing="2"
      fill="#fff">${line.replace(/&/g, '&amp;')}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"
    font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
    </linearGradient></defs>
    <rect width="${W}" height="${H}" fill="${b}"/>
    <rect width="${W}" height="${H}" fill="url(#g)" opacity="0.55"/>
    ${motifs[film.motif]([a, b])}
    <rect y="560" width="${W}" height="340" fill="${b}" opacity="0.55"/>
    ${text}
    <text x="52" y="830" font-size="20" letter-spacing="6" fill="#fff" opacity="0.75">${film.release_date.slice(0, 4)} · ${film.genres[0].toUpperCase()}</text>
    <text x="52" y="60" font-size="16" letter-spacing="5" fill="#fff" opacity="0.6">HBDB DEMO POSTER</text>
  </svg>`;
}

export function demoPosters() {
  return {
    name: 'hbdb-demo-posters',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = /^\/demo-posters\/.*?(\d+)\.jpg/.exec(req.url);
        const film = match && films.find((f) => f.id === Number(match[1]));
        if (!film) return next();
        res.setHeader('Content-Type', 'image/svg+xml');
        res.end(poster(film));
      });
    },
  };
}
