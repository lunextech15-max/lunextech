"use client";

import { useId, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { EXPERIENCE_LEVELS, type JobApplicationInput } from "@/lib/job-applications";
import type { Job } from "@/lib/jobs";
import FileUpload from "./FileUpload";
import FormField from "@/components/shared/FormField";
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
            label="Location"
            value={data.location}
            onChange={field("location")}
            error={errors.location}
          />
        </div>
      </section>

      {/* Professional information */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Professional information</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            id={`${idBase}-role`}
            label="Current role"
            optional
            value={data.currentRole}
            onChange={field("currentRole")}
          />
          <FormField
            id={`${idBase}-level`}
            label="Experience level"
            as="select"
            value={data.experienceLevel}
            onChange={field("experienceLevel")}
            error={errors.experienceLevel}
          >
            <option value="">Choose a level</option>
            {EXPERIENCE_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </FormField>
        </div>
      </section>

      {/* Experience */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Your experience</p>
        <FormField
          id={`${idBase}-experience`}
          label="Tell us about your experience."
          as="textarea"
          value={data.experience}
          onChange={field("experience")}
          error={errors.experience}
        />
      </section>

      {/* Skills */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Skills</p>
        <FormField
          id={`${idBase}-skills`}
          label="What technologies or skills do you work with?"
          placeholder="React, JavaScript, Python…"
          value={data.skills}
          onChange={field("skills")}
        />
      </section>

      {/* Portfolio */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Your work</p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <FormField
            id={`${idBase}-portfolio`}
            label="Portfolio URL"
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

      {/* Why LUNEX */}
      <section className="flex flex-col gap-6">
        <p className="apply-section-title">Why LUNEX?</p>
        <FormField
          id={`${idBase}-motivation`}
          label="Why are you interested in working with LUNEX TECH?"
          as="textarea"
          value={data.motivation}
          onChange={field("motivation")}
          error={errors.motivation}
        />
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
