import axios from "axios";
import { useState } from "react";
import { api_route } from "../socketApi";

export default function VisitorLiveChat({ orderId }) {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  if (!orderId) return null;

  const submit = async (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setErr("");
    try {
      await axios.post(`${api_route}/order/${orderId}/visitor-chat`, { text: t });
      setText("");
      setSent(true);
    } catch {
      setErr("تعذر الإرسال");
    }
  };

  return (
    <form
      onSubmit={submit}
      className="mx-auto mt-8 w-[90%] max-w-md px-2 pb-8"
      dir="rtl"
    >
      <label className="mb-1 block text-sm font-medium text-slate-700">
        رسالة للدعم (اختياري)
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        maxLength={8000}
        className="w-full rounded-lg border border-slate-200 p-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
      />
      {err ? <p className="mt-1 text-sm text-red-600">{err}</p> : null}
      {sent ? (
        <p className="mt-1 text-sm text-emerald-600">تم الإرسال</p>
      ) : null}
      <button
        type="submit"
        className="mt-2 rounded-full bg-[#0057FF] px-6 py-2 text-sm font-bold text-white"
      >
        إرسال
      </button>
    </form>
  );
}
