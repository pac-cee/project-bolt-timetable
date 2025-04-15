import React from "react";

export default function ProfilePanel({ user }: { user: { username: string } | null }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-200 max-w-md">
        <div className="mb-2"><span className="font-semibold">Username:</span> {user?.username}</div>
        {/* Add more profile info as available */}
        <div className="mt-4 text-neutral-500 text-sm">Edit profile and password change coming soon.</div>
      </div>
    </div>
  );
}
