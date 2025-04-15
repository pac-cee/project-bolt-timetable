const BASE_URL = "http://localhost:8080";

export async function uploadTimetable(timetable: any) {
  const res = await fetch(`${BASE_URL}/upload-timetable`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(timetable),
  });
  return res.json();
}

export async function generatePlan() {
  const res = await fetch(`${BASE_URL}/generate-plan`, { method: "POST" });
  return res.json();
}

export async function getPlan() {
  const res = await fetch(`${BASE_URL}/plan`);
  return res.json();
}

export async function updateProgress(progress: any) {
  const res = await fetch(`${BASE_URL}/progress`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(progress),
  });
  return res.json();
}

export async function getProgress() {
  const res = await fetch(`${BASE_URL}/progress`);
  return res.json();
}
