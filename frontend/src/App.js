import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function App() {
  const [usageData, setUsageData] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/water-usage')
      .then(res => res.json())
      .then(data => setUsageData(data));

    fetch('http://localhost:5000/api/leaks')
      .then(res => res.json())
      .then(data => setAlerts(data));
  }, []);

  const chartData = {
    labels: usageData.map(d => d.timestamp),
    datasets: [{
      label: 'Water Usage (Liters)',
      data: usageData.map(d => d.usage),
      fill: false,
      borderColor: 'blue',
      tension: 0.1
    }]
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Water Usage Dashboard</h1>
      <Line data={chartData} />

      <h2 className="text-xl mt-8 mb-2">Leak Alerts</h2>
      <ul className="list-disc ml-6">
        {alerts.map((a, i) => (
          <li key={i}>{a.zone}: {a.alert}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
