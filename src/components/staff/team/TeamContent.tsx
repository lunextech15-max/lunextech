"use client";

import { useMemo, useState } from "react";
import TeamHeader from "./TeamHeader";
import TeamSummary from "./TeamSummary";
import TeamFilters from "./TeamFilters";
import TeamSearch from "./TeamSearch";
import TeamMemberList from "./TeamMemberList";
import type { StaffProject, StaffTeamMember } from "@/lib/staff/types";
import "@/styles/staff-projects.css";
import "@/styles/staff-team.css";

export default function TeamContent({
  team,
  projects,
  disciplines,
  currentUserId,
}: {
  team: StaffTeamMember[];
  projects: StaffProject[];
  disciplines: string[];
  currentUserId: string;
}) {
  const [query, setQuery] = useState("");
  const [discipline, setDiscipline] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return team
      .filter((member) => discipline === "all" || member.discipline === discipline)
      .filter(
        (member) =>
          !q ||
          member.name.toLowerCase().includes(q) ||
          member.role.toLowerCase().includes(q) ||
          member.discipline.toLowerCase().includes(q) ||
          member.skills.some((skill) => skill.toLowerCase().includes(q))
      );
  }, [team, query, discipline]);


  return (
    <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
      <div className="dash-fade">
        <TeamHeader />
      </div>

      <div className="dash-fade mt-8" style={{ animationDelay: "0.06s" }}>
        <TeamSummary team={team} projects={projects} />
      </div>

      <div
        className="dash-fade mt-8 flex flex-col gap-4 border-y border-line py-5 lg:flex-row lg:items-center lg:justify-between"
        style={{ animationDelay: "0.12s" }}
      >
        <TeamFilters disciplines={disciplines} active={discipline} onChange={setDiscipline} />
        <div className="sm:w-64">
          <TeamSearch value={query} onChange={setQuery} />
        </div>
      </div>

      <div className="dash-fade mt-8" style={{ animationDelay: "0.18s" }}>
        <TeamMemberList
          members={filtered}
          projects={projects}
          currentUserId={currentUserId}
          onClearFilters={() => {
            setQuery("");
            setDiscipline("all");
          }}
        />
      </div>
    </div>
  );
}
