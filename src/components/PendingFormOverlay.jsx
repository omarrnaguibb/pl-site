import { TailSpin } from "react-loader-spinner";

export function PendingFormOverlay({ show, ariaLabel }) {
  if (!show) return null;
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-white/75 backdrop-blur-[2px]"
      aria-busy="true"
      aria-label={ariaLabel}
    >
      <TailSpin height={40} width={40} color="#0057FF" aria-hidden />
    </div>
  );
}
