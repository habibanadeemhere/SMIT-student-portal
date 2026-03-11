import React from 'react'
import { useState } from 'react'
import { supabase } from '../../supabase'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import './Login.css'

const admin_email = "admin@smit.com"
const admin_password = "admin123@"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (email === admin_email && password === admin_password) {
      navigate('/admin-dashboard')
      return
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { alert(error.message); return }
    navigate('/student-dashboard')
  }

  return (
    <>
   

      <div className="login-root">
        <div className="login-blob-1" />
        <div className="login-blob-2" />
        <div className="login-top-accent" />

        <div className="login-card">
          <div className="login-card-top-bar" />

        
          <div className="login-logo-wrap">
            <div className="login-logo-ring">
              <img src={Logo} alt="SMIT Logo" />
            </div>
            <div>
              <div className="login-brand">SAYLANI WELFARE</div>
              <div className="login-brand-sub">SMIT Student Portal</div>
            </div>
          </div>

          
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to access your student portal</p>
          <div className="login-sep" />

         
          <form onSubmit={handleLogin}>

            <div className="login-field">
              <label className="login-label">
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                </svg>
                Email
              </label>
              <div className="login-input-wrap">
                <span className="login-input-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="login-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="login-field">
              <label className="login-label">
                <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                </svg>
                Password
              </label>
              <div className="login-input-wrap">
                <span className="login-input-icon">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                  </svg>
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" className="login-pass-toggle" onClick={() => setShowPass(!showPass)}>
                  {showPass
                    ? <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
                    : <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  }
                </button>
              </div>
            </div>

            <button className="login-btn">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
              </svg>
              Login
            </button>

          </form>

          
          <div className="login-hint">
            <div className="login-hint-icon">
              <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
              </svg>
            </div>
            <div className="login-hint-text">
              Admin access is available for authorized staff only.<br/>
              Students use their registered email to log in.
            </div>
          </div>

          
          <div className="login-divider">
            <div className="login-divider-line" />
            <span className="login-divider-text">new here?</span>
            <div className="login-divider-line" />
          </div>

          
          <p className="login-footer">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")} className="login-signup-link">
              Sign Up →
            </span>
          </p>

         
          <div className="login-trust">
            <div className="login-trust-item"><div className="login-trust-dot" style={{background:'#0057a8'}} /><span>Secure Login</span></div>
            <div className="login-trust-item"><div className="login-trust-dot" style={{background:'#66b032'}} /><span>Verified</span></div>
            <div className="login-trust-item"><div className="login-trust-dot" style={{background:'#0057a8'}} /><span>24/7 Access</span></div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Login