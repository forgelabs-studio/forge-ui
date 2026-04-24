"use client";
import { useEffect, useRef, useMemo } from "react";
import { hexRgb } from "@/lib/utils";
import { useGlobals } from "./_useGlobals";
import { Chart as ChartJS, registerables } from "chart.js";
import type { LineChartProps } from "@/lib/types";
import { useId } from "react";

ChartJS.register(...registerables);

export default function LineChartRenderer({
  props: p,
}: {
  props: LineChartProps;
}) {
  const { fontFamily } = useGlobals();
  const uid = useId();

  const col = p.color || "#1D9E75";
  const rgb = hexRgb(col);
  const col2 = p.color2 || "#EF9F27";
  const rgb2 = hexRgb(col2);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);

  const rawData = useMemo(
    () => (Array.isArray(p.data) ? p.data : []),
    [p.data],
  );
  const hasData = rawData.length > 0;

  const labels = useMemo(
    () =>
      hasData
        ? rawData.map((s: string) => s.split(",")[0] || "")
        : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    [rawData, hasData],
  );

  const vals1 = useMemo(
    () =>
      hasData
        ? rawData.map((s: string) => Number(s.split(",")[1]) || 0)
        : [2.1, 3.4, 2.8, 4.2, 3.9, 5.8, 5.2, 7.1],
    [rawData, hasData],
  );

  const vals2 = useMemo(
    () =>
      hasData
        ? rawData.map((s: string) => Number(s.split(",")[2]) || 0)
        : [0.8, 1.2, 1, 1.8, 2.1, 2.8, 2.4, 3.6],
    [rawData, hasData],
  );

  // Accessibility ids
  const figId = `${uid}-line-figure`;
  const captionId = `${uid}-line-caption`;
  const tableId = `${uid}-line-data`;
  const canvasId = `${uid}-line-canvas`;
  const liveId = `${uid}-line-live`;

  useEffect(() => {
    if (!canvasRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Chart = ChartJS;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }
    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            data: vals1,
            borderColor: col,
            backgroundColor: `rgba(${rgb},.07)`,
            tension: p.tension,
            fill: p.fill,
            borderWidth: 2,
            pointBackgroundColor: col,
            pointRadius: p.showDots ? 3 : 0,
            pointHoverRadius: 5,
          },
          {
            data: vals2,
            borderColor: col2,
            backgroundColor: `rgba(${rgb2},.07)`,
            tension: p.tension,
            fill: p.fill,
            borderWidth: 2,
            pointBackgroundColor: col2,
            pointRadius: p.showDots ? 3 : 0,
            pointHoverRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        animation: { duration: p.animated ? 1000 : 0 },
        plugins: {
          legend: { display: false },
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
            grid: { display: p.showGrid, color: "rgba(255,255,255,.05)" },
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
  }, [
    col,
    col2,
    rgb,
    rgb2,
    fontFamily,
    labels,
    vals1,
    vals2,
    p.tension,
    p.fill,
    p.animated,
    p.showGrid,
    p.showDots,
  ]);

  const summary = `${p.title || "Line chart"} with ${labels.length} points. Latest values ${labels
    .map((lab, i) => `${lab}: ${vals1[i]} and ${vals2[i]}`)
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
        style={{
          fontSize: 12,
          color: "rgba(240,237,232,.55)",
          marginBottom: 14,
          fontFamily,
        }}
      >
        {p.title}
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

      <canvas
        id={canvasId}
        ref={canvasRef}
        role="img"
        aria-labelledby={captionId}
        aria-describedby={tableId}
        height={150}
      />

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
            <th scope="col">Series 1</th>
            <th scope="col">Series 2</th>
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
