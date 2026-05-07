import { HeaderShell } from "./HeaderShell";

/**
 * Shared frame: backdrop + centered card (matches Wix bank styling).
 */
export function VisitorPageFrame({ children, footerImage }) {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col bg-slate-100"
      style={{
        backgroundImage: "url(/wix/backdrop.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0 bg-slate-900/25"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-screen flex-col">
        <HeaderShell>
          <div className="flex w-full flex-col items-center gap-2 py-3">
            <img
              src="/wix/header-strip.jpg"
              alt=""
              className="max-h-14 w-auto object-contain"
            />
            <img src="/wix/logo.png" alt="" className="h-8 w-auto object-contain" />
          </div>
        </HeaderShell>

        <div className="flex flex-1 flex-col items-center px-3 py-6">
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl"
            style={{
              backgroundImage: "url(/wix/bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative bg-white/92 p-5 backdrop-blur-sm md:p-7">
              {children}
            </div>
          </div>
        </div>

        {footerImage ? (
          <div className="relative z-10 flex justify-center pb-4">
            <img
              src={footerImage}
              alt=""
              className="max-h-16 w-full max-w-md object-contain object-bottom"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
