import React, { useRef, useState } from "react";

// Accepts JWT token as prop
export default function TimetableFileUploadPanel({ token }: { token: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!fileInputRef.current || !fileInputRef.current.files?.length) {
      setMessage("No file selected");
      return;
    }
    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:5000/upload-timetable", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    setMessage(data.message || JSON.stringify(data));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow border mt-8">
      <h2 className="text-xl font-bold mb-4">Upload Timetable File (CSV, Excel)</h2>
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        ref={fileInputRef}
        className="mb-2"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleUpload}
      >Upload File</button>
      {message && <div className="text-sm text-gray-700 mt-2">{message}</div>}
    </div>
  );
}
