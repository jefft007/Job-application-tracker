import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

  const fetchApplications = async () => {
    try {
      const res = await API.get(`/applications/?t=${new Date().getTime()}`);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const deleteApplication = async (id) => {
    if(window.confirm('Are you sure you want to delete this application?')) {
      await API.delete(`/applications/${id}/`);
      fetchApplications();
    }
  };

  const filtered = applications.filter((app) =>
    app.company.toLowerCase().includes(search.toLowerCase()) ||
    app.role.toLowerCase().includes(search.toLowerCase()) ||
    app.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Applications</h1>
        <Link to="/add">
          <button>+ Add Application</button>
        </Link>
      </div>

      <div className="form-group" style={{ maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Search company, role, status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3 style={{ color: 'var(--text-secondary)' }}>No applications found.</h3>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Location</th>
                <th>Applied Date</th>
                <th>Status</th>
                <th>Resume</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id}>
                  <td>
                    <strong>{app.company}</strong>
                    {app.job_link && (
                      <a href={app.job_link} target="_blank" rel="noreferrer" style={{ display: 'block', fontSize: '0.8rem', marginTop: '4px' }}>
                        Job Link ↗
                      </a>
                    )}
                  </td>
                  <td>{app.role}</td>
                  <td>{app.location}</td>
                  <td>{app.applied_date}</td>
                  <td>
                    <span className={`status-badge status-${app.status.replace(' ', '')}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>{app.resume || <span style={{color: 'var(--text-secondary)'}}>N/A</span>}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to={`/edit/${app.id}`}>
                        <button style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Edit</button>
                      </Link>
                      <button className="danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => deleteApplication(app.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ApplicationList;