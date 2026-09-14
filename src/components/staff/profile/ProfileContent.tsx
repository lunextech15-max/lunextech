"use client";

import { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileOverview from "./ProfileOverview";
import ProfileSkills from "./ProfileSkills";
import ProfileEdit from "./ProfileEdit";
import ProfileWork from "./ProfileWork";
import ProfileProjects from "./ProfileProjects";
import RecentActivity from "@/components/staff/dashboard/RecentActivity";
import type { ActivityItem, StaffProject, StaffTeamMember } from "@/lib/staff/types";
import "@/styles/staff-team.css";
import "@/styles/staff-task-detail.css";
import "@/styles/staff-profile.css";

export default function ProfileContent({
  member,
  memberSince,
  activeProjects,
  tasksInProgress,
  tasksCompleted,
  projects,
  activity,
}: {
  member: StaffTeamMember;
  memberSince: string;
  activeProjects: number;
  tasksInProgress: number;
  tasksCompleted: number;
  projects: StaffProject[];
  activity: ActivityItem[];
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(id);
  }, []);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(member.name);
  const [role, setRole] = useState(member.role);
  const [skills, setSkills] = useState(member.skills);

  // Prototype-local edit state, seeded from the centralized team data — this
  // is never written back to team-data.ts (no backend to persist it),
  // exactly like the Task Detail Workspace's status/checklist edits.
  const [draftName, setDraftName] = useState(name);
  const [draftRole, setDraftRole] = useState(role);
  const [draftSkills, setDraftSkills] = useState(skills);

  const startEditing = () => {
    setDraftName(name);
    setDraftRole(role);
    setDraftSkills(skills);
    setEditing(true);
  };

  const handleSave = () => {
    if (!draftName.trim() || !draftRole.trim()) return;
    setName(draftName.trim());
    setRole(draftRole.trim());
    setSkills(draftSkills);
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <div className="dash-skeleton h-4 w-32" />
        <div className="dash-skeleton mt-4 h-10 w-56" />
        <div className="dash-skeleton mt-8 h-16 w-full max-w-sm" />
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="dash-skeleton h-48" />
          <div className="dash-skeleton h-48" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
      <div className="dash-fade">
        <p className="text-[11px] font-medium tracking-[0.25em] text-soft-white/40 uppercase">
          09 <span className="text-accent">/ Profile</span>
        </p>
        <h1 className="mt-4 font-display text-[11vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
          My Profile
        </h1>
        <p className="mt-3 text-sm text-soft-white/50 sm:text-base">
          Your role, work, and contributions at LUNEX TECH.
        </p>
      </div>

      <div className="dash-fade mt-10 flex items-start justify-between gap-6" style={{ animationDelay: "0.06s" }}>
        <ProfileHeader initials={member.initials} name={name} role={role} discipline={member.discipline} />
        {!editing && (
          <button
            type="button"
            onClick={startEditing}
            className="profile-edit-toggle shrink-0 text-xs font-medium tracking-[0.15em] uppercase"
          >
            Edit profile →
          </button>
        )}
      </div>

      {editing && (
        <div className="mt-6">
          <ProfileEdit
            name={draftName}
            role={draftRole}
            skills={draftSkills}
            onNameChange={setDraftName}
            onRoleChange={setDraftRole}
            onAddSkill={(skill) => setDraftSkills((prev) => (prev.includes(skill) ? prev : [...prev, skill]))}
            onRemoveSkill={(skill) => setDraftSkills((prev) => prev.filter((s) => s !== skill))}
            onSave={handleSave}
            onCancel={() => setEditing(false)}
          />
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2">
        <div className="dash-fade flex flex-col gap-10" style={{ animationDelay: "0.12s" }}>
          <ProfileOverview name={name} role={role} discipline={member.discipline} memberSince={memberSince} />
          <ProfileSkills skills={skills} />
        </div>

        <div className="dash-fade flex flex-col gap-10" style={{ animationDelay: "0.18s" }}>
          <ProfileWork
            activeProjects={activeProjects}
            tasksInProgress={tasksInProgress}
            tasksCompleted={tasksCompleted}
          />
          <ProfileProjects projects={projects} />
        </div>
      </div>

      <div className="dash-fade mt-10" style={{ animationDelay: "0.24s" }}>
        <RecentActivity
          items={activity}
          title="05 / Recent activity"
          emptyTitle="No recent activity."
          emptyDescription="Your workspace activity will appear here."
        />
      </div>
    </div>
  );
}
