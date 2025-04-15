import React from "react";

export default function DashboardHome({ user }: { user: { username: string } | null }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome{user ? `, ${user.username}` : ''}!</h1>
      <p className="mb-6">This is your study dashboard. Use the menu to upload timetables, view your plan, track progress, and see analytics.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <h3 className="font-semibold text-neutral-900 mb-2">Upload Timetable</h3>
          <p className="text-neutral-600 text-sm mb-2">Upload your CSV or Excel timetable to start planning.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <h3 className="font-semibold text-neutral-900 mb-2">Generate Study Plan</h3>
          <p className="text-neutral-600 text-sm mb-2">Generate a personalized study plan based on your schedule.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <h3 className="font-semibold text-neutral-900 mb-2">Track Progress</h3>
          <p className="text-neutral-600 text-sm mb-2">Update and view your study progress and completion stats.</p>
        </div>
      </div>
    </div>
  );
}
