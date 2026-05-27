"use client";

const STEP_LABELS = [
  "Size",
  "Flowers",
  "Container",
  "Message",
  "Theme",
  "Name",
  "Wrapping",
  "Export",
];

interface Props {
  currentStep: number;
  totalSteps?: number;
}

export default function StepIndicator({ currentStep, totalSteps = 8 }: Props) {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEP_LABELS.slice(0, totalSteps).map((label, idx) => {
        const step = idx + 1;
        const isCompleted = step < currentStep;
        const isCurrent = step === currentStep;

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isCompleted
                    ? "bg-rose-500 text-white"
                    : isCurrent
                    ? "bg-rose-100 border-2 border-rose-500 text-rose-600"
                    : "bg-rose-50 border border-rose-200 text-rose-300"
                }`}
              >
                {isCompleted ? "✓" : step}
              </div>
              <span
                className={`text-[9px] mt-0.5 font-medium transition-colors ${
                  isCurrent ? "text-rose-600" : isCompleted ? "text-rose-400" : "text-rose-200"
                }`}
              >
                {label}
              </span>
            </div>
            {idx < totalSteps - 1 && (
              <div
                className={`h-0.5 w-5 mx-0.5 mb-3 transition-colors duration-300 ${
                  isCompleted ? "bg-rose-400" : "bg-rose-100"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
