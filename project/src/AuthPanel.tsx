import React, { useState } from "react";
import { register, login } from "./api-python-auth";

export default function AuthPanel({ onAuth }: { onAuth: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow border mt-8">
      <h2 className="text-xl font-bold mb-4">Authentication</h2>
      <input
        className="w-full border rounded p-2 mb-2"
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        className="w-full border rounded p-2 mb-4"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div className="flex gap-2 mb-2">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={async () => {
            const res = await register(username, password);
            setMessage(res.message || JSON.stringify(res));
          }}
        >Register</button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={async () => {
            const res = await login(username, password);
            setMessage(res.message || JSON.stringify(res));
            if (res.access_token) onAuth(res.access_token);
          }}
        >Login</button>
      </div>
      {message && <div className="text-sm text-gray-700">{message}</div>}
    </div>
  );
}
