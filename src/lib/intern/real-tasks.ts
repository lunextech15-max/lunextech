// Adapts the real Task shape (real-tasks.ts, public.tasks) to the
// InternTask shape the existing Intern Portal task components already
// render — replaces INTERN_TASKS (mock-data.ts) with real data without
// having to redesign InternTaskList/InternTaskWorkspace.

import { getTasksForAssignee, getRealTask as getRealStaffTask } from "@/lib/staff/real-tasks";
import type { InternTask } from "./types";

function toInternTask(task: Awaited<ReturnType<typeof getTasksForAssignee>>[number]): InternTask {
  return {
    id: task.id,
    title: task.title,
    project: task.projectName,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate,
    description: task.description.join("\n\n"),
    objectives: task.checklist,
    comments: task.comments,
  };
}

export async function getMyInternTasks(staffId: string): Promise<InternTask[]> {
  const tasks = await getTasksForAssignee(staffId);
  return tasks.map(toInternTask);
}

export async function getInternTask(id: string): Promise<InternTask | null> {
  const task = await getRealStaffTask(id);
  return task ? toInternTask(task) : null;
}
