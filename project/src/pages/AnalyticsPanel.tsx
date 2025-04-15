import React from "react";
// Placeholder for future chart integration
export default function AnalyticsPanel({ plan, progress }: { plan: any, progress: any }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analytics</h2>
      <div className="mb-6">Visualizations and stats will appear here.</div>
      {plan && (
        <div className="mb-4">
          <div className="font-semibold">Plan Preview:</div>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(plan, null, 2)}</pre>
        </div>
      )}
      {progress && (
        <div className="mb-4">
          <div className="font-semibold">Progress Preview:</div>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(progress, null, 2)}</pre>
        </div>
      )}
      <div className="text-neutral-500 text-sm">Charts and analytics coming soon.</div>
    </div>
  );
}
