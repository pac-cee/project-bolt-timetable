import React, { useState } from "react";

export default function PlanAndProgressPanel({ token }: { token: string, onLogout: () => void }) {
  const [plan, setPlan] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [progressInput, setProgressInput] = useState("{\n  \"completed\": true\n}");
  const [message, setMessage] = useState("");

  const fetchPlan = async () => {
    const res = await fetch("http://localhost:5000/plan", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPlan(data.plan);
    setMessage(data.message || "Fetched plan");
  };
  const fetchProgress = async () => {
    const res = await fetch("http://localhost:5000/progress", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setProgress(data.progress);
    setMessage(data.message || "Fetched progress");
  };
  const updateProgress = async () => {
    try {
      const body = JSON.parse(progressInput);
      const res = await fetch("http://localhost:5000/progress", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setProgress(data.progress);
      setMessage(data.message || "Progress updated");
    } catch {
      setMessage("Invalid JSON");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow border mt-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Plan & Progress</h2>
        <button
          className="bg-red-600 text-white px-3 py-1 rounded"
          onClick={onLogout}
        >Logout</button>
      </div>
      <div className="mb-4 flex gap-2">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          onClick={fetchPlan}
        >Get Plan</button>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          onClick={fetchProgress}
        >Get Progress</button>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Progress JSON</label>
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={2}
          value={progressInput}
          onChange={e => setProgressInput(e.target.value)}
        />
        <button
          className="bg-yellow-600 text-white px-4 py-2 rounded"
          onClick={updateProgress}
        >Update Progress</button>
      </div>
      {message && <div className="mb-2 text-sm text-gray-700">{message}</div>}
      {plan && (
        <div className="mb-2">
          <div className="font-semibold">Plan:</div>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(plan, null, 2)}</pre>
        </div>
      )}
      {progress && (
        <div className="mb-2">
          <div className="font-semibold">Progress:</div>
          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(progress, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
