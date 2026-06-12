import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AddApplication() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    job_link: "",
    status: "Applied",
    applied_date: "",
    resume: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/applications/", form);
      navigate("/applications");
    } catch (err) {
      console.error(err);
      alert("Failed to add application");
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h1 style={{ marginBottom: '2rem' }}>Add Application</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company *</label>
            <input name="company" placeholder="e.g. Google" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Role *</label>
            <input name="role" placeholder="e.g. Frontend Developer" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input name="location" placeholder="e.g. Remote / New York" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Job Link</label>
            <input name="job_link" type="url" placeholder="https://..." onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Applied Date *</label>
            <input type="date" name="applied_date" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Applied">Applied</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Rejected">Rejected</option>
              <option value="Selected">Selected</option>
            </select>
          </div>

          <div className="form-group">
            <label>Resume Version Used</label>
            <input name="resume" placeholder="e.g. Resume_v1.pdf" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea name="notes" placeholder="General notes about this role..." rows={4} onChange={handleChange}></textarea>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="submit" style={{ flex: 1 }}>Save Application</button>
            <button type="button" className="danger" style={{ flex: 1 }} onClick={() => navigate('/applications')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddApplication;