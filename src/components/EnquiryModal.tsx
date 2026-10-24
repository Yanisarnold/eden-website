"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { BUSINESS } from "@/data/business";

const ENQUIRY_EVENT = "eden:open-enquiry";

type EnquiryDetail = {
  intent?: string;
  location?: string;
};

type EnquiryButtonProps = {
  children: ReactNode;
  className?: string;
  intent?: string;
  location?: string;
  ariaLabel?: string;
  onOpen?: () => void;
};

type Step = 1 | 2 | 3;

const roomInterests = [
  "Toddlers (15 months-3 years)",
  "Pre-school (3-4 years)",
  "Not sure - help me choose",
];

const startTimes = [
  "As soon as possible",
  "Within 1-3 months",
  "Later this year",
  "Just exploring for now",
];

const visitTimes = ["Morning", "Lunchtime", "Afternoon", "No preference"];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  location: "",
  childAge: "",
  room: "",
  startTime: "",
  preferredDays: "",
  wantsVisit: false,
  visitDate: "",
  visitTime: "",
  referral: "",
  message: "",
  intent: "General nursery enquiry",
  _hp: "",
};

export function openEnquiry(detail: EnquiryDetail = {}) {
  window.dispatchEvent(new CustomEvent<EnquiryDetail>(ENQUIRY_EVENT, { detail }));
}

export function EnquiryButton({
  children,
  className,
  intent = "General nursery enquiry",
  location,
  ariaLabel,
  onOpen,
}: EnquiryButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        onOpen?.();
        openEnquiry({ intent, location });
      }}
      className={className}
      aria-label={ariaLabel}
      data-enquiry-trigger
    >
      {children}
    </button>
  );
}

export function EnquiryModal() {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [deliveryPending, setDeliveryPending] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const close = () => {
    setIsOpen(false);
    window.setTimeout(() => previousFocusRef.current?.focus(), 0);
  };

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const detail = (event as CustomEvent<EnquiryDetail>).detail ?? {};
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      const intent = detail.intent || initialForm.intent;
      setForm({
        ...initialForm,
        intent,
        location: detail.location || "",
        wantsVisit: intent.toLowerCase().includes("tour"),
      });
      setStep(1);
      setSubmitted(false);
      setDeliveryPending(false);
      setSubmitError(null);
      setIsOpen(true);
      window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    };

    window.addEventListener(ENQUIRY_EVENT, handleOpen);
    return () => window.removeEventListener(ENQUIRY_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const updateForm = (field: keyof typeof initialForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const stepIsValid = () => {
    if (step === 1) {
      return Boolean(
        form.name.trim() &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
          form.phone.trim() &&
          form.location,
      );
    }
    if (step === 2) {
      return Boolean(form.childAge.trim() && form.room && form.startTime);
    }
    return true;
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch(`${BUSINESS.leadApiUrl}/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientSlug: BUSINESS.clientSlug,
          source: "Eden website quick enquiry",
          page: window.location.pathname,
          name: form.name,
          email: form.email,
          phone: form.phone,
          intent: form.intent,
          location: form.location,
          childAge: form.childAge,
          room: form.room,
          startTime: form.startTime,
          preferredDays: form.preferredDays,
          visitRequested: form.wantsVisit ? "Yes" : "No",
          visitDate: form.wantsVisit ? form.visitDate : "",
          visitTime: form.wantsVisit ? form.visitTime : "",
          referral: form.referral,
          message: form.message,
          _hp: form._hp,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.ok !== true) {
        throw new Error(data.error || `Server ${response.status}`);
      }
      const delivered = Object.values(data.delivered ?? {}).some(value => value === true);
      if (!delivered && data.audited !== true) {
        throw new Error("We could not confirm your enquiry was saved. Please call or WhatsApp Eden directly.");
      }
      setDeliveryPending(!delivered);
      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error && error.message !== "Failed to fetch"
          ? error.message
          : "Something went wrong. Please try again or contact Eden directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputClass =
    "w-full rounded-xl border border-charcoal/10 bg-white px-4 py-3.5 text-sm text-charcoal outline-none transition placeholder:text-text-muted focus:border-eden-green focus:ring-4 focus:ring-eden-green/10";

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-charcoal/55 p-0 backdrop-blur-sm sm:items-center sm:p-6" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] border border-charcoal/10 bg-ivory shadow-2xl sm:rounded-[2rem]"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-eden-gold/25 bg-ivory/95 px-5 py-5 backdrop-blur-md sm:px-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-eden-green">Quick enquiry</p>
            <h2 id={titleId} className="mt-1 text-2xl font-light text-charcoal" style={{ fontFamily: "var(--font-fraunces)" }}>
              {submitted ? "Thank you - we have your details." : "Let us get to know your family."}
            </h2>
          </div>
          <button ref={closeButtonRef} type="button" onClick={close} className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-charcoal/10 bg-white text-xl text-charcoal transition hover:border-eden-green hover:text-eden-green" aria-label="Close enquiry form">
            x
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-14 text-center sm:px-10">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage-soft text-2xl text-eden-green">✓</div>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-charcoal-light">
              {deliveryPending
                ? "Your enquiry has been saved, but the email notification could not be delivered. Please call or WhatsApp Eden so the team can help you directly. There is no need to submit this form again."
                : `Thanks ${form.name.split(" ")[0]}. Your enquiry has been sent to the Eden team, who will reply within 24 hours to discuss availability and any visit preference.`}
            </p>
            {deliveryPending && <div className="mt-6 flex flex-wrap justify-center gap-3"><a href={BUSINESS.phone.telUrl} className="rounded-full bg-eden-green px-6 py-3 text-white">Call {BUSINESS.phone.display}</a><a href={BUSINESS.phone.waUrl} className="rounded-full border border-eden-green px-6 py-3 text-eden-green">WhatsApp Eden</a></div>}
            <button type="button" onClick={close} className="mt-8 rounded-full bg-eden-green px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-sage-dark">
              Close
            </button>
          </div>
        ) : (
          <div className="px-5 pb-8 pt-6 sm:px-8 sm:pb-10">
            <div className="mb-7 flex items-center gap-2" aria-label={`Step ${step} of 3`}>
              {[1, 2, 3].map((item) => (
                <span key={item} className={`h-1.5 flex-1 rounded-full ${item <= step ? "bg-eden-green" : "bg-eden-gold/25"}`} />
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-light text-charcoal" style={{ fontFamily: "var(--font-fraunces)" }}>Your contact details</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-light">We use these details only to answer your enquiry and arrange the next step.</p>
                </div>
                <label className="block text-xs font-medium text-charcoal">Full name *<input className={`${inputClass} mt-2`} value={form.name} onChange={(event) => updateForm("name", event.target.value)} autoComplete="name" /></label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-medium text-charcoal">Email *<input type="email" className={`${inputClass} mt-2`} value={form.email} onChange={(event) => updateForm("email", event.target.value)} autoComplete="email" /></label>
                  <label className="block text-xs font-medium text-charcoal">Phone number *<input type="tel" className={`${inputClass} mt-2`} value={form.phone} onChange={(event) => updateForm("phone", event.target.value)} autoComplete="tel" /></label>
                </div>
                <label className="block text-xs font-medium text-charcoal">Nursery location *
                  <select className={`${inputClass} mt-2`} value={form.location} onChange={(event) => updateForm("location", event.target.value)}>
                    <option value="">Choose a nursery</option>
                    {BUSINESS.locations.map((location) => <option key={location.slug} value={location.shortName}>{location.shortName}</option>)}
                  </select>
                </label>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 className="text-2xl font-light text-charcoal" style={{ fontFamily: "var(--font-fraunces)" }}>Your childcare needs</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-light">Your child&apos;s age, room and likely start time help Eden give you an accurate answer.</p>
                <label className="mt-5 block text-xs font-medium text-charcoal">Child&apos;s age *<input className={`${inputClass} mt-2`} placeholder="For example: 2 years 4 months" value={form.childAge} onChange={(event) => updateForm("childAge", event.target.value)} /></label>
                <fieldset className="mt-5">
                  <legend className="text-xs font-medium text-charcoal">Which room would suit them? *</legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {roomInterests.map((room) => <button key={room} type="button" onClick={() => updateForm("room", room)} className={`rounded-xl border px-4 py-3 text-left text-sm transition ${form.room === room ? "border-eden-green bg-sage-soft text-eden-green" : "border-charcoal/10 bg-white text-charcoal-light hover:border-eden-green/50"}`}>{room}</button>)}
                  </div>
                </fieldset>
                <fieldset className="mt-5">
                  <legend className="text-xs font-medium text-charcoal">When are you hoping to start? *</legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {startTimes.map((time) => <button key={time} type="button" onClick={() => updateForm("startTime", time)} className={`rounded-xl border px-4 py-3 text-left text-sm transition ${form.startTime === time ? "border-eden-green bg-sage-soft text-eden-green" : "border-charcoal/10 bg-white text-charcoal-light hover:border-eden-green/50"}`}>{time}</button>)}
                  </div>
                </fieldset>
                <label className="mt-5 block text-xs font-medium text-charcoal">Preferred days (optional)<input className={`${inputClass} mt-2`} placeholder="For example: Monday, Wednesday and Friday" value={form.preferredDays} onChange={(event) => updateForm("preferredDays", event.target.value)} /></label>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="text-2xl font-light text-charcoal" style={{ fontFamily: "var(--font-fraunces)" }}>Questions and visit preference</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-light">A visit is optional. You can ask for information first and arrange a tour later.</p>
                <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-charcoal/10 bg-white p-4">
                  <input type="checkbox" className="mt-1 h-4 w-4 accent-eden-green" checked={form.wantsVisit} onChange={(event) => updateForm("wantsVisit", event.target.checked)} />
                  <span><span className="block text-sm font-medium text-charcoal">I would like to arrange a nursery visit</span><span className="mt-1 block text-xs leading-relaxed text-charcoal-light">Share a preferred date below and the team will confirm what is available.</span></span>
                </label>
                {form.wantsVisit && (
                  <div className="mt-4 grid gap-4 rounded-2xl border border-eden-green/20 bg-sage-soft/70 p-4 sm:grid-cols-2">
                    <label className="block text-xs font-medium text-charcoal">Preferred date (optional)<input type="date" min={new Date().toISOString().split("T")[0]} className={`${inputClass} mt-2`} value={form.visitDate} onChange={(event) => updateForm("visitDate", event.target.value)} /></label>
                    <label className="block text-xs font-medium text-charcoal">Preferred time (optional)<select className={`${inputClass} mt-2`} value={form.visitTime} onChange={(event) => updateForm("visitTime", event.target.value)}><option value="">Choose a time</option>{visitTimes.map((time) => <option key={time} value={time}>{time}</option>)}</select></label>
                  </div>
                )}
                <label className="mt-5 block text-xs font-medium text-charcoal">How did you hear about Eden? (optional)<input className={`${inputClass} mt-2`} value={form.referral} onChange={(event) => updateForm("referral", event.target.value)} /></label>
                <label className="mt-5 block text-xs font-medium text-charcoal">Anything else you would like us to know? (optional)<textarea rows={4} className={`${inputClass} mt-2 resize-none`} placeholder="Questions, additional needs, allergies or anything else on your mind" value={form.message} onChange={(event) => updateForm("message", event.target.value)} /></label>
                <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form._hp} onChange={(event) => updateForm("_hp", event.target.value)} className="absolute -left-[9999px] h-px w-px opacity-0" />
                {submitError && <p className="mt-4 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">{submitError}</p>}
              </div>
            )}

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-eden-gold/25 pt-5">
              <button type="button" onClick={() => step === 1 ? close() : setStep((step - 1) as Step)} className="px-2 py-3 text-xs font-medium uppercase tracking-[0.16em] text-charcoal-light transition hover:text-eden-green">
                {step === 1 ? "Cancel" : "Back"}
              </button>
              {step < 3 ? (
                <button type="button" disabled={!stepIsValid()} onClick={() => setStep((step + 1) as Step)} className="rounded-full bg-eden-green px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-sage-dark disabled:cursor-not-allowed disabled:bg-stone-border disabled:text-text-muted">
                  Next
                </button>
              ) : (
                <button type="button" disabled={submitting} onClick={handleSubmit} className="rounded-full bg-eden-green px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-sage-dark disabled:cursor-wait disabled:opacity-60">
                  {submitting ? "Sending..." : "Send enquiry"}
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
