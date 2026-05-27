"use client";

import { BouquetProvider, useBouquet } from "@/context/BouquetContext";
import BouquetCanvas from "@/components/canvas/BouquetCanvas";
import WizardShell from "@/components/wizard/WizardShell";
import { useBouquetCanvas } from "@/hooks/useBouquetCanvas";
import { useExport } from "@/hooks/useExport";

function DesignerInner() {
  const { state } = useBouquet();
  const canvasRef = useBouquetCanvas();
  const { exportPNG, exportGIF, exportingPNG, exportingGIF, gifProgress } =
    useExport(canvasRef);

  return (
    <div className="min-h-screen bg-romantic-gradient">
      {/* Header */}
      <header className="text-center py-6 px-4">
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-rose-800">
          🌸 Bouquet Designer
        </h1>
        <p className="text-rose-400 text-sm mt-1 font-dancing text-lg">
          Create your perfect romantic arrangement
        </p>
      </header>

      {/* Main layout */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Wizard panel */}
          <div className="w-full lg:w-[55%] romantic-card min-h-[500px] flex flex-col overflow-hidden">
            <WizardShell
              onExportPNG={exportPNG}
              onExportGIF={() => exportGIF(state)}
              exportingPNG={exportingPNG}
              exportingGIF={exportingGIF}
              gifProgress={gifProgress}
            />
          </div>

          {/* Canvas preview panel */}
          <div className="w-full lg:w-[45%] lg:sticky lg:top-6">
            <div className="romantic-card p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-rose-700">
                  Live Preview
                </p>
                <p className="text-xs text-rose-400">
                  Step {state.currentStep} of 8
                </p>
              </div>
              <div className="rounded-xl overflow-hidden border border-rose-100 shadow-inner bg-white">
                <BouquetCanvas state={state} canvasRef={canvasRef} />
              </div>
              <p className="text-xs text-rose-300 text-center mt-2 italic">
                Updates live as you design
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function BouquetDesigner() {
  return (
    <BouquetProvider>
      <DesignerInner />
    </BouquetProvider>
  );
}
