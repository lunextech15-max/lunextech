"use client";

import { useId, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PROGRAMS } from "@/lib/programs";
import type { ApplicationInput } from "@/lib/applications";
import ApplicationSuccess from "@/components/shared/ApplicationSuccess";

const EMPTY: ApplicationInput = {
  name: "",
  email: "",
  phone: "",
  location: "",
  program: "",
  education: "",
  fieldOfStudy: "",
  year: "",
  motivation: "",
  learningGoals: "",
  skills: "",
  portfolio: "",
  github: "",
  linkedin: "",
};

type Errors = Partial<Record<keyof ApplicationInput, string>> & { confirm?: string };

const REQUIRED_FIELDS: (keyof ApplicationInput)[] = [
  "name",
  "email",
  "location",
  "program",
  "education",
  "fieldOfStudy",
  "motivation",
  "learningGoals",
];

function validate(data: ApplicationInput, confirmed: boolean): Errors {
  const errors: Errors = {};
  for (const field of REQUIRED_FIELDS) {
    if (!data[field].trim()) errors[field] = "This field is required.";
  }
  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (data.program && !PROGRAMS.some((p) => p.slug === data.program && p.applicationsOpen)) {
    errors.program = "This program isn't currently accepting applications.";
  }
  if (!confirmed) {
    errors.confirm = "Please confirm the information is accurate.";
  }
  return errors;
}

export default function ApplicationForm() {
  const searchParams = useSearchParams();
  const idBase = useId();

  const [data, setData] = useState<ApplicationInput>(() => {
    const programFromQuery = searchParams.get("program");
    const match =
      programFromQuery && PROGRAMS.some((p) => p.slug === programFromQuery && p.applicationsOpen)
        ? programFromQuery
        : "";
    return { ...EMPTY, program: match };
  });
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const field =
    (key: keyof ApplicationInput) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setData((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(data, confirmed);
    setErrors(nextErrors);
    setSubmitError(null);
    if (Object.keys(nextErrors).length > 0) return;

    setPending(true);
    const supabase = createClient();
    const { error } = await supabase.from("applications").insert({
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      location: data.location.trim(),
      program: data.program,
      education: data.education.trim(),
      field_of_study: data.fieldOfStudy.trim(),
      year: data.year.trim(),
      motivation: data.motivation.trim(),
      learning_goals: data.learningGoals.trim(),
      skills: data.skills.trim(),
      portfolio: data.portfolio.trim(),
      github: data.github.trim(),
      linkedin: data.linkedin.trim(),
    });
    setPending(false);

    if (error) {
      setSubmitError("Something went wrong submitting your application. Please try again in a moment.");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return <ApplicationSuccess href="/internships" label="Explore more programs" />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-14">
      {/* Personal information */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Personal information</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="apply-field">
            <label htmlFor={`${idBase}-name`} className="apply-field-label">
              Full name
            </label>
            <input
              id={`${idBase}-name`}
              className="apply-input"
              value={data.name}
              onChange={field("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? `${idBase}-name-error` : undefined}
            />
            {errors.name && (
              <p id={`${idBase}-name-error`} className="apply-error" role="alert">
                {errors.name}
              </p>
            )}
          </div>
          <div className="apply-field">
            <label htmlFor={`${idBase}-email`} className="apply-field-label">
              Email address
            </label>
            <input
              id={`${idBase}-email`}
              type="email"
              className="apply-input"
              value={data.email}
              onChange={field("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? `${idBase}-email-error` : undefined}
            />
            {errors.email && (
              <p id={`${idBase}-email-error`} className="apply-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>
          <div className="apply-field">
            <label htmlFor={`${idBase}-phone`} className="apply-field-label">
              Phone number <span className="normal-case text-soft-white/55">(optional)</span>
            </label>
            <input id={`${idBase}-phone`} className="apply-input" value={data.phone} onChange={field("phone")} />
          </div>
          <div className="apply-field">
            <label htmlFor={`${idBase}-location`} className="apply-field-label">
              City / location
            </label>
            <input
              id={`${idBase}-location`}
              className="apply-input"
              value={data.location}
              onChange={field("location")}
              aria-invalid={!!errors.location}
              aria-describedby={errors.location ? `${idBase}-location-error` : undefined}
            />
            {errors.location && (
              <p id={`${idBase}-location-error`} className="apply-error" role="alert">
                {errors.location}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Program interest */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Program interest</p>
        <div className="apply-field max-w-md">
          <label htmlFor={`${idBase}-program`} className="apply-field-label">
            Select program
          </label>
          <select
            id={`${idBase}-program`}
            className="apply-select"
            value={data.program}
            onChange={field("program")}
            aria-invalid={!!errors.program}
            aria-describedby={errors.program ? `${idBase}-program-error` : undefined}
          >
            <option value="">Choose a program</option>
            {PROGRAMS.filter((program) => program.applicationsOpen).map((program) => (
              <option key={program.slug} value={program.slug}>
                {program.title.join(" ")}
              </option>
            ))}
          </select>
          {errors.program && (
            <p id={`${idBase}-program-error`} className="apply-error" role="alert">
              {errors.program}
            </p>
          )}
        </div>
      </section>

      {/* About you */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">About you</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="apply-field">
            <label htmlFor={`${idBase}-education`} className="apply-field-label">
              Current education
            </label>
            <input
              id={`${idBase}-education`}
              className="apply-input"
              placeholder="e.g. B.Tech, 3rd year"
              value={data.education}
              onChange={field("education")}
              aria-invalid={!!errors.education}
              aria-describedby={errors.education ? `${idBase}-education-error` : undefined}
            />
            {errors.education && (
              <p id={`${idBase}-education-error`} className="apply-error" role="alert">
                {errors.education}
              </p>
            )}
          </div>
          <div className="apply-field">
            <label htmlFor={`${idBase}-field`} className="apply-field-label">
              Field of study
            </label>
            <input
              id={`${idBase}-field`}
              className="apply-input"
              value={data.fieldOfStudy}
              onChange={field("fieldOfStudy")}
              aria-invalid={!!errors.fieldOfStudy}
              aria-describedby={errors.fieldOfStudy ? `${idBase}-field-error` : undefined}
            />
            {errors.fieldOfStudy && (
              <p id={`${idBase}-field-error`} className="apply-error" role="alert">
                {errors.fieldOfStudy}
              </p>
            )}
          </div>
          <div className="apply-field">
            <label htmlFor={`${idBase}-year`} className="apply-field-label">
              Current year <span className="normal-case text-soft-white/55">(optional)</span>
            </label>
            <input id={`${idBase}-year`} className="apply-input" value={data.year} onChange={field("year")} />
          </div>
        </div>
      </section>

      {/* Tell us */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Tell us</p>
        <div className="apply-field">
          <label htmlFor={`${idBase}-motivation`} className="apply-field-label">
            Why are you interested in this program?
          </label>
          <textarea
            id={`${idBase}-motivation`}
            className="apply-textarea"
            value={data.motivation}
            onChange={field("motivation")}
            aria-invalid={!!errors.motivation}
            aria-describedby={errors.motivation ? `${idBase}-motivation-error` : undefined}
          />
          {errors.motivation && (
            <p id={`${idBase}-motivation-error`} className="apply-error" role="alert">
              {errors.motivation}
            </p>
          )}
        </div>
        <div className="apply-field">
          <label htmlFor={`${idBase}-goals`} className="apply-field-label">
            What would you like to learn or explore?
          </label>
          <textarea
            id={`${idBase}-goals`}
            className="apply-textarea"
            value={data.learningGoals}
            onChange={field("learningGoals")}
            aria-invalid={!!errors.learningGoals}
            aria-describedby={errors.learningGoals ? `${idBase}-goals-error` : undefined}
          />
          {errors.learningGoals && (
            <p id={`${idBase}-goals-error`} className="apply-error" role="alert">
              {errors.learningGoals}
            </p>
          )}
        </div>
      </section>

      {/* Skills */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Skills</p>
        <div className="apply-field">
          <label htmlFor={`${idBase}-skills`} className="apply-field-label">
            What skills or technologies have you explored? <span className="normal-case text-soft-white/55">(optional)</span>
          </label>
          <textarea id={`${idBase}-skills`} className="apply-textarea" value={data.skills} onChange={field("skills")} />
        </div>
      </section>

      {/* Portfolio */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Portfolio</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="apply-field">
            <label htmlFor={`${idBase}-portfolio`} className="apply-field-label">
              Portfolio link <span className="normal-case text-soft-white/55">(optional)</span>
            </label>
            <input
              id={`${idBase}-portfolio`}
              className="apply-input"
              value={data.portfolio}
              onChange={field("portfolio")}
            />
          </div>
          <div className="apply-field">
            <label htmlFor={`${idBase}-github`} className="apply-field-label">
              GitHub <span className="normal-case text-soft-white/55">(optional)</span>
            </label>
            <input id={`${idBase}-github`} className="apply-input" value={data.github} onChange={field("github")} />
          </div>
          <div className="apply-field">
            <label htmlFor={`${idBase}-linkedin`} className="apply-field-label">
              LinkedIn <span className="normal-case text-soft-white/55">(optional)</span>
            </label>
            <input
              id={`${idBase}-linkedin`}
              className="apply-input"
              value={data.linkedin}
              onChange={field("linkedin")}
            />
          </div>
        </div>
      </section>

      {/* Submission */}
      <section className="flex flex-col gap-6 border-t border-line pt-10">
        <label className="flex items-start gap-3 text-sm text-soft-white/70">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(event) => setConfirmed(event.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 border border-line bg-transparent accent-[var(--color-accent)]"
          />
          I confirm that the information provided is accurate.
        </label>
        {errors.confirm && (
          <p className="apply-error" role="alert">
            {errors.confirm}
          </p>
        )}

        <div className="flex items-center gap-5">
          <button
            type="submit"
            disabled={pending}
            className="group inline-flex items-center gap-2 border border-soft-white/25 px-8 py-4 text-xs font-semibold tracking-[0.1em] text-soft-white uppercase transition-colors hover:border-accent hover:bg-accent/10 disabled:opacity-50"
          >
            {pending ? "Submitting…" : "Submit application"}
            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
              →
            </span>
          </button>
          {submitError && (
            <p className="apply-error" role="alert">
              {submitError}
            </p>
          )}
        </div>
      </section>
    </form>
  );
}
