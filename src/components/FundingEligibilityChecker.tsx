"use client";

import { useMemo, useState } from "react";

type AgeBand = "under-nine-months" | "nine-months-to-two" | "two" | "three-to-four";
type WorkingStatus = "yes" | "no" | "unsure";

const ageOptions: { value: AgeBand; label: string }[] = [
  { value: "under-nine-months", label: "Under 9 months" },
  { value: "nine-months-to-two", label: "9 months to under 2" },
  { value: "two", label: "2 years old" },
  { value: "three-to-four", label: "3 or 4 years old" },
];

const workingOptions: { value: WorkingStatus; label: string; hint: string }[] = [
  {
    value: "yes",
    label: "Yes",
    hint: "I am working, and my partner is working if I have one.",
  },
  {
    value: "no",
    label: "No",
    hint: "I am not currently working, or one of us is not working.",
  },
  {
    value: "unsure",
    label: "Not sure",
    hint: "Our work, leave, benefits or income situation is more complicated.",
  },
];

function getResult(age: AgeBand, working: WorkingStatus) {
  if (working === "unsure") {
    if (age === "three-to-four") {
      return {
        title: "Your child is likely to have some funded childcare",
        body: "All 3 and 4-year-olds in England can receive 15 hours a week for 38 weeks. Your work and income circumstances will decide whether you may receive up to 30 hours instead.",
      };
    }

    return {
      title: "An official check is the best next step",
      body: "Working status, parental leave, benefits, income and immigration status can all affect support. Use the GOV.UK calculator for a result based on your full circumstances.",
    };
  }

  if (age === "under-nine-months") {
    return working === "yes"
      ? {
          title: "Tax-Free Childcare may help now",
          body: "Funded early-years hours usually begin once a child reaches the eligible age, but working families may be able to use Tax-Free Childcare before then. Full income and residence rules still apply.",
        }
      : {
          title: "Check the wider childcare support available",
          body: "Funded early-years hours usually begin from 9 months for eligible working families. GOV.UK can also check support linked to benefits, study or other circumstances.",
        };
  }

  if (age === "nine-months-to-two") {
    return working === "yes"
      ? {
          title: "You may qualify for 30 funded hours",
          body: "Eligible working parents in England with a child aged 9 months to 4 years may receive 30 hours a week for 38 weeks, and may also qualify for Tax-Free Childcare.",
        }
      : {
          title: "Other childcare support may still apply",
          body: "The working-parent funded-hours offer has work and income rules. Use the official calculator to check Universal Credit childcare, study support or other help available to your family.",
        };
  }

  if (age === "two") {
    return working === "yes"
      ? {
          title: "You may qualify for 30 funded hours",
          body: "Eligible working parents may receive 30 hours a week for 38 weeks. Some 2-year-olds can also receive 15 hours through the separate Early Learning scheme when their family or the child receives qualifying support.",
        }
      : {
          title: "Your child may qualify for 15 funded hours",
          body: "Some 2-year-olds in England receive 15 hours a week for 38 weeks when their family or the child receives qualifying benefits or support. The official check will confirm whether this applies.",
        };
  }

  return working === "yes"
    ? {
        title: "You may qualify for up to 30 funded hours",
        body: "All 3 and 4-year-olds receive 15 hours a week for 38 weeks in England. Eligible working parents may receive up to 30 hours and may also qualify for Tax-Free Childcare.",
      }
    : {
        title: "Your child is likely to receive 15 funded hours",
        body: "All 3 and 4-year-olds in England can receive 15 hours a week for 38 weeks, regardless of whether their parents work. Other support depends on your circumstances.",
      };
}

export function FundingEligibilityChecker() {
  const [age, setAge] = useState<AgeBand | "">("");
  const [working, setWorking] = useState<WorkingStatus | "">("");

  const result = useMemo(
    () => (age && working ? getResult(age, working) : null),
    [age, working],
  );

  return (
    <div className="rounded-[2rem] border border-charcoal/10 bg-white p-5 shadow-[0_22px_70px_rgba(64,93,37,0.10)] sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
        <div>
          <fieldset>
            <legend className="text-lg font-medium text-charcoal">
              1. How old is your child?
            </legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {ageOptions.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-2xl border px-4 py-4 text-sm transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-eden-green ${
                    age === option.value
                      ? "border-eden-green bg-eden-green text-white shadow-sm"
                      : "border-charcoal/10 bg-white text-charcoal hover:border-eden-green/55 hover:bg-sage-soft/35"
                  }`}
                >
                  <input
                    type="radio"
                    name="child-age"
                    value={option.value}
                    checked={age === option.value}
                    onChange={() => setAge(option.value)}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-8">
            <legend className="text-lg font-medium text-charcoal">
              2. Are you and any partner working?
            </legend>
            <div className="mt-4 grid gap-3">
              {workingOptions.map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer rounded-2xl border px-4 py-4 transition focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-eden-green ${
                    working === option.value
                      ? "border-eden-green bg-sage-soft shadow-sm"
                      : "border-charcoal/10 bg-white hover:border-eden-green/55 hover:bg-sage-soft/35"
                  }`}
                >
                  <input
                    type="radio"
                    name="working-status"
                    value={option.value}
                    checked={working === option.value}
                    onChange={() => setWorking(option.value)}
                    className="sr-only"
                  />
                  <span className="block text-sm font-medium text-charcoal">{option.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-charcoal-light">
                    {option.hint}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="flex min-h-72" aria-live="polite">
          {result ? (
            <div className="flex w-full flex-col justify-between rounded-[1.5rem] bg-eden-green p-6 text-white sm:p-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">
                  Likely starting point
                </p>
                <h3
                  className="mt-4 text-3xl font-light leading-tight text-white"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {result.title}
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-white/85">{result.body}</p>
              </div>
              <div className="mt-8">
                <a
                  href="https://www.gov.uk/childcare-calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-eden-green transition hover:bg-ivory-warm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Confirm on GOV.UK
                </a>
                <p className="mt-4 text-xs leading-relaxed text-white/70">
                  This quick check is a guide, not an eligibility decision. Income, leave,
                  benefits, residence and your child&apos;s circumstances can change the result.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex w-full flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-charcoal/15 bg-white px-6 py-12 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-sage-soft text-xl text-eden-green" aria-hidden="true">
                ?
              </span>
              <h3 className="mt-5 text-xl font-medium text-charcoal">Your result will appear here</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-charcoal-light">
                Answer both questions for a likely starting point, then confirm it using the official GOV.UK calculator.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
