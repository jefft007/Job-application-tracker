import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditApplication() {
  const { id } = useParams();
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
    interview_notes: "",
  });

  useEffect(() => {
    API.get(`/applications/${id}/?t=${new Date().getTime()}`).then((res) => {
      setForm({
        ...res.data,
        job_link: res.data.job_link || "",
        resume: res.data.resume || "",
        notes: res.data.notes || "",
        interview_notes: res.data.interview_notes || "",
      });
    }).catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/applications/${id}/`, form);
      navigate("/applications");
    } catch (err) {
      console.error(err);
      alert("Failed to update application");
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h1 style={{ marginBottom: '2rem' }}>Edit Application</h1>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company *</label>
            <input name="company" value={form.company} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Role *</label>
            <input name="role" value={form.role} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input name="location" value={form.location} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Job Link</label>
            <input name="job_link" type="url" value={form.job_link} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Applied Date *</label>
            <input type="date" name="applied_date" value={form.applied_date} onChange={handleChange} required />
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
            <input name="resume" value={form.resume} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>General Notes</label>
            <textarea name="notes" value={form.notes} rows={3} onChange={handleChange}></textarea>
          </div>

          <div className="form-group">
            <label>Interview Notes (Round 1, Round 2...)</label>
            <textarea name="interview_notes" value={form.interview_notes} rows={5} placeholder="E.g. Round 1: Asked Angular lifecycle hooks..." onChange={handleChange}></textarea>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button type="submit" style={{ flex: 1 }}>Update Application</button>
            <button type="button" className="danger" style={{ flex: 1 }} onClick={() => navigate('/applications')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditApplication;