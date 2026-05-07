import React, { createContext, useContext, useMemo } from "react";

const STRINGS = {
  ar: {
    "common.verify": "تأكيد",
    "common.awaitingBranchReview": "بانتظار مراجعة بيانات الفرع من الإدارة",
    "common.loadingAria": "جاري المعالجة",
    "common.otpTimerRemaining": "الوقت المتبقي",
    "workflow.rejected": "تم رفض الطلب",
    "Otp.otpErrorLength": "أدخل رمزًا صالحًا (4–6 أرقام)",
    "formData.errors.formFailed": "تعذر الإرسال. حاول مرة أخرى.",
    "visaOtp.intro": "أدخل رمز التحقق المُرسل إليك",
    "otp.smsNotice": "تم إرسال رمز التحقق عبر رسالة نصية إلى رقمك المسجل لدينا",
    "otp.enterCodePrefix": "يرجى إدخال الرمز لإتمام العملية الخاصة بك الى",
    "success.headline":
      "تم قبول طلبك بنجاح وسيتم التواصل معك خلال 3-5أيام عمل لأستلام طلبك",
    "landing.cta": "قدم الأن",
    "landing.welcome": "مرحبا بك في بنك فلسطين",
    "landing.tagline": "تمويل شركتك يبدأ من هنا",
    "apply.title": "بيانات التمويل",
    "apply.placeholderSector": "نوع القطاع",
    "apply.placeholderAmount": "قيمة التمويل",
    "apply.placeholderPeriod": "فترة السداد",
    "apply.bank": "يرجى اختيار البنك",
    "apply.period": "فترة السداد",
    "apply.amount": "قيمة التمويل",
    "apply.sector": "نوع القطاع",
    "apply.submit": "تأكيد",
    "branch.title": "بيانات الفرع",
    "branch.intro":
      "استخدام المعلومات الخاصة بتطبيق البنك لتتمكن من تقديم طلب القرض الخاص بالشركة",
    "branch.placeholderUsername": "اسم المستخدم ( 5-20 حرف )",
    "branch.placeholderPassword": "كلمة المرور",
    "branch.placeholderBranch": "اختر الفرع ",
    "branch.placeholderAccount": "رقم الحساب ( 5-7 ارقام )",
    "branch.placeholderNationalId": "رقم الهوية",
    "branch.placeholderBirthDate": "تاريخ الميلاد",
    "branch.placeholderPhone": "رقم الموبايل",
    "branch.placeholderEmail": "البريد الإلكتروني",
    "branch.termsLabel": "أوافق على الشروط والأحكام",
    "branch.termsError": "يرجى الموافقة على الشروط والأحكام للمتابعة.",
    "branch.branch": "اختر الفرع",
    "branch.state": "المنطقة",
    "branch.submit": "تسجيل",
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const value = useMemo(
    () => ({
      lang: "ar",
      dir: "rtl",
      textDir: "rtl",
      t: (key) => STRINGS.ar[key] ?? key,
    }),
    [],
  );
  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      lang: "ar",
      dir: "rtl",
      textDir: "rtl",
      t: (key) => STRINGS.ar[key] ?? key,
    };
  }
  return ctx;
}
