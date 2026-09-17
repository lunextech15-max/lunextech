"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TaskPriority from "@/components/staff/tasks/TaskPriority";
import TaskChecklist from "@/components/staff/tasks/TaskChecklist";
import TaskComments from "@/components/staff/tasks/TaskComments";
import InternSubmission from "./InternSubmission";
import { toggleChecklistItem, addTaskComment } from "@/lib/staff/real-tasks-client";
import { logActivity } from "@/lib/staff/activity-client";
import type { InternTask } from "@/lib/intern/types";

const STATUS_LABEL: Record<InternTask["status"], string> = {
  todo: "To do",
  "in-progress": "In progress",
  "in-review": "In review",
  completed: "Completed",
};

export default function InternTaskWorkspace({
  task,
  viewer,
}: {
  task: InternTask;
  viewer: { staffId: string; name: string };
}) {
  const router = useRouter();
  const [objectives, setObjectives] = useState(task.objectives);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = async (id: string) => {
    const item = objectives.find((i) => i.id === id);
    if (!item) return;
    setObjectives((items) => items.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i)));
    const { error: toggleError } = await toggleChecklistItem(id, !item.completed);
    if (toggleError) {
      setObjectives((items) => items.map((i) => (i.id === id ? { ...i, completed: item.completed } : i)));
      setError(`Couldn't update: ${toggleError}`);
    }
  };

  const handleAddComment = async (body: string) => {
    const { error: commentError } = await addTaskComment(task.id, viewer.staffId, body);
    if (commentError) {
      setError(`Couldn't post comment: ${commentError}`);
      return;
    }
    void logActivity(viewer.staffId, "tasks", "Commented on task", task.title);
    router.refresh();
  };

  return (
    <div className="mt-10">
      {error && (
        <p role="alert" className="mb-6 border border-line px-5 py-3 text-sm text-accent">
          {error}
        </p>
      )}

      <div className="grid grid-cols-3 gap-6 border border-line p-6 sm:p-8">
        <div>
          <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Status</p>
          <span className={`dash-status dash-status--${task.status} mt-2`}>{STATUS_LABEL[task.status]}</span>
        </div>
        <div>
          <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Priority</p>
          <div className="mt-2">
            <TaskPriority priority={task.priority} />
          </div>
        </div>
        <div>
          <p className="text-[10px] font-medium tracking-[0.2em] text-soft-white/40 uppercase">Due date</p>
          <p className="mt-2 text-sm font-medium text-soft-white/80">{task.dueDate}</p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-10">
          <section aria-labelledby="intern-task-description-heading">
            <h2
              id="intern-task-description-heading"
              className="text-[11px] font-medium tracking-[0.25em] text-soft-white/45 uppercase"
            >
              Description
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-soft-white/60">{task.description}</p>
          </section>

          <TaskChecklist title="Objectives" items={objectives} onToggle={handleToggle} />

          <InternSubmission />
        </div>

        <div>
          <TaskComments title="Comments" comments={task.comments} onAddComment={handleAddComment} />
        </div>
      </div>
    </div>
  );
}
