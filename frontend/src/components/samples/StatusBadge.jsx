const statusColors = {
  Collected: "bg-blue-100 text-blue-800",
  Received: "bg-yellow-100 text-yellow-800",
  Processing: "bg-purple-100 text-purple-800",
  Completed: "bg-green-100 text-green-800",
};

const StatusBadge = ({ status }) => {
  const color = statusColors[status] || "bg-gray-100 text-gray-800";
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {status}
    </span>
  );
};

export default StatusBadge;

