export default function JobRowSkeleton() {
  return (
    <div className="border-t border-line py-9 first:border-t-0">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10">
        <div className="flex items-baseline gap-5 lg:w-64">
          <div className="skeleton h-4 w-5" />
          <div className="skeleton h-8 w-40" />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:gap-8">
          <div className="skeleton h-4 w-60" />
          <div className="flex gap-8">
            <div className="skeleton h-8 w-16" />
            <div className="skeleton h-8 w-20" />
            <div className="skeleton h-8 w-16" />
          </div>
        </div>
        <div className="skeleton h-4 w-24 lg:justify-self-end" />
      </div>
    </div>
  );
}
