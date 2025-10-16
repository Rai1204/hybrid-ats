import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
export default function SignupPage(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [role,setRole]=useState('applicant');
  const nav = useNavigate();

  const submit = async (e)=>{
    e.preventDefault();
    try{
      await API.post('/auth/signup',{name,email,password,role});
      alert('Created. Now login.');
      nav('/');
    }catch(err){ alert(err.response?.data?.msg || 'Signup failed'); }
  };

  return (
    <div style={{padding:40}}>
      <h2>Signup</h2>
      <form onSubmit={submit} style={{display:'grid',gap:8,width:360}}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder='name' />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder='email' />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder='password' type='password' />
        <div>
          <label><input type='radio' checked={role==='applicant'} onChange={()=>setRole('applicant')} /> Applicant</label>
          <label style={{marginLeft:8}}><input type='radio' checked={role==='botmimic'} onChange={()=>setRole('botmimic')} /> BotMimic</label>
          <label style={{marginLeft:8}}><input type='radio' checked={role==='admin'} onChange={()=>setRole('admin')} /> Admin</label>
        </div>
        <button>Create</button>
      </form>
      <div className="footer-logo">
      6S Consulting <img src="/logo.png" alt="logo" />
    </div>
    </div>
  )
}
