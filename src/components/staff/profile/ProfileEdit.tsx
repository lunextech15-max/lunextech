"use client";

import { useId, useState } from "react";

export default function ProfileEdit({
  name,
  role,
  skills,
  onNameChange,
  onRoleChange,
  onAddSkill,
  onRemoveSkill,
  onSave,
  onCancel,
  saving,
  error,
}: {
  name: string;
  role: string;
  skills: string[];
  onNameChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
  onSave: () => void;
  onCancel: () => void;
  saving?: boolean;
  error?: string | null;
}) {
  const nameId = useId();
  const roleId = useId();
  const [newSkill, setNewSkill] = useState("");

  const isValid = name.trim().length > 0 && role.trim().length > 0;

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    onAddSkill(trimmed);
    setNewSkill("");
  };

  return (
    <div className="border border-line p-6 sm:p-8">
      <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase">Edit profile</p>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={nameId} className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">
            Display name
          </label>
          <input
            id={nameId}
            type="text"
            className="profile-input mt-2"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
          />
          {!name.trim() && <p className="mt-1.5 text-[11px] text-accent">Name cannot be empty.</p>}
        </div>
        <div>
          <label htmlFor={roleId} className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">
            Role
          </label>
          <input
            id={roleId}
            type="text"
            className="profile-input mt-2"
            value={role}
            onChange={(event) => onRoleChange(event.target.value)}
          />
          {!role.trim() && <p className="mt-1.5 text-[11px] text-accent">Role cannot be empty.</p>}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Skills</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="profile-skill-chip">
              {skill}
              <button
                type="button"
                onClick={() => onRemoveSkill(skill)}
                className="profile-skill-remove"
                aria-label={`Remove ${skill}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="mt-3 flex gap-3">
          <input
            type="text"
            placeholder="Add a skill…"
            className="profile-input"
            value={newSkill}
            onChange={(event) => setNewSkill(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleAddSkill();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="dash-metric-link shrink-0 text-xs font-medium tracking-[0.15em] uppercase"
          >
            Add →
          </button>
        </div>
      </div>

      <div className="mt-7 flex items-center gap-6">
        <button
          type="button"
          disabled={!isValid || saving}
          onClick={onSave}
          className="task-action text-xs font-semibold tracking-[0.15em] text-soft-white uppercase disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="profile-edit-toggle text-xs font-medium tracking-[0.15em] uppercase disabled:cursor-not-allowed disabled:opacity-40"
        >
          Cancel
        </button>
      </div>
      {error && (
        <p className="mt-4 text-[11px] text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
