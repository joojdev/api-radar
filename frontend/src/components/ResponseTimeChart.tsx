import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {"id":129,"statusCode":421,"responseTime":154,"timestamp":"2025-07-30T18:06:02.524Z","apiId":1},{"id":131,"statusCode":421,"responseTime":151,"timestamp":"2025-07-30T18:07:03.927Z","apiId":1},{"id":135,"statusCode":421,"responseTime":118,"timestamp":"2025-07-30T18:08:03.757Z","apiId":1},{"id":139,"statusCode":421,"responseTime":450,"timestamp":"2025-07-30T18:09:03.904Z","apiId":1},{"id":141,"statusCode":421,"responseTime":166,"timestamp":"2025-07-30T18:10:01.739Z","apiId":1},{"id":144,"statusCode":421,"responseTime":206,"timestamp":"2025-07-30T18:11:03.737Z","apiId":1},{"id":147,"statusCode":421,"responseTime":149,"timestamp":"2025-07-30T18:12:03.410Z","apiId":1},{"id":150,"statusCode":421,"responseTime":254,"timestamp":"2025-07-30T18:13:03.429Z","apiId":1},{"id":153,"statusCode":421,"responseTime":166,"timestamp":"2025-07-30T18:14:00.256Z","apiId":1},{"id":157,"statusCode":421,"responseTime":335,"timestamp":"2025-07-30T18:15:03.535Z","apiId":1},{"id":159,"statusCode":421,"responseTime":223,"timestamp":"2025-07-30T18:16:03.733Z","apiId":1},{"id":162,"statusCode":421,"responseTime":134,"timestamp":"2025-07-30T18:17:03.594Z","apiId":1},{"id":165,"statusCode":421,"responseTime":185,"timestamp":"2025-07-30T18:18:04.040Z","apiId":1},{"id":169,"statusCode":421,"responseTime":391,"timestamp":"2025-07-30T18:19:02.236Z","apiId":1},{"id":170,"statusCode":421,"responseTime":172,"timestamp":"2025-07-30T18:20:04.397Z","apiId":1},{"id":174,"statusCode":421,"responseTime":156,"timestamp":"2025-07-30T18:21:04.372Z","apiId":1},{"id":176,"statusCode":421,"responseTime":212,"timestamp":"2025-07-30T18:22:04.543Z","apiId":1},{"id":179,"statusCode":421,"responseTime":118,"timestamp":"2025-07-30T18:23:02.507Z","apiId":1},{"id":184,"statusCode":421,"responseTime":339,"timestamp":"2025-07-30T18:24:04.765Z","apiId":1},{"id":185,"statusCode":421,"responseTime":172,"timestamp":"2025-07-30T18:25:04.779Z","apiId":1},{"id":189,"statusCode":421,"responseTime":268,"timestamp":"2025-07-30T18:26:04.743Z","apiId":1},{"id":192,"statusCode":421,"responseTime":117,"timestamp":"2025-07-30T18:27:02.324Z","apiId":1},{"id":195,"statusCode":421,"responseTime":172,"timestamp":"2025-07-30T18:28:04.292Z","apiId":1},{"id":197,"statusCode":421,"responseTime":142,"timestamp":"2025-07-30T18:29:04.271Z","apiId":1},{"id":200,"statusCode":421,"responseTime":140,"timestamp":"2025-07-30T18:30:04.509Z","apiId":1},{"id":204,"statusCode":421,"responseTime":155,"timestamp":"2025-07-30T18:31:02.419Z","apiId":1},{"id":207,"statusCode":421,"responseTime":171,"timestamp":"2025-07-30T18:32:04.338Z","apiId":1},{"id":210,"statusCode":421,"responseTime":132,"timestamp":"2025-07-30T18:33:03.904Z","apiId":1},{"id":213,"statusCode":421,"responseTime":127,"timestamp":"2025-07-30T18:34:04.047Z","apiId":1},{"id":216,"statusCode":421,"responseTime":220,"timestamp":"2025-07-30T18:35:00.306Z","apiId":1}
];

export default function ResponseTimeChart() {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
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
        <Tooltip labelFormatter={formatDate} formatter={(value: number, name: string) => [`Response Time: ${value}ms`]} />
        <Bar dataKey="responseTime" fill="#8884d8" activeBar={<Rectangle fill="#8884d8" stroke="#7c7a9eff" />} />
      </BarChart>
    </ResponsiveContainer>
  );
}