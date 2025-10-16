import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import API, { setAuth } from '../api';

export default function LoginPage(){
  const [email,setEmail]=useState('admin@6s.com');
  const [password,setPassword]=useState('password');
  const [role,setRole]=useState('admin');
  const nav = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    try{
      const res = await API.post('/auth/login', {email,password,role});
      setAuth(res.data.token);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', role);
      if(role==='admin') nav('/admin');
      if(role==='botmimic') nav('/botmimic');
      if(role==='applicant') nav('/applicant');
    }catch(err){ alert(err.response?.data?.msg || 'Login failed'); }
  };

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',flexDirection:'column'}}>
      <h1>Hybrid Application Tracking System</h1>
      <form onSubmit={submit} style={{display:'grid',gap:8,width:320}}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='email' />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder='password' type='password' />
        <div>
          <label><input type='radio' checked={role==='applicant'} onChange={()=>setRole('applicant')} /> Applicant</label>
          <label style={{marginLeft:8}}><input type='radio' checked={role==='botmimic'} onChange={()=>setRole('botmimic')} /> BotMimic</label>
          <label style={{marginLeft:8}}><input type='radio' checked={role==='admin'} onChange={()=>setRole('admin')} /> Admin</label>
        </div>
        <button type='submit'>Login</button>
      </form>
      <a href="/signup">Sign up</a>
      <div className="footer-logo">
      6S Consulting <img src="/logo.png" alt="logo" />
    </div>
    </div>
  );
}
