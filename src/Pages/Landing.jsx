import { BankSiteFooter } from "../components/BankSiteFooter";
import { VisitorTopLogo } from "../components/VisitorTopLogo";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

/** Arrow icon from Wix StylableButton (viewBox 0 0 60 60). */
function CtaChevronIcon({ className }) {
  return (
    <svg
      className={className}
      data-bbox="13.05 2.55 33.878 54.8"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 60"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M46.5 28.9L20.6 3c-.6-.6-1.6-.6-2.2 0l-4.8 4.8c-.6.6-.6 1.6 0 2.2l19.8 20-19.9 19.9c-.6.6-.6 1.6 0 2.2l4.8 4.8c.6.6 1.6.6 2.2 0l21-21 4.8-4.8c.8-.6.8-1.6.2-2.2z"
      />
    </svg>
  );
}

export default function Landing() {
  const { t, dir } = useLanguage();

  return (
    <section
      className="relative min-h-screen w-full flex justify-center items-center bg-white"
      dir={dir}
      aria-labelledby="landing-welcome"
    >
      <div className="flex h-screen w-full flex-col items-center justify-between  lg:w-1/3">
        <VisitorTopLogo />
        <div className="flex flex-col">
          <img
            src="/wix/landing-screenshot-1.png"
            alt=""
            className=" w-full  object-cover -mt-5"
            fetchPriority="high"
          />
          {/* comp-mot16ncw — wide banner */}
        </div>
        {/* comp-mot0nb8z */}
        <h1
          id="landing-welcome"
          className="mb-2 text-center text-[20px] font-bold"
        >
          {t("landing.welcome")}
        </h1>
        {/* comp-mot0q49o */}
        <h2 className="mb-5 text-center text-[25px] font-bold leading-normal tracking-normal text-[#B80070]">
          {t("landing.tagline")}
        </h2>
        {/* comp-mot0u0u2 — قدم الأن + icon */}
        <Link
          to="/apply"
          aria-label={t("landing.cta")}
          className="mb-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-[#B80070] bg-[#B80070] px-8 py-2.5 text-base font-bold text-white shadow-sm transition hover:bg-[#9c0060] active:scale-[0.98]"
        >
          <span>{t("landing.cta")}</span>
        </Link>
        <div>
          {/* comp-mot0kc8h */}
          <img
            src="/wix/landing-banner.png"
            alt=""
            className=" w-full  object-cover"
            fetchPriority="high"
          />
          {/* footer replaces landing-screenshot-2 */}
          <BankSiteFooter className="w-full" />
        </div>
      </div>
    </section>
  );
}
