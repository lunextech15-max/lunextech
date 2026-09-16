"use client";

import { useId, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { EXPERIENCE_LEVELS, type JobApplicationInput } from "@/lib/job-applications";
import type { Job } from "@/lib/jobs";
import FileUpload from "./FileUpload";
import ApplicationSuccess from "@/components/shared/ApplicationSuccess";

const EMPTY: Omit<JobApplicationInput, "jobId"> = {
  name: "",
  email: "",
  phone: "",
  location: "",
  currentRole: "",
  experienceLevel: "",
  experience: "",
  skills: "",
  portfolio: "",
  github: "",
  linkedin: "",
  motivation: "",
  resumeFileName: "",
};

type Errors = Partial<Record<keyof JobApplicationInput, string>> & { confirm?: string };

const REQUIRED_FIELDS: (keyof typeof EMPTY)[] = [
  "name",
  "email",
  "location",
  "experienceLevel",
  "experience",
  "motivation",
  "resumeFileName",
];

function validate(data: typeof EMPTY, confirmed: boolean): Errors {
  const errors: Errors = {};
  for (const field of REQUIRED_FIELDS) {
    if (!data[field].trim()) errors[field] = "This field is required.";
  }
  if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!confirmed) errors.confirm = "Please confirm the information is accurate.";
  return errors;
}

export default function JobApplicationForm({ job }: { job: Job }) {
  const idBase = useId();
  const [data, setData] = useState(EMPTY);
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const field =
    (key: keyof typeof EMPTY) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setData((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(data, confirmed);
    setErrors(nextErrors);
    setSubmitError(null);
    if (Object.keys(nextErrors).length > 0) return;

    setPending(true);
    const supabase = createClient();
    const { error } = await supabase.from("job_applications").insert({
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      location: data.location.trim(),
      job_id: job.id,
      current_position: data.currentRole.trim(),
      experience_level: data.experienceLevel,
      experience: data.experience.trim(),
      skills: data.skills.trim(),
      portfolio: data.portfolio.trim(),
      github: data.github.trim(),
      linkedin: data.linkedin.trim(),
      motivation: data.motivation.trim(),
      resume_file_name: data.resumeFileName,
    });
    setPending(false);

    if (error) {
      setSubmitError("Something went wrong submitting your application. Please try again in a moment.");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) return <ApplicationSuccess href="/careers" label="View other open roles" />;

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
              Phone number
            </label>
            <input id={`${idBase}-phone`} className="apply-input" value={data.phone} onChange={field("phone")} />
          </div>
          <div className="apply-field">
            <label htmlFor={`${idBase}-location`} className="apply-field-label">
              Location
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

      {/* Professional information */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Professional information</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="apply-field">
            <label htmlFor={`${idBase}-role`} className="apply-field-label">
              Current role <span className="normal-case text-soft-white/30">(optional)</span>
            </label>
            <input id={`${idBase}-role`} className="apply-input" value={data.currentRole} onChange={field("currentRole")} />
          </div>
          <div className="apply-field">
            <label htmlFor={`${idBase}-level`} className="apply-field-label">
              Experience level
            </label>
            <select
              id={`${idBase}-level`}
              className="apply-select"
              value={data.experienceLevel}
              onChange={field("experienceLevel")}
              aria-invalid={!!errors.experienceLevel}
              aria-describedby={errors.experienceLevel ? `${idBase}-level-error` : undefined}
            >
              <option value="">Choose a level</option>
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.experienceLevel && (
              <p id={`${idBase}-level-error`} className="apply-error" role="alert">
                {errors.experienceLevel}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Your experience</p>
        <div className="apply-field">
          <label htmlFor={`${idBase}-experience`} className="apply-field-label">
            Tell us about your experience.
          </label>
          <textarea
            id={`${idBase}-experience`}
            className="apply-textarea"
            value={data.experience}
            onChange={field("experience")}
            aria-invalid={!!errors.experience}
            aria-describedby={errors.experience ? `${idBase}-experience-error` : undefined}
          />
          {errors.experience && (
            <p id={`${idBase}-experience-error`} className="apply-error" role="alert">
              {errors.experience}
            </p>
          )}
        </div>
      </section>

      {/* Skills */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Skills</p>
        <div className="apply-field">
          <label htmlFor={`${idBase}-skills`} className="apply-field-label">
            What technologies or skills do you work with?
          </label>
          <input
            id={`${idBase}-skills`}
            className="apply-input"
            placeholder="React, JavaScript, Python…"
            value={data.skills}
            onChange={field("skills")}
          />
        </div>
      </section>

      {/* Portfolio */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Your work</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="apply-field">
            <label htmlFor={`${idBase}-portfolio`} className="apply-field-label">
              Portfolio URL <span className="normal-case text-soft-white/30">(optional)</span>
            </label>
            <input id={`${idBase}-portfolio`} className="apply-input" value={data.portfolio} onChange={field("portfolio")} />
          </div>
          <div className="apply-field">
            <label htmlFor={`${idBase}-github`} className="apply-field-label">
              GitHub <span className="normal-case text-soft-white/30">(optional)</span>
            </label>
            <input id={`${idBase}-github`} className="apply-input" value={data.github} onChange={field("github")} />
          </div>
          <div className="apply-field">
            <label htmlFor={`${idBase}-linkedin`} className="apply-field-label">
              LinkedIn <span className="normal-case text-soft-white/30">(optional)</span>
            </label>
            <input id={`${idBase}-linkedin`} className="apply-input" value={data.linkedin} onChange={field("linkedin")} />
          </div>
        </div>
      </section>

      {/* Why LUNEX */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Why LUNEX?</p>
        <div className="apply-field">
          <label htmlFor={`${idBase}-motivation`} className="apply-field-label">
            Why are you interested in working with LUNEX TECH?
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
      </section>

      {/* Resume */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Resume</p>
        <FileUpload onFileNameChange={(name) => setData((prev) => ({ ...prev, resumeFileName: name }))} />
        {errors.resumeFileName && (
          <p className="apply-error" role="alert">
            {errors.resumeFileName}
          </p>
        )}
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
