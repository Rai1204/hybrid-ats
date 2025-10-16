import React, {useEffect, useState} from 'react';
import API, { setAuth } from '../api';
function loadAuth(){ const t = localStorage.getItem('token'); if(t) setAuth(t); }

export default function AdminDashboard(){
  const [apps,setApps]=useState([]);
  useEffect(()=>{ loadAuth(); fetchAll(); },[]);

  async function fetchAll(){
    try{ const res = await API.get('/applications/all'); setApps(res.data); }catch(e){ console.error(e); }
  }

  async function updateStatus(id,status){
    try{ await API.put(`/applications/${id}/status`, {status, note: 'Updated by admin'}); fetchAll(); }catch(e){ console.error(e); }
  }

  return (
    <div style={{padding:20}}>
      <h2>Admin Dashboard (Non-Tech)</h2>
      <ul>
        {apps.map(a=>(
          <li key={a._id}><strong>{a.title}</strong> — <em>{a.status}</em>
            <div>
              <button onClick={()=>updateStatus(a._id,'Reviewed')}>Mark Reviewed</button>
              <button onClick={()=>updateStatus(a._id,'Interview')}>Mark Interview</button>
            </div>
            <div>
              {a.history?.map((h,idx)=>(<div key={idx}>{new Date(h.at).toLocaleString()} [{h.by}] {h.status} — {h.note}</div>))}
            </div>
          </li>
        ))}
      </ul>
      <div className="footer-logo">
      6S Consulting <img src="/logo.png" alt="logo" />
    </div>
    </div>
    
  )
  
}
