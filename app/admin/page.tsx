"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [demos, setDemos] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"demos" | "contacts">("demos");

  useEffect(() => {
    fetch("/api/demo-request")
      .then((res) => res.json())
      .then((data) => setDemos(data));

    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-white p-8 pt-24">
      <h1 className="text-3xl font-bold mb-8">📋 Submissions</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("demos")}
          className={`px-4 py-2 rounded-lg ${activeTab === "demos" ? "bg-[#e94560]" : "bg-white/10"}`}
        >
          Demo Requests ({demos.length})
        </button>
        <button
          onClick={() => setActiveTab("contacts")}
          className={`px-4 py-2 rounded-lg ${activeTab === "contacts" ? "bg-[#e94560]" : "bg-white/10"}`}
        >
          Contact Messages ({contacts.length})
        </button>
      </div>

      {activeTab === "demos" && (
        <div className="overflow-x-auto">
          {demos.length === 0 ? (
            <p className="text-white/50">No demo requests yet.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-white/60">
                  <th className="py-3 px-2">Name</th>
                  <th className="py-3 px-2">Email</th>
                  <th className="py-3 px-2">Phone</th>
                  <th className="py-3 px-2">Level</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {demos.map((demo) => (
                  <tr key={demo.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-2">{demo.name}</td>
                    <td className="py-3 px-2 text-[#f5a623]">{demo.email}</td>
                    <td className="py-3 px-2">{demo.phone || "-"}</td>
                    <td className="py-3 px-2 capitalize">{demo.chessLevel}</td>
                    <td className="py-3 px-2">{demo.preferredDate || "-"}</td>
                    <td className="py-3 px-2 text-white/50 text-sm">{demo.submittedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === "contacts" && (
        <div className="overflow-x-auto">
          {contacts.length === 0 ? (
            <p className="text-white/50">No contact messages yet.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-white/60">
                  <th className="py-3 px-2">Name</th>
                  <th className="py-3 px-2">Email</th>
                  <th className="py-3 px-2">Subject</th>
                  <th className="py-3 px-2">Message</th>
                  <th className="py-3 px-2">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-2">{contact.name}</td>
                    <td className="py-3 px-2 text-[#f5a623]">{contact.email}</td>
                    <td className="py-3 px-2">{contact.subject}</td>
                    <td className="py-3 px-2 max-w-xs truncate">{contact.message}</td>
                    <td className="py-3 px-2 text-white/50 text-sm">{contact.submittedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}