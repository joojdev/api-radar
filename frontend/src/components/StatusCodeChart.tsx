import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAppContext } from "../hooks/useAppContext";

export default function StatusCodeChart() {
  const { currentLogList } = useAppContext();

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={currentLogList as any[]}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" minTickGap={20} tickFormatter={formatTime} />
        <YAxis />
        <Tooltip
          labelFormatter={formatDate}
          formatter={(value: number, _name: string) => [
            `Status Code: ${value}`,
          ]}
        />
        <Bar
          dataKey="statusCode"
          fill="#8884d8"
          activeBar={<Rectangle fill="#8884d8" stroke="#7c7a9eff" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
