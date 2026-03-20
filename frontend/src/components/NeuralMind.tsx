import { useRef, useEffect } from "react";

// Brain contour — top-view with subtle brain stem, normalized 0-1
const BRAIN_CONTOUR: [number, number][] = [
  [0.38, 0.11], [0.46, 0.07], [0.55, 0.07], [0.63, 0.10],
  [0.72, 0.15], [0.80, 0.23], [0.86, 0.33], [0.88, 0.44],
  [0.86, 0.55], [0.82, 0.64], [0.75, 0.71], [0.67, 0.75],
  [0.60, 0.78], [0.56, 0.82], [0.58, 0.90], [0.52, 0.92],
  [0.46, 0.88], [0.44, 0.82], [0.39, 0.79], [0.31, 0.74],
  [0.24, 0.67], [0.19, 0.58], [0.17, 0.48], [0.18, 0.37],
  [0.23, 0.27], [0.30, 0.20], [0.35, 0.14],
];

function pointInBrain(px: number, py: number): boolean {
  const pts = BRAIN_CONTOUR;
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

interface Node {
  x: number; y: number;
  baseX: number; baseY: number;
  vx: number; vy: number;
  r: number; bright: number;
  isCore: boolean;
}
interface Edge { a: number; b: number; }
interface Pulse {
  edge: number; t: number; speed: number; dir: 1 | -1;
  size: number; bright: number;
}

const NeuralMind = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const state = useRef<{
    nodes: Node[]; edges: Edge[]; pulses: Pulse[]; time: number;
    nodeEdges: number[][];
  }>({ nodes: [], edges: [], pulses: [], time: 0, nodeEdges: [] });
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function build() {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const W = rect.width;
      const H = rect.height;
      // Brain centered in its container
      const cx = W * 0.5;
      const cy = H * 0.5;
      const sx = Math.min(W * 0.52, 560);
      const sy = Math.min(H * 0.6, 520);

      const nodes: Node[] = [];

      // Core node (bright center nucleus)
      nodes.push({
        x: cx, y: cy, baseX: cx, baseY: cy,
        vx: 0, vy: 0, r: 4, bright: 1, isCore: true,
      });

      // Contour nodes
      for (const [nx, ny] of BRAIN_CONTOUR) {
        const x = cx + (nx - 0.5) * sx;
        const y = cy + (ny - 0.5) * sy;
        nodes.push({
          x, y, baseX: x, baseY: y,
          vx: 0, vy: 0,
          r: 2 + Math.random() * 1.5,
          bright: 0.6 + Math.random() * 0.4,
          isCore: false,
        });
      }

      // Interior nodes — sparser grid
      const step = 0.06;
      for (let gx = 0.14; gx < 0.90; gx += step) {
        for (let gy = 0.06; gy < 0.90; gy += step) {
          const jx = gx + (Math.random() - 0.5) * step * 0.6;
          const jy = gy + (Math.random() - 0.5) * step * 0.6;
          if (pointInBrain(jx, jy)) {
            const x = cx + (jx - 0.5) * sx;
            const y = cy + (jy - 0.5) * sy;
            const dc = Math.sqrt((jx - 0.5) ** 2 + (jy - 0.45) ** 2);
            nodes.push({
              x, y, baseX: x, baseY: y,
              vx: 0, vy: 0,
              r: 1.2 + Math.random() * 1.8,
              bright: 0.2 + Math.max(0, 0.4 - dc * 1.5) + Math.random() * 0.15,
              isCore: false,
            });
          }
        }
      }

      // Outer peripheral nodes (atmosphere)
      for (let i = 0; i < 18; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 0.52 + Math.random() * 0.4;
        const x = cx + Math.cos(angle) * sx * dist;
        const y = cy + Math.sin(angle) * sy * dist;
        nodes.push({
          x, y, baseX: x, baseY: y,
          vx: 0, vy: 0,
          r: 1.2 + Math.random() * 1.3,
          bright: 0.1 + Math.random() * 0.15,
          isCore: false,
        });
      }

      // Build edges
      const edges: Edge[] = [];
      const edgeSet = new Set<string>();
      const maxD = Math.min(W, H) * 0.14;

      for (let i = 0; i < nodes.length; i++) {
        const dists: { j: number; d: number }[] = [];
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].baseX - nodes[j].baseX;
          const dy = nodes[i].baseY - nodes[j].baseY;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxD) dists.push({ j, d });
        }
        dists.sort((a, b) => a.d - b.d);
        const limit = i === 0 ? 8 : Math.min(3 + Math.floor(Math.random() * 2), dists.length);
        for (let k = 0; k < limit; k++) {
          const key = `${i}-${dists[k].j}`;
          if (!edgeSet.has(key)) {
            edgeSet.add(key);
            edges.push({ a: i, b: dists[k].j });
          }
        }
      }

      // Adjacency
      const nodeEdges: number[][] = Array.from({ length: nodes.length }, () => []);
      for (let i = 0; i < edges.length; i++) {
        nodeEdges[edges[i].a].push(i);
        nodeEdges[edges[i].b].push(i);
      }

      // Pulses
      const pulses: Pulse[] = [];
      const pCount = Math.max(10, Math.floor(edges.length * 0.05));
      for (let i = 0; i < pCount; i++) {
        pulses.push({
          edge: Math.floor(Math.random() * edges.length),
          t: Math.random(),
          speed: 0.003 + Math.random() * 0.005,
          dir: Math.random() > 0.5 ? 1 : -1,
          size: 2 + Math.random() * 2,
          bright: 0.6 + Math.random() * 0.4,
        });
      }

      state.current = { nodes, edges, pulses, time: 0, nodeEdges };
    }

    build();
    window.addEventListener("resize", build);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    function render() {
      const rect = canvas.parentElement!.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const { nodes, edges, pulses, nodeEdges } = state.current;
      const m = mouse.current;
      state.current.time += 0.016;
      const t = state.current.time;

      ctx.clearRect(0, 0, W, H);

      // Physics
      for (const n of nodes) {
        const dx = m.x - n.x;
        const dy = m.y - n.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const inf = Math.max(0, 1 - d / 250);
        n.vx += dx * inf * 0.001;
        n.vy += dy * inf * 0.001;
        n.vx += (n.baseX - n.x) * 0.05;
        n.vy += (n.baseY - n.y) * 0.05;
        n.vx *= 0.85; n.vy *= 0.85;
        n.x += n.vx; n.y += n.vy;
      }

      // Adjacency lookup for triangle detection
      const adj = new Set<string>();
      for (const e of edges) {
        adj.add(`${Math.min(e.a, e.b)}-${Math.max(e.a, e.b)}`);
      }

      // Triangular facets
      const triSet = new Set<string>();
      for (let i = 0; i < edges.length; i++) {
        const ea = edges[i];
        for (const ei of nodeEdges[ea.a]) {
          if (ei <= i) continue;
          const eb = edges[ei];
          const third = eb.a === ea.a ? eb.b : eb.a;
          if (third === ea.b) continue;
          if (adj.has(`${Math.min(third, ea.b)}-${Math.max(third, ea.b)}`)) {
            const tk = [ea.a, ea.b, third].sort().join(",");
            if (!triSet.has(tk)) {
              triSet.add(tk);
              const na = nodes[ea.a], nb = nodes[ea.b], nc = nodes[third];
              const tcx = (na.x + nb.x + nc.x) / 3;
              const tcy = (na.y + nb.y + nc.y) / 3;
              const td = Math.sqrt((m.x - tcx) ** 2 + (m.y - tcy) ** 2);
              const tg = Math.max(0, 1 - td / 220);
              ctx.beginPath();
              ctx.moveTo(na.x, na.y);
              ctx.lineTo(nb.x, nb.y);
              ctx.lineTo(nc.x, nc.y);
              ctx.closePath();
              ctx.fillStyle = `hsla(210, 80%, 42%, ${0.035 + tg * 0.09})`;
              ctx.fill();
            }
          }
        }
      }

      // Edges — clearly visible like NextMind
      for (const e of edges) {
        const na = nodes[e.a], nb = nodes[e.b];
        const mx = (na.x + nb.x) / 2;
        const my = (na.y + nb.y) / 2;
        const md = Math.sqrt((m.x - mx) ** 2 + (m.y - my) ** 2);
        const g = Math.max(0, 1 - md / 220);

        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `hsla(195, 85%, 60%, ${0.15 + g * 0.4})`;
        ctx.lineWidth = 0.5 + g * 1.3;
        ctx.stroke();
      }

      // Nodes
      for (const n of nodes) {
        const dx = m.x - n.x;
        const dy = m.y - n.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const g = Math.max(0, 1 - d / 220);
        const pulse = Math.sin(t * 1.5 + n.baseX * 0.01 + n.baseY * 0.008) * 0.1;
        const b = Math.min(1, n.bright + g * 0.35 + pulse);

        // Glow halo
        const gr = n.isCore ? 30 : 5 + g * 14;
        const ga = n.isCore ? 0.2 + g * 0.2 : Math.min(0.25, b * 0.12 + g * 0.15);
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, gr);
        grd.addColorStop(0, `hsla(195, 100%, 82%, ${ga})`);
        grd.addColorStop(0.5, `hsla(210, 90%, 60%, ${ga * 0.25})`);
        grd.addColorStop(1, "hsla(210, 90%, 60%, 0)");
        ctx.beginPath();
        ctx.arc(n.x, n.y, gr, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Dot — small, crisp
        const dotR = n.isCore ? 5 : n.r * (0.8 + g * 0.3);
        ctx.beginPath();
        ctx.arc(n.x, n.y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = n.isCore
          ? `hsla(190, 100%, 92%, 0.95)`
          : `hsla(200, 85%, 78%, ${Math.min(0.9, b + 0.15)})`;
        ctx.fill();
      }

      // Traveling pulses
      for (const p of pulses) {
        p.t += p.speed * p.dir;
        if (p.t > 1 || p.t < 0) {
          const e = edges[p.edge];
          const cur = p.dir === 1 ? e.b : e.a;
          const opts = nodeEdges[cur].filter((i) => i !== p.edge);
          if (opts.length > 0) {
            const next = opts[Math.floor(Math.random() * opts.length)];
            p.edge = next;
            const ne = edges[next];
            if (ne.a === cur) { p.dir = 1; p.t = 0; }
            else { p.dir = -1; p.t = 1; }
          } else {
            p.edge = Math.floor(Math.random() * edges.length);
            p.t = Math.random();
          }
        }
        const e = edges[p.edge];
        if (!e) continue;
        const na = nodes[e.a], nb = nodes[e.b];
        const px = na.x + (nb.x - na.x) * p.t;
        const py = na.y + (nb.y - na.y) * p.t;

        const tg = ctx.createRadialGradient(px, py, 0, px, py, p.size * 7);
        tg.addColorStop(0, `hsla(190, 100%, 88%, ${p.bright * 0.65})`);
        tg.addColorStop(0.3, `hsla(205, 95%, 65%, ${p.bright * 0.2})`);
        tg.addColorStop(1, "hsla(205, 95%, 65%, 0)");
        ctx.beginPath();
        ctx.arc(px, py, p.size * 7, 0, Math.PI * 2);
        ctx.fillStyle = tg;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(190, 100%, 95%, ${p.bright})`;
        ctx.fill();
      }

      raf.current = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", build);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
};

export default NeuralMind;
