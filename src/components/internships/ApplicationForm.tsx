"use client";

import { useId, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PROGRAMS } from "@/lib/programs";
import type { ApplicationInput } from "@/lib/applications";
import FormField from "@/components/shared/FormField";
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
          <FormField id={`${idBase}-name`} label="Full name" value={data.name} onChange={field("name")} error={errors.name} />
          <FormField
            id={`${idBase}-email`}
            label="Email address"
            type="email"
            value={data.email}
            onChange={field("email")}
            error={errors.email}
          />
          <FormField id={`${idBase}-phone`} label="Phone number" optional value={data.phone} onChange={field("phone")} />
          <FormField
            id={`${idBase}-location`}
            label="City / location"
            value={data.location}
            onChange={field("location")}
            error={errors.location}
          />
        </div>
      </section>

      {/* Program interest */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Program interest</p>
        <FormField
          id={`${idBase}-program`}
          label="Select program"
          as="select"
          className="max-w-md"
          value={data.program}
          onChange={field("program")}
          error={errors.program}
        >
          <option value="">Choose a program</option>
          {PROGRAMS.filter((program) => program.applicationsOpen).map((program) => (
            <option key={program.slug} value={program.slug}>
              {program.title.join(" ")}
            </option>
          ))}
        </FormField>
      </section>

      {/* About you */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">About you</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            id={`${idBase}-education`}
            label="Current education"
            placeholder="e.g. B.Tech, 3rd year"
            value={data.education}
            onChange={field("education")}
            error={errors.education}
          />
          <FormField
            id={`${idBase}-field`}
            label="Field of study"
            value={data.fieldOfStudy}
            onChange={field("fieldOfStudy")}
            error={errors.fieldOfStudy}
          />
          <FormField id={`${idBase}-year`} label="Current year" optional value={data.year} onChange={field("year")} />
        </div>
      </section>

      {/* Tell us */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Tell us</p>
        <FormField
          id={`${idBase}-motivation`}
          label="Why are you interested in this program?"
          as="textarea"
          value={data.motivation}
          onChange={field("motivation")}
          error={errors.motivation}
        />
        <FormField
          id={`${idBase}-goals`}
          label="What would you like to learn or explore?"
          as="textarea"
          value={data.learningGoals}
          onChange={field("learningGoals")}
          error={errors.learningGoals}
        />
      </section>

      {/* Skills */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Skills</p>
        <FormField
          id={`${idBase}-skills`}
          label="What skills or technologies have you explored?"
          optional
          as="textarea"
          value={data.skills}
          onChange={field("skills")}
        />
      </section>

      {/* Portfolio */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Portfolio</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <FormField
            id={`${idBase}-portfolio`}
            label="Portfolio link"
            optional
            value={data.portfolio}
            onChange={field("portfolio")}
          />
          <FormField id={`${idBase}-github`} label="GitHub" optional value={data.github} onChange={field("github")} />
          <FormField
            id={`${idBase}-linkedin`}
            label="LinkedIn"
            optional
            value={data.linkedin}
            onChange={field("linkedin")}
          />
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
