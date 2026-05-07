/**
 * Shared top logo strip — same horizontal inset, vertical rhythm, and width on every page.
 */
export function VisitorTopLogo({ className = "" }) {
  return (
    <div
      className={`box-border flex w-full shrink-0 justify-start  pt-8 pr-8 ${className}`}
      onClick={() => (window.location.href = "/")}
    >
      <img
        src="/wix/landing-top-logo.png"
        alt=""
        width={134}
        height={61}
        className="h-[61px] w-[134px] object-cover"
        fetchPriority="high"
      />
    </div>
  );
}
