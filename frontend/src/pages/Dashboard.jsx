import { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import API from "../services/api";

const COLORS = ['#3b82f6', '#f59e0b', '#ef4444', '#10b981'];

function Dashboard() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    API.get(`/applications/?t=${new Date().getTime()}`).then((res) => setApps(res.data)).catch(err => console.error(err));
  }, []);

  const applied = apps.filter((a) => a.status === "Applied").length;
  const interview = apps.filter((a) => a.status === "Interview Scheduled").length;
  const rejected = apps.filter((a) => a.status === "Rejected").length;
  const selected = apps.filter((a) => a.status === "Selected").length;

  const chartData = [
    { name: "Applied", value: applied },
    { name: "Interview", value: interview },
    { name: "Rejected", value: rejected },
    { name: "Selected", value: selected },
  ];

  // Applications per month
  const appsPerMonth = apps.reduce((acc, curr) => {
    const month = new Date(curr.applied_date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.keys(appsPerMonth).map(key => ({ name: key, applications: appsPerMonth[key] }));

  // Reminders
  const reminders = apps.filter(a => a.needs_follow_up);

  return (
    <div className="container">
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Dashboard Overview</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Track your job application progress</p>
        </div>
      </header>

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-label">Total Applications</div>
          <div className="stat-value">{apps.length}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label" style={{color: '#60a5fa'}}>Applied</div>
          <div className="stat-value" style={{background: 'none', WebkitTextFillColor: '#60a5fa'}}>{applied}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label" style={{color: '#fbbf24'}}>Interview Scheduled</div>
          <div className="stat-value" style={{background: 'none', WebkitTextFillColor: '#fbbf24'}}>{interview}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label" style={{color: '#f87171'}}>Rejected</div>
          <div className="stat-value" style={{background: 'none', WebkitTextFillColor: '#f87171'}}>{rejected}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label" style={{color: '#34d399'}}>Selected</div>
          <div className="stat-value" style={{background: 'none', WebkitTextFillColor: '#34d399'}}>{selected}</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="card chart-card">
          <h3>Applications by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} label>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card chart-card">
          <h3>Applications per Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="name" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderRadius: '8px' }} />
              <Bar dataKey="applications" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {reminders.length > 0 && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <h3>Follow-up Reminders ({reminders.length})</h3>
          <ul className="reminder-list">
            {reminders.map(app => (
              <li key={app.id} className="reminder-item">
                <strong>{app.company}</strong> - {app.role} <br />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Applied on: {app.applied_date} (No response for 7+ days)
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dashboard;