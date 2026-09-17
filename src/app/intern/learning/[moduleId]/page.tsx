import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import InternLayout from "@/components/intern/InternLayout";
import InternModuleWorkspace from "@/components/intern/learning/InternModuleWorkspace";
import { getInternUser } from "@/lib/intern/session";
import { getMyLearningModules } from "@/lib/intern/learning";
import { INTERN_LEARNING_MODULES } from "@/lib/intern/mock-data";
import "@/styles/staff-projects.css";
import "@/styles/staff-task-detail.css";

export function generateStaticParams() {
  return INTERN_LEARNING_MODULES.map((learningModule) => ({ moduleId: learningModule.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/intern/learning/[moduleId]">): Promise<Metadata> {
  const { moduleId } = await params;
  const learningModule = INTERN_LEARNING_MODULES.find((m) => m.id === moduleId);
  return {
    title: learningModule
      ? `${learningModule.title} — LUNEX TECH Intern Portal`
      : "Learning — LUNEX TECH Intern Portal",
    robots: { index: false, follow: false },
  };
}

export default async function InternLearningModulePage({
  params,
}: PageProps<"/intern/learning/[moduleId]">) {
  const { moduleId } = await params;
  const user = await getInternUser();
  const modules = await getMyLearningModules(user.id);
  const learningModule = modules.find((m) => m.id === moduleId);
  if (!learningModule || learningModule.status === "locked") notFound();

  return (
    <InternLayout active="learning" user={user}>
      <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
        <Link href="/intern/learning" className="dash-metric-link text-xs font-medium tracking-[0.15em] uppercase">
          ← Learning
        </Link>

        <p className="mt-6 text-[10px] font-medium tracking-[0.2em] text-accent uppercase">
          Module {learningModule.number}
        </p>
        <h1 className="mt-2 font-display text-[10vw] font-black leading-[0.95] tracking-tight text-soft-white sm:text-[6vw] lg:text-[3vw] xl:text-4xl">
          {learningModule.title}
        </h1>

        <InternModuleWorkspace
          moduleId={learningModule.id}
          moduleTitle={learningModule.title}
          lessons={learningModule.lessons}
          staffId={user.id}
        />
      </div>
    </InternLayout>
  );
}
