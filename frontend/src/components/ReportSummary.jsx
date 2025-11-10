// import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  BarChart3,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

export default function ReportSummary({ summary }) {
  console.log(summary)
  if (!summary) {
    return <LoadingSpinner />
  }
  const {
    totalSamples = 0,
    completed = 0,
    processingSamples = 0,
    receivedSamples = 0,
    collectedSamples = 0,
    collectedToday = 0,
  } = summary
  

  // Chart data
  const chartData = [
    { name: "Total", count: totalSamples },
    { name: "Completed", count: completed },
    { name: "Processing", count: processingSamples },
    { name: "Received", count: receivedSamples },
    { name: "Collected", count: collectedSamples },
    { name: "Today", count: collectedToday },
  ];

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
        <BarChart3 className="text-blue-500" />
        Report Summary
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <SummaryCard
          title="Total Samples"
          value={totalSamples}
          icon={<BarChart3 className="text-blue-500" />}
          color="bg-blue-100 text-blue-700"
        />

        <SummaryCard
          title="Completed"
          value={completed}
          icon={<CheckCircle className="text-green-500" />}
          color="bg-green-100 text-green-700"
        />

        <SummaryCard
          title="Processing Samples"
          value={processingSamples}
          icon={<Clock className="text-yellow-500" />}
          color="bg-yellow-100 text-yellow-700"
        />

        <SummaryCard
          title="Received Samples"
          value={receivedSamples}
          icon={<XCircle className="text-red-500" />}
          color="bg-red-100 text-red-700"
        />
        
        <SummaryCard
          title="Collected Samples"
          value={collectedSamples}
          icon={<XCircle className="text-red-500" />}
          color="bg-red-100 text-red-700"
        />
      </div>

      {/* Chart Section */}
      <div className="bg-gray-50 p-1 sm:p-4 rounded-lg shadow-inner">
        <h3 className="text-base sm:text-xl font-semibold mb-2 text-gray-700">
          Sample Status Distribution
        </h3>
        <ResponsiveContainer className={'sm:text-lg text-xs'} width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" name="Samples" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon, color }) {
  return (
    <div className={`p-4 rounded-lg shadow-sm ${color}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
