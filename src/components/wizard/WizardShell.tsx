"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useBouquet } from "@/context/BouquetContext";
import StepIndicator from "@/components/ui/StepIndicator";
import RomanticButton from "@/components/ui/RomanticButton";
import Step1Size from "./Step1Size";
import Step2Flowers from "./Step2Flowers";
import Step3Container from "./Step3Container";
import Step4Message from "./Step4Message";
import Step5Theme from "./Step5Theme";
import Step6Recipient from "./Step6Recipient";
import Step7Wrapping from "./Step7Wrapping";
import Step8Export from "./Step8Export";

const TOTAL_STEPS = 8;

interface ExportProps {
  onExportPNG: () => void;
  onExportGIF: () => void;
  exportingPNG: boolean;
  exportingGIF: boolean;
  gifProgress: number;
}

function isStepComplete(
  step: number,
  state: ReturnType<typeof useBouquet>["state"]
) {
  switch (step) {
    case 1:
      return !!state.size;
    case 2:
      return state.flowers.reduce((s, f) => s + f.quantity, 0) > 0;
    case 3:
      return !!state.container;
    case 4:
      return true;
    case 5:
      return !!state.theme;
    case 6:
      return true;
    case 7:
      return !!state.wrappingColor && !!state.ribbonColor;
    default:
      return true;
  }
}

export default function WizardShell(exportProps: ExportProps) {
  const { state, dispatch } = useBouquet();
  const currentStep = state.currentStep;
  const canNext = isStepComplete(currentStep, state);

  function goNext() {
    if (currentStep < TOTAL_STEPS && canNext) {
      dispatch({ type: "SET_STEP", payload: currentStep + 1 });
    }
  }

  function goBack() {
    if (currentStep > 1) {
      dispatch({ type: "SET_STEP", payload: currentStep - 1 });
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Step indicator */}
      <div className="px-4 pt-4 pb-3 border-b border-rose-100 bg-white/60">
        <StepIndicator currentStep={currentStep} />
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {currentStep === 1 && <Step1Size />}
            {currentStep === 2 && <Step2Flowers />}
            {currentStep === 3 && <Step3Container />}
            {currentStep === 4 && <Step4Message />}
            {currentStep === 5 && <Step5Theme />}
            {currentStep === 6 && <Step6Recipient />}
            {currentStep === 7 && <Step7Wrapping />}
            {currentStep === 8 && <Step8Export {...exportProps} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons (hidden on last step) */}
      {currentStep < TOTAL_STEPS && (
        <div className="px-5 py-4 border-t border-rose-100 bg-white/60 flex gap-3">
          <RomanticButton
            variant="secondary"
            size="md"
            onClick={goBack}
            disabled={currentStep === 1}
          >
            ← Back
          </RomanticButton>
          <RomanticButton
            variant="primary"
            size="md"
            onClick={goNext}
            disabled={!canNext}
            className="flex-1"
          >
            {currentStep === TOTAL_STEPS - 1 ? "Create Bouquet ✨" : "Next →"}
          </RomanticButton>
        </div>
      )}
    </div>
  );
}
