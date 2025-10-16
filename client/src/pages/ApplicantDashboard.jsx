import React, { useEffect, useState } from 'react';
import API, { setAuth } from '../api';

function loadAuth() {
  const t = localStorage.getItem('token');
  if (t) setAuth(t);
}

function StatusPill({ status }) {
  const color = status === 'Applied' || status === 'Pending' ? 'orange' : status === 'Offer' || status === 'Accepted' ? 'green' : status === 'Reviewed' || status === 'Interview' ? 'blue' : 'red';
  const style = { padding: '2px 8px', borderRadius: 12, background: `${color}20`, color: color, fontWeight: 600 };
  return <span style={style}>{status || 'N/A'}</span>;
}

export default function ApplicantDashboard() {
  const [apps, setApps] = useState([]);
  const [title, setTitle] = useState('');
  const [roleType, setRoleType] = useState('tech');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuth();
    fetchApps();
    const i = setInterval(fetchApps, 5000);
    return () => clearInterval(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchApps() {
    setLoading(true);
    try {
      const res = await API.get('/applications/my');
      setApps(res.data || []);
    } catch (err) {
      console.error('Failed to fetch applications', err);
    } finally {
      setLoading(false);
    }
  }

  async function createApp(e) {
    e.preventDefault();
    try {
      const applicantId = null; // server will use authenticated user when present
      await API.post('/applications', { title, roleType, resume: '-' , applicantId });
      setTitle('');
      fetchApps();
    } catch (err) {
      console.error(err);
      alert('Failed to create application');
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Applicant Dashboard</h2>

      <form onSubmit={createApp} style={{ marginBottom: 20, display: 'flex', gap: 8, alignItems: 'center' }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder='Role title' />
        <select value={roleType} onChange={e => setRoleType(e.target.value)}>
          <option value='tech'>Tech</option>
          <option value='non-tech'>Non-Tech</option>
        </select>
        <button>Create Application</button>
      </form>

      <h3>Your Applications</h3>

      {loading ? (
        <p>Loading applications...</p>
      ) : apps.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div>
          {apps.map(a => (
            <div key={a._id} style={{ border: '1px solid #eee', padding: 12, borderRadius: 8, marginBottom: 12, background: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{a.title || 'Untitled'}</div>
                  <div style={{ color: '#666', fontSize: 13 }}>{a.roleType} • Applied on {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : 'Unknown'}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <StatusPill status={a.status} />
                </div>
              </div>

              <div style={{ marginTop: 8, color: '#444' }}>
                <div>Applicant: {a.applicant?.name || a.applicant?.email || 'You'}</div>
                <div>Resume: {a.resume ? <a href={a.resume} target='_blank' rel='noreferrer'>View</a> : 'Not provided'}</div>
              </div>

              <details style={{ marginTop: 8 }}>
                <summary style={{ cursor: 'pointer' }}>History ({a.history?.length || 0})</summary>
                <ul style={{ marginTop: 8 }}>
                  {a.history?.map((h, idx) => (
                    <li key={idx} style={{ fontSize: 13, color: '#333', marginBottom: 6 }}>
                      <strong>[{h.by}]</strong> {h.status} — {h.note} <span style={{ color: '#666' }}>({h.at ? new Date(h.at).toLocaleString() : 'time unknown'})</span>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))}
        </div>
      )}

      <div className="footer-logo" style={{ marginTop: 18 }}>
        6S Consulting <img src="/logo.png" alt="logo" style={{ width: 20, height: 20, marginLeft: 6 }} />
      </div>
    </div>
  );
}
