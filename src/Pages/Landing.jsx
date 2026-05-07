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
      <div className="w-full lg:w-1/3 flex h-screen flex-col items-center justify-between  pt-8 ">
        {/* comp-mot0h620 — top mark */}
        <img
          src="/wix/landing-top-logo.png"
          alt=""
          width={134}
          height={61}
          className="mb-3 w-[134px] object-cover"
          fetchPriority="high"
        />
        {/* comp-mot16ncw — wide banner */}
        <img
          src="/wix/landing-banner.png"
          alt=""
          className=" w-full  object-cover"
          fetchPriority="high"
        />
        {/* comp-mot0nb8z */}
        <h1
          id="landing-welcome"
          className="mb-2 text-center text-[20px] font-bold leading-normal tracking-normal"
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
            src="/wix/landing-screenshot-1.png"
            alt=""
            className="mb-4 w-full  object-cover"
            fetchPriority="high"
          />

          {/* comp-mot184k1 */}
          <img
            src="/wix/landing-screenshot-2.png"
            alt=""
            className="w-full  object-cover"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
