"use client";
import { useEffect, useRef } from "react";
import { hexRgb } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import { Chart as ChartJS, registerables } from "chart.js";
import type { BarChartProps } from "@/lib/types";
import { useId } from "react";

ChartJS.register(...registerables);

export default function BarChartRenderer({
  props: p,
}: {
  props: BarChartProps;
}) {
  const { fontFamily, textColor } = useGlobals();
  const uid = useId();

  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);
  const col2 = p.color2 || "#378ADD";
  const rgb2 = hexRgb(col2);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<ChartJS | null>(null);

  // Parse data: array of "label,v1,v2" strings or use defaults
  const rawData: string[] = Array.isArray(p.data) ? p.data : [];
  const hasData = rawData.length > 0;
  const labels = hasData
    ? rawData.map((s: string) => s.split(",")[0] || "")
    : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const vals1 = hasData
    ? rawData.map((s: string) => Number(s.split(",")[1]) || 0)
    : [8, 12, 9, 15, 11, 18, 14, 20];
  const vals2 = hasData
    ? rawData.map((s: string) => Number(s.split(",")[2]) || 0)
    : [12, 18, 14, 22, 17, 26, 21, 30];

  // IDs for accessibility
  const figId = `${uid}-chart-figure`;
  const captionId = `${uid}-chart-caption`;
  const tableId = `${uid}-chart-data`;
  const canvasId = `${uid}-chart-canvas`;
  const liveId = `${uid}-chart-live`;

  useEffect(() => {
    if (!canvasRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Chart = ChartJS;
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }
    chartRef.current = new Chart(canvasRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "2024",
            data: vals1,
            backgroundColor: `rgba(${rgb},.35)`,
            borderColor: `rgba(${rgb},.6)`,
            borderWidth: 1,
            borderRadius: p.radius ?? 4,
          },
          {
            label: "2025",
            data: vals2,
            backgroundColor: `rgba(${rgb2},.35)`,
            borderColor: `rgba(${rgb2},.6)`,
            borderWidth: 1,
            borderRadius: p.radius ?? 4,
          },
        ],
      },
      options: {
        responsive: true,
        animation: { duration: p.animated ? 800 : 0 },
        plugins: {
          legend: {
            display: p.showLegend,
            labels: {
              color: "rgba(240,237,232,.4)",
              font: { size: 10, family: fontFamily },
            },
          },
          tooltip: {
            backgroundColor: "#1a1a1f",
            borderColor: "rgba(255,255,255,.08)",
            borderWidth: 1,
            titleColor: "#f0ede8",
            bodyColor: "rgba(240,237,232,.5)",
            padding: 8,
            cornerRadius: 6,
          },
        },
        scales: {
          x: {
            grid: { display: p.showGrid, color: "rgba(255,255,255,.05)" },
            ticks: {
              color: "rgba(240,237,232,.3)",
              font: { size: 10, family: fontFamily },
            },
          },
          y: {
            grid: { display: p.showGrid, color: "rgba(255,255,232,.05)" },
            ticks: {
              color: "rgba(240,237,232,.3)",
              font: { size: 10, family: fontFamily },
            },
            border: { display: false },
          },
        },
      },
    });
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [col, col2, p.radius, p.animated, p.showLegend, p.showGrid, p.data]); // eslint-disable-line react-hooks/exhaustive-deps

  // Build a short textual summary for screen readers
  const summary = `${p.title || "Bar chart"} showing ${labels.length} points. Latest values: ${labels
    .map((lab, i) => `${lab}: ${vals1[i]} (2024), ${vals2[i]} (2025)`)
    .join("; ")}`;

  return (
    <figure
      id={figId}
      aria-labelledby={captionId}
      style={{
        background: "#111113",
        border: "1px solid rgba(255,255,255,.07)",
        borderRadius: 10,
        padding: 18,
        width: 300,
      }}
    >
      <figcaption
        id={captionId}
        style={{ fontSize: 12, color: textColor, marginBottom: 14, fontFamily }}
      >
        {p.title}
      </figcaption>

      {/* Offscreen live summary for screen readers */}
      <div
        id={liveId}
        aria-live="polite"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          margin: -1,
          border: 0,
          padding: 0,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
        }}
      >
        {summary}
      </div>

      {/* Canvas with accessible references */}
      <canvas
        id={canvasId}
        ref={canvasRef}
        role="img"
        aria-labelledby={captionId}
        aria-describedby={tableId}
        height={150}
      />

      {/* Hidden data table for screen readers (keeps parity with visual chart) */}
      <table
        id={tableId}
        style={{
          position: "absolute",
          left: -9999,
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
        aria-hidden={false}
      >
        <caption>{p.title}</caption>
        <thead>
          <tr>
            <th scope="col">Label</th>
            <th scope="col">2024</th>
            <th scope="col">2025</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((lab, i) => (
            <tr key={lab}>
              <td>{lab}</td>
              <td>{String(vals1[i])}</td>
              <td>{String(vals2[i])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
