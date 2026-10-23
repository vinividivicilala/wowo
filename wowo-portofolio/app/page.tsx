"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [profile, setProfile] = useState({
    name: "WOWO",
    role: "Fullstack Developer",
    bio: "Halo, saya WOWO. Saya membuat website keren.",
  });

  useEffect(() => {
    // Ganti URL ini dengan URL backend Node.js Anda nanti
    fetch("http://localhost:5000/api/profile")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch(() => console.log("Backend offline, menggunakan data default"));
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-10">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl text-center max-w-lg">
        <div className="w-24 h-24 bg-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold">
          {profile.name.charAt(0)}
        </div>
        <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
        <h2 className="text-xl text-purple-400 mb-6">{profile.role}</h2>
        <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
      </div>
    </main>
  );
}
