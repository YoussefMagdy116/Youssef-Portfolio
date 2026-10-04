"use client";

import { useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { skillClusters, skillGraphTools } from "@/data/portfolio";

const SHORT_LABELS: Record<string, string> = {
  secops: "SECURITY OPS",
  siem: "SIEM & TOOLING",
  netdef: "NETWORK DEFENSE",
  networking: "NETWORKING",
  sysadmin: "SYSADMIN",
  automation: "AUTOMATION",
};

/** Screen order of categories — keeps small groups separated by large ones. */
const CATEGORY_ORDER = [
  "secops",
  "siem",
  "netdef",
  "networking",
  "automation",
  "sysadmin",
];

const W = 820;
const H = 620;
const CX = W / 2;
const CY = H / 2;
const R_CAT = 150;
const R_TOOL = 235;

type Point = { x: number; y: number };
type ToolNode = { id: string; label: string; cat: string; point: Point };
type CatNode = {
  id: string;
  label: string;
  width: number;
  point: Point;
  tools: ToolNode[];
};

function polar(cx: number, cy: number, r: number, deg: number): Point {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function SkillGraph() {
  const reduce = useReducedMotion() ?? false;
  const [hoverTool, setHoverTool] = useState<string | null>(null);

  const { categories, centerToCat, catToTool } = useMemo(() => {
    // Every category gets an angular slot: a 30° base (so labels never
    // collide) plus 12° per tool. 6*30 + 15*12 = 360 exactly.
    const orderedClusters = CATEGORY_ORDER.map((id) =>
      skillClusters.find((c) => c.id === id)
    ).filter((c): c is (typeof skillClusters)[number] => Boolean(c));
    const arcs = orderedClusters.map(
      (cluster) =>
        30 +
        12 * skillGraphTools.filter((t) => t.category === cluster.id).length
    );

    let cursor = -90 - arcs[0] / 2; // centre the first slot at the top
    const cats: CatNode[] = orderedClusters.map((cluster, i) => {
      const start = cursor;
      const end = start + arcs[i];
      cursor = end;
      const point = polar(CX, CY, R_CAT, (start + end) / 2);
      const group = skillGraphTools.filter((t) => t.category === cluster.id);
      const tools = group.map((t, j) => ({
        id: t.id,
        label: t.label,
        cat: cluster.id,
        point: polar(CX, CY, R_TOOL, start + ((j + 0.5) * (end - start)) / group.length),
      }));
      const label = SHORT_LABELS[cluster.id] ?? cluster.title.toUpperCase();
      return { id: cluster.id, label, width: label.length * 6.8 + 20, point, tools };
    });

    const c2c = cats.map((cat) => ({
      cat,
      d: `M ${CX} ${CY} L ${cat.point.x} ${cat.point.y}`,
    }));

    const c2t: { cat: CatNode; tool: ToolNode; d: string }[] = [];
    for (const cat of cats) {
      for (const tool of cat.tools) {
        c2t.push({
          cat,
          tool,
          d: `M ${cat.point.x} ${cat.point.y} L ${tool.point.x} ${tool.point.y}`,
        });
      }
    }
    return { categories: cats, centerToCat: c2c, catToTool: c2t };
  }, []);

  const hoverCat = hoverTool
    ? categories.find((c) => c.tools.some((t) => t.id === hoverTool))?.id ??
      null
    : null;

  const dimTool = (toolId: string, catId: string) =>
    hoverTool !== null && hoverTool !== toolId && hoverCat !== catId;
  const dimCat = (catId: string) =>
    hoverTool !== null && hoverCat !== catId;

  const packets = [
    ...centerToCat.slice(0, 5).map((l, i) => ({
      d: l.d,
      dur: 3 + (i % 3) * 0.8,
      begin: -i * 1.1,
    })),
    ...catToTool
      .filter((_, i) => i % 3 === 0)
      .slice(0, 5)
      .map((l, i) => ({
        d: l.d,
        dur: 2.6 + (i % 3) * 0.7,
        begin: -0.5 - i * 0.9,
      })),
  ];

  return (
    <div
      className="glass scanfx relative overflow-hidden rounded-lg"
      onMouseLeave={() => setHoverTool(null)}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 px-4 py-2.5">
        <p className="font-mono text-[11px] tracking-[0.2em] text-slate-400">
          TOPOLOGY // CORE TOOLING
        </p>
        <p className="font-mono text-[10px] text-slate-600">
          Hover a node to trace its connections
        </p>
      </div>

      <div className="p-3 sm:p-5">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label="Skill topology graph: Youssef at the center, connected to security operations, SIEM and tooling, network defense, networking, systems administration, and automation categories, each linked to specific tools such as QRadar, MikroTik, and Active Directory."
        >
          {/* connections */}
          <g>
            {centerToCat.map(({ cat, d }) => (
              <path
                key={`c2c-${cat.id}`}
                d={d}
                fill="none"
                stroke="#22d3ee"
                strokeWidth={1}
                strokeOpacity={dimCat(cat.id) ? 0.06 : 0.2}
              />
            ))}
            {catToTool.map(({ cat, tool, d }) => (
              <path
                key={`c2t-${tool.id}`}
                d={d}
                fill="none"
                stroke="#2dd4bf"
                strokeWidth={1}
                strokeOpacity={dimTool(tool.id, cat.id) ? 0.06 : 0.16}
              />
            ))}
          </g>

          {/* moving packets */}
          {!reduce
            ? packets.map((p, i) => (
                <circle key={`pkt-${i}`} r={2} fill="#67e8f9" opacity={0.85}>
                  <animateMotion
                    dur={`${p.dur}s`}
                    begin={`${p.begin}s`}
                    repeatCount="indefinite"
                    path={p.d}
                  />
                </circle>
              ))
            : null}

          {/* center node */}
          <g opacity={hoverTool !== null && !hoverCat ? 0.35 : 1}>
            <circle
              cx={CX}
              cy={CY}
              r={56}
              fill="#071019"
              stroke="#22d3ee"
              strokeOpacity={0.55}
              strokeWidth={1.5}
            />
            <circle
              cx={CX}
              cy={CY}
              r={64}
              fill="none"
              stroke="#22d3ee"
              strokeOpacity={0.15}
              strokeDasharray="3 6"
            />
            <text
              x={CX}
              y={CY - 2}
              textAnchor="middle"
              className="fill-slate-100 font-display"
              fontSize={14}
              fontWeight={600}
            >
              YOUSSEF
            </text>
            <text
              x={CX}
              y={CY + 16}
              textAnchor="middle"
              className="fill-cyan-400 font-mono"
              fontSize={8.5}
              letterSpacing={2}
            >
              CYBERSECURITY
            </text>
          </g>

          {/* category nodes */}
          {categories.map((cat) => (
            <g key={cat.id} opacity={dimCat(cat.id) ? 0.25 : 1}>
              <rect
                x={cat.point.x - cat.width / 2}
                y={cat.point.y - 13}
                width={cat.width}
                height={26}
                rx={4}
                fill="rgba(34, 211, 238, 0.07)"
                stroke="#22d3ee"
                strokeOpacity={0.4}
              />
              <text
                x={cat.point.x}
                y={cat.point.y + 3.5}
                textAnchor="middle"
                className="fill-cyan-300 font-mono"
                fontSize={9.5}
                letterSpacing={1}
              >
                {cat.label}
              </text>
            </g>
          ))}

          {/* tool nodes */}
          {categories.flatMap((cat) =>
            cat.tools.map((tool) => {
              const dim = dimTool(tool.id, cat.id);
              const hot = hoverTool === tool.id;
              return (
                <g
                  key={tool.id}
                  opacity={dim ? 0.25 : 1}
                  onMouseEnter={() => setHoverTool(tool.id)}
                >
                  <circle
                    cx={tool.point.x}
                    cy={tool.point.y}
                    r={12}
                    fill="transparent"
                  />
                  <circle
                    cx={tool.point.x}
                    cy={tool.point.y}
                    r={hot ? 5.5 : 4}
                    fill={hot ? "#22d3ee" : "#67e8f9"}
                    fillOpacity={hot ? 1 : 0.85}
                  />
                  <text
                    x={tool.point.x}
                    y={tool.point.y + 17}
                    textAnchor="middle"
                    className={
                      hot ? "fill-slate-100 font-mono" : "fill-slate-400 font-mono"
                    }
                    fontSize={10}
                  >
                    {tool.label}
                  </text>
                </g>
              );
            })
          )}
        </svg>
      </div>
    </div>
  );
}
