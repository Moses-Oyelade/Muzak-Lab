import React from "react";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  const role = user?.role?.toLowerCase(); // normalize

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Admin view */}
      {role === "admin" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Users" value="12" description="Active system users" />
            <Card title="Patients" value="124" description="Total registered" />
            <Card title="Reports" value="32" description="Generated this month" />
          </div>

          <Section title="System Overview">
            <ul className="space-y-2">
              <li>✔ Backup completed successfully</li>
              <li>⚠ 2 pending role requests</li>
              <li>📊 Server uptime: 99.9%</li>
            </ul>
          </Section>
        </>
      )}

      {/* Collector view */}
      {(role === "collector" &&'admin') && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card title="Patients" value="124" description="Assigned to you" />
            <Card title="Samples" value="58" description="Collected this week" />
          </div>

          <Section title="Pending Collections">
            <ul className="space-y-2">
              <li>🧾 John Doe – Blood sample</li>
              <li>🧾 Mary Smith – Urine sample</li>
              <li>🧾 David Lee – Swab test</li>
            </ul>
          </Section>
        </>
      )}

      {/* Technician view */}
      {(role === "technician" && "admin") && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card title="Samples" value="58" description="Awaiting analysis" />
            <Card title="Reports" value="18" description="Completed today" />
          </div>

          <Section title="Lab Queue">
            <ul className="space-y-2">
              <li>🔬 Sample #1123 – Blood test</li>
              <li>🔬 Sample #1124 – DNA test</li>
              <li>🔬 Sample #1125 – Urine test</li>
            </ul>
          </Section>
        </>
      )}
    </div>
  );
}

// Reusable Card component
function Card({ title, value, description }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}

// Reusable Section wrapper
function Section({ title, children }) {
  return (
    <div className="mt-10 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
