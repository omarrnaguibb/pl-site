import React from "react";
import { IoCheckmark } from "react-icons/io5";
import { Navigate, useLocation } from "react-router-dom";
import { BankSiteFooter } from "../components/BankSiteFooter";
import { VisitorTopLogo } from "../components/VisitorTopLogo";
import { useLanguage } from "../context/LanguageContext";
import { BottomBar } from "../components/VisitorShared";

const MESSAGE_BLUE = "#0c4a8c";

export default function Success() {
  const location = useLocation();
  const orderId =
    location.state?.orderId ?? sessionStorage.getItem("currentOrderId");
  const { t, dir: pageDir, textDir } = useLanguage();

  if (!orderId) {
    return <Navigate to="/" replace />;
  }

  return (
    <section
      className="relative flex min-h-screen w-full justify-between bg-white"
      dir={pageDir}
    >
      <div
        className="flex min-h-screen w-full flex-col items-center justify-between lg:w-1/3"
        dir={textDir}
      >
        <VisitorTopLogo />
        <img
          src="/wix/landing-screenshot-1.png"
          alt=""
          className=" w-full  object-cover mt-10"
          fetchPriority="high"
        />
        <div className="flex w-full max-w-[320px] flex-1 flex-col items-center justify-center gap-8 py-6 text-center">
          <p
            className="text-sm font-bold leading-relaxed md:text-[1.05rem]"
            style={{ color: MESSAGE_BLUE }}
            dir={textDir}
          >
            {t("success.headline")}
          </p>

          <div
            className="flex size-24 shrink-0 items-center justify-center rounded-full shadow-md"
            style={{ backgroundColor: "#22c55e" }}
            aria-hidden
          >
            <IoCheckmark
              className="size-14 text-white"
              strokeWidth={3}
              style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
            />
          </div>
        </div>
        <BankSiteFooter className="mt-8 w-full shrink-0" />
      </div>

      <BottomBar />
    </section>
  );
}
