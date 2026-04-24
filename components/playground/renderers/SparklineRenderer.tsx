"use client";
import { useEffect, useRef } from "react";
import { hexRgb } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import { Chart as ChartJS, registerables } from "chart.js";
import type { SparklineProps } from "@/lib/types";
import { useId } from "react";

ChartJS.register(...registerables);

export default function SparklineRenderer({
  props: p,
}: {
  props: SparklineProps;
}) {
  const { fontFamily, textColor } = useGlobals();
  const uid = useId();

  const col = p.color || "#7F77DD";
  const rgb = hexRgb(col);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);
  const height = p.height || 60;

  const rawData: string[] = Array.isArray(p.data) ? p.data : [];
  const data =
    rawData.length > 0
      ? rawData.map((s: string) => Number(s.split(",")[1] ?? s) || 0)
      : [4, 7, 5, 9, 6, 11, 8, 13, 10, 15, 12, 16];

  // Accessibility ids
  const figId = `${uid}-spark-figure`;
  const captionId = `${uid}-spark-caption`;
  const tableId = `${uid}-spark-data`;
  const canvasId = `${uid}-spark-canvas`;
  const liveId = `${uid}-spark-live`;

  useEffect(() => {
    if (!canvasRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Chart = ChartJS;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: p.variant || "line",
      data: {
        labels: data.map((_, i) => i),
        datasets: [
          {
            data,
            borderColor: col,
            backgroundColor: p.fill ? `rgba(${rgb},.1)` : "transparent",
            borderWidth: 2,
            pointRadius: [...Array(data.length - 1).fill(0), p.showDot ? 3 : 0],
            pointBackgroundColor: col,
            tension: 0.4,
            fill: p.fill,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: p.animated ? 800 : 0 },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#1a1a1f",
            borderColor: "rgba(255,255,255,.08)",
            borderWidth: 1,
            titleColor: "#f0ede8",
            bodyColor: "rgba(240,237,232,.5)",
            padding: 6,
            cornerRadius: 5,
          },
        },
        scales: { x: { display: false }, y: { display: false } },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [col, p.fill, p.showDot, p.animated, p.variant, p.data]); // eslint-disable-line react-hooks/exhaustive-deps

  const summary = `Sparkline showing ${data.length} points. Latest value ${data[data.length - 1] ?? 0}.`;

  return (
    <figure
      id={figId}
      aria-labelledby={captionId}
      style={{
        background: "#111113",
        border: "1px solid rgba(255,255,255,.07)",
        borderRadius: 10,
        padding: "16px 20px",
        width: 260,
      }}
    >
      <figcaption
        id={captionId}
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 12,
          fontFamily,
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 300, color: textColor }}>
          £24,100
        </span>
        <span style={{ fontSize: 11, color: "rgba(29,158,117,.8)" }}>
          +18.2%
        </span>
      </figcaption>

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

      <div style={{ height, position: "relative" }}>
        <canvas
          id={canvasId}
          ref={canvasRef}
          role="img"
          aria-labelledby={captionId}
          aria-describedby={tableId}
          height={150}
        />
      </div>

      {/* Hidden data table for screen readers */}
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
        <caption>Sparkline data</caption>
        <thead>
          <tr>
            <th scope="col">Index</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v, i) => (
            <tr key={i}>
              <td>{String(i)}</td>
              <td>{String(v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
