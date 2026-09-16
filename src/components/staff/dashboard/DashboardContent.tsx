import DashboardHeader from "./DashboardHeader";
import OverviewMetrics from "./OverviewMetrics";
import CurrentFocus from "./CurrentFocus";
import TodayTimeline from "./TodayTimeline";
import TaskList from "./TaskList";
import AnnouncementList from "./AnnouncementList";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";
import type {
  StaffAnnouncement,
  ActivityItem,
  CurrentFocusProject,
  DashboardMetrics,
  Task,
  StaffUser,
  TimelineEvent,
} from "@/lib/staff/types";

type DashboardData = {
  user: StaffUser;
  metrics: DashboardMetrics;
  currentFocus: CurrentFocusProject | null;
  today: TimelineEvent[];
  tasks: Task[];
  announcements: StaffAnnouncement[];
  activity: ActivityItem[];
};

export default function DashboardContent({ data }: { data: DashboardData }) {
  return (
    <div className="px-6 py-10 md:px-10 lg:px-16 lg:py-14">
      <div className="dash-fade">
        <DashboardHeader name={data.user.name} pendingTasks={data.metrics.myTasks} />
      </div>

      <div className="dash-fade mt-10" style={{ animationDelay: "0.06s" }}>
        <OverviewMetrics metrics={data.metrics} />
      </div>

      <div className="dash-fade mt-6" style={{ animationDelay: "0.12s" }}>
        <CurrentFocus project={data.currentFocus} />
      </div>

      <div
        className="dash-fade mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2"
        style={{ animationDelay: "0.18s" }}
      >
        <TodayTimeline events={data.today} />
        <QuickActions />
      </div>

      <div
        className="dash-fade mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3"
        style={{ animationDelay: "0.24s" }}
      >
        <div className="lg:col-span-2">
          <TaskList tasks={data.tasks} />
        </div>
        <RecentActivity items={data.activity} />
      </div>

      <div className="dash-fade mt-6" style={{ animationDelay: "0.3s" }}>
        <AnnouncementList announcements={data.announcements} />
      </div>
    </div>
  );
}
