import React from "react";

export default function DashboardLayout({
  user,
  onLogout,
  children,
  setSection,
  section
}: {
  user: { username: string } | null,
  onLogout: () => void,
  children: React.ReactNode,
  setSection: (s: string) => void,
  section: string
}) {
  return (
    <div className="min-h-screen flex bg-neutral-50">
      <aside className="w-64 bg-white border-r p-6 flex flex-col">
        <div className="font-bold text-lg mb-8">Timetable Analyzer</div>
        <nav className="flex-1 flex flex-col gap-2">
          <button
            className={`text-left px-2 py-1 rounded ${section === 'dashboard' ? 'bg-blue-100' : ''}`}
            onClick={() => setSection('dashboard')}
          >Dashboard</button>
          <button
            className={`text-left px-2 py-1 rounded ${section === 'analytics' ? 'bg-blue-100' : ''}`}
            onClick={() => setSection('analytics')}
          >Analytics</button>
          <button
            className={`text-left px-2 py-1 rounded ${section === 'profile' ? 'bg-blue-100' : ''}`}
            onClick={() => setSection('profile')}
          >Profile</button>
        </nav>
        <div className="mt-8">
          <div className="text-sm text-neutral-700 mb-2">{user?.username}</div>
          <button
            className="bg-red-600 text-white px-3 py-1 rounded w-full"
            onClick={onLogout}
          >Logout</button>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
