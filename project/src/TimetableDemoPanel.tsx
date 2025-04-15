import React, { useState } from "react";
// Switch to './api-golang' or './api-java' to use a different backend
import {
  uploadTimetable,
  generatePlan,
  getPlan,
  updateProgress,
  getProgress,
} from "./api-python";

export default function TimetableDemoPanel() {
  const [timetable, setTimetable] = useState("{
  \"monday\": [\"Math\"],\n  \"tuesday\": [\"Physics\"]\n}");
  const [plan, setPlan] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [progressInput, setProgressInput] = useState("{\n  \"completed\": true\n}");
  const [message, setMessage] = useState("");

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow border mt-8">
      <h2 className="text-xl font-bold mb-4">Timetable Demo Panel</h2>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Timetable JSON</label>
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={4}
          value={timetable}
          onChange={e => setTimetable(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
          onClick={async () => {
            try {
              const data = JSON.parse(timetable);
              const res = await uploadTimetable(data);
              setMessage(res.message || JSON.stringify(res));
            } catch (e) {
              setMessage("Invalid JSON");
            }
          }}
        >Upload Timetable</button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={async () => {
            const res = await generatePlan();
            setPlan(res.plan);
            setMessage(res.message || "Plan generated");
          }}
        >Generate Plan</button>
      </div>
      <div className="mb-4">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded mr-2"
          onClick={async () => {
            const res = await getPlan();
            setPlan(res.plan);
            setMessage(res.message || "Fetched plan");
          }}
        >Get Plan</button>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          onClick={async () => {
            const res = await getProgress();
            setProgress(res.progress);
            setMessage(res.message || "Fetched progress");
          }}
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
          onClick={async () => {
            try {
              const data = JSON.parse(progressInput);
              const res = await updateProgress(data);
              setProgress(res.progress);
              setMessage(res.message || "Progress updated");
            } catch (e) {
              setMessage("Invalid JSON");
            }
          }}
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
