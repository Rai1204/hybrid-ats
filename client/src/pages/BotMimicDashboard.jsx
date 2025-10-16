import React, {useEffect, useState} from 'react';
import API, { setAuth } from '../api';

function loadAuth(){ const t = localStorage.getItem('token'); if(t) setAuth(t); }

export default function BotMimicDashboard(){
  const [apps,setApps] = useState([]);

  useEffect(()=>{ loadAuth(); fetchAll(); },[]);

  async function fetchAll(){
    try{
      const res = await API.get('/applications/all');
      setApps(res.data);
    }catch(err){ console.error(err); }
  }

  async function triggerProgress(){
    try{
      await API.post('/applications/botmimic/progress');
      fetchAll();
    }catch(err){ console.error(err); }
  }

  return (
    <div style={{padding:20}}>
      <h2>BotMimic Dashboard</h2>
      <button onClick={triggerProgress}>Trigger Automated Progress</button>
      <h3>Tech Applications</h3>
      <ul>
        {apps.map(a=>(
          <li key={a._id}><strong>{a.title}</strong> — <em>{a.status}</em>
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
