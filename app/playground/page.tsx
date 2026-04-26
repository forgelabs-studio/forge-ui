import Sidebar from "@/components/layout/Sidebar";
import Canvas from "@/components/playground/Canvas";
import PropsPanel from "@/components/playground/PropsPanel";
import { ErrorBoundary } from "@/components/playground/ErrorBoundary";

export const dynamic = "force-dynamic";

export default function PlaygroundPage() {
  return (
    <div className="playground">
      <Sidebar />

      <ErrorBoundary>
        <Canvas />
      </ErrorBoundary>

      <ErrorBoundary>
        <PropsPanel />
      </ErrorBoundary>
    </div>
  );
}
