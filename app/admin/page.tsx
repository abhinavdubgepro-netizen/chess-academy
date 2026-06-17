"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"demos" | "contacts">("demos");
  const [demoData, setDemoData] = useState("");
  const [contactData, setContactData] = useState("");

  useEffect(() => {
    fetch("/api/demo-request")
      .then((res) => res.json())
      .then((data) => setDemoData(data.data || ""));

    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => setContactData(data.data || ""));
  }, []);

  // Parse the vertical format into objects
  const parseEntries = (text: string) => {
    if (!text || text.includes("No submissions") || text.includes("No messages")) return [];
    
    const entries = text.split("═══════════════════════════════════════").filter(e => e.trim());
    
    return entries.map(entry => {
      const lines = entry.trim().split("\n");
      const obj: Record<string, string> = {};
      lines.forEach(line => {
        if (line.includes(":")) {
          const [key, value] = line.split(":,");
          if (key && value) obj[key.trim()] = value.trim();
        }
      });
      return obj;
    }).filter(e => Object.keys(e).length > 0);
  };

  const demoEntries = parseEntries(demoData);
  const contactEntries = parseEntries(contactData);

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white p-8 pt-24">
      <h1 className="text-3xl font-bold mb-8">📋 Submissions</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("demos")}
          className={`px-4 py-2 rounded-lg ${activeTab === "demos" ? "bg-[#e94560]" : "bg-white/10"}`}
        >
          Demo Requests ({demoEntries.length})
        </button>
        <button
          onClick={() => setActiveTab("contacts")}
          className={`px-4 py-2 rounded-lg ${activeTab === "contacts" ? "bg-[#e94560]" : "bg-white/10"}`}
        >
          Contact Messages ({contactEntries.length})
        </button>
      </div>

      {activeTab === "demos" && (
        <div>
          {demoEntries.length === 0 ? (
            <p className="text-white/50">No demo requests yet.</p>
          ) : (
            <div className="space-y-4">
              {demoEntries.map((entry, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(entry).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-[#f5a623] text-sm font-medium">{key}</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "contacts" && (
        <div>
          {contactEntries.length === 0 ? (
            <p className="text-white/50">No contact messages yet.</p>
          ) : (
            <div className="space-y-4">
              {contactEntries.map((entry, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(entry).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-[#f5a623] text-sm font-medium">{key}</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}