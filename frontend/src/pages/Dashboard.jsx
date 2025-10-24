import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getReportSummary } from "../services/reportService"
import LoadingSpinner from "../components/LoadingSpinner";
import { toTitleCase } from "../components/samples/TitleCase";
import ReportSummary from "../components/ReportSummary";

export default function DashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);

  const role = user?.role?.toLowerCase(); // normalize
  const UserRole = toTitleCase(role)

  // Calling the report summary
  useEffect(() => {
      const fetchSummary = async () => {
        try {
          const data = await getReportSummary();
          console.log(data)

          const formatted = {
            totalSamples: data?.total_samples ?? 0,
            completed: data?.completed ?? 0,
            processingSamples: data?.pocessing ?? 0,
            receivedSamples: data?.received ?? 0,
            collectedSamples: data?.collected ?? 0,
            collectedToday: data?.collected_today ?? 0,
          };
          setSummary(formatted);
        } catch (error) {
          console.error("Failed to fetch report summary:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchSummary();
    }, []);


  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard (<span className="text-gray-500">{`${UserRole}`}</span>)</h1>

      {/* Admin view */}
      {role === "admin" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Users" value="12" description="Active system users" />
            <Card title="Patients" value="124" description="Total registered" />
          </div>

          <ReportSummary summary = {summary}/> {/* Report Summary Chat */}

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
            <Card title="Completed Samples" value={summary.completed} description="Completed samples" />
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
            <Card title="Completed Samples" value={summary.completed} description="Completed samples" />
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
