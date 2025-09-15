const statusColors = {
  collected: "bg-blue-100 text-blue-800",
  received: "bg-yellow-100 text-yellow-800",
  processing: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
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
