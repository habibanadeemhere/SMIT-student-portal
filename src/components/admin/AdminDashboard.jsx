import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { Link } from "react-router-dom";
import './AdminDashboard.css'
import Logo from '../../assets/logo.png'

export default function AdminDashboard() {

  const [users, setUsers] = useState(0);
  const [complaints, setComplaints] = useState(0);
  const [lost, setLost] = useState(0);
  const [volunteers, setVolunteers] = useState(0);

  const fetchData = async () => {
    const { data: usersData } = await supabase.from("profiles").select("*");
    const { data: complaintsData } = await supabase.from("complaints").select("*");
    const { data: lostData } = await supabase.from("Lost_Found").select("*");
    const { data: volunteersData } = await supabase.from("volunteers").select("*");

    setUsers(usersData ? usersData.length : 0);
    setComplaints(complaintsData ? complaintsData.length : 0);
    setLost(lostData ? lostData.length : 0);
    setVolunteers(volunteersData ? volunteersData.length : 0);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cards = [
    {
      to: "/admin/users",
      count: users,
      label: "Total Users",
      icon: (
        <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      accent: "#0057a8",
      lightBg: "#eef5ff",
      border: "#c0d8f5",
      tag: "Registered",
      gradient: "linear-gradient(135deg,#0057a8,#0071cc)",
      shadow: "rgba(0,87,168,0.28)",
    },
    {
      to: "/admin/complaints",
      count: complaints,
      label: "Total Complaints",
      icon: (
        <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
      accent: "#dc2626",
      lightBg: "#fff5f5",
      border: "#fca5a5",
      tag: "Reported",
      gradient: "linear-gradient(135deg,#dc2626,#ef4444)",
      shadow: "rgba(220,38,38,0.25)",
    },
    {
      to: "/admin/lostfound",
      count: lost,
      label: "Lost Items",
      icon: (
        <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" />
        </svg>
      ),
      accent: "#66b032",
      lightBg: "#f0f9e8",
      border: "#c8e8a0",
      tag: "Tracked",
      gradient: "linear-gradient(135deg,#66b032,#4a9e1a)",
      shadow: "rgba(102,176,50,0.28)",
    },
    {
      to: "/admin/volunteers",
      count: volunteers,
      label: "Volunteers",
      icon: (
        <svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      accent: "#7c3aed",
      lightBg: "#f5eeff",
      border: "#d8c0f5",
      tag: "Active",
      gradient: "linear-gradient(135deg,#7c3aed,#9d5cf0)",
      shadow: "rgba(124,58,237,0.25)",
    },
  ];

  return (
    <>
    

      <div className="adm-root">
        <div className="adm-top-accent" />

    
        <div className="adm-header">
          <div className="adm-header-inner">
            <div className="adm-logo-ring">
              <img src= {Logo} alt="Saylani" />
            </div>
            <div>
              <div className="adm-header-title">SAYLANI</div>
              <div className="adm-header-sub">Welfare Trust</div>
            </div>
            <div className="adm-divider-v" />
            <div className="adm-smit-badge">
              <div className="adm-smit-dot" />
              <span className="adm-smit-label">SMIT</span>
            </div>
            <div className="adm-admin-badge">
              <div className="adm-admin-dot" />
              <span className="adm-admin-label">Admin Panel</span>
            </div>
          </div>
        </div>

        
        <div className="adm-main">

         
          <div className="adm-hero">
            <div className="adm-hero-eyebrow">
              <div className="adm-hero-eyedot" />
              <span style={{fontSize:11,fontWeight:700,color:'#0057a8',letterSpacing:'0.2em',textTransform:'uppercase'}}>Control Center</span>
            </div>
            <h1 className="adm-hero-title">Admin <span>Dashboard</span></h1>
            <p className="adm-hero-sub">Monitor and manage all portal activity from one place.</p>
            <div className="adm-glow-sep" />
          </div>

       
          <div className="adm-cards-grid">
            {cards.map((card, i) => (
              <Link to={card.to} key={card.to} className="adm-card" style={{animationDelay:`${i*0.1}s`}}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 24px 50px ${card.shadow}`; e.currentTarget.style.borderColor = card.accent; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,87,168,0.07)'; e.currentTarget.style.borderColor = '#e4edf8'; }}
              >
                <div className="adm-card-shimmer" />
                <div className="adm-card-top" style={{background: card.gradient}} />

                <div className="adm-card-icon-wrap" style={{background: card.lightBg, border:`1.5px solid ${card.border}`}}>
                  <span style={{color: card.accent}}>{card.icon}</span>
                </div>

                <div className="adm-card-count" style={{color: card.accent}}>{card.count}</div>
                <div className="adm-card-label">{card.label}</div>

                <div className="adm-card-footer">
                  <span className="adm-card-tag" style={{background: card.lightBg, color: card.accent, borderColor: card.border}}>
                    {card.tag}
                  </span>
                  <span className="adm-card-arrow" style={{color: card.accent}}>
                    View all
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          
          <div className="adm-bottom">

         
            <div className="adm-info-card">
              <div className="adm-info-title">
                <div className="adm-info-title-icon">
                  <svg width="15" height="15" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>
                  </svg>
                </div>
                Quick Navigation
              </div>
              {[
                { to:"/admin/users", label:"Manage Users", dot:"#0057a8" },
                { to:"/admin/complaints", label:"View Complaints", dot:"#dc2626" },
                { to:"/admin/lostfound", label:"Lost & Found Items", dot:"#66b032" },
                { to:"/admin/volunteers", label:"Volunteer List", dot:"#7c3aed" },
              ].map(link => (
                <Link to={link.to} key={link.to} className="adm-quick-link">
                  <div className="adm-quick-link-left">
                    <div className="adm-quick-dot" style={{background: link.dot}} />
                    <span className="adm-quick-label">{link.label}</span>
                  </div>
                  <svg className="adm-quick-arrow" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </Link>
              ))}
            </div>

       
            <div className="adm-info-card">
              <div className="adm-info-title">
                <div className="adm-info-title-icon">
                  <svg width="15" height="15" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
                  </svg>
                </div>
                Portal Overview
              </div>
              {[
                { label:"Registered Users", count: users, accent:"#0057a8", bg:"#eef5ff", border:"#c0d8f5" },
                { label:"Active Complaints", count: complaints, accent:"#dc2626", bg:"#fff5f5", border:"#fca5a5" },
                { label:"Lost & Found Reports", count: lost, accent:"#66b032", bg:"#f0f9e8", border:"#c8e8a0" },
                { label:"Volunteers Registered", count: volunteers, accent:"#7c3aed", bg:"#f5eeff", border:"#d8c0f5" },
              ].map((row, i) => (
                <div className="adm-activity-row" key={i}>
                  <div className="adm-activity-icon" style={{background: row.bg, border:`1px solid ${row.border}`}}>
                    <div style={{width:8,height:8,borderRadius:'50%',background:row.accent}} />
                  </div>
                  <span className="adm-activity-text"><strong>{row.label}</strong></span>
                  <span className="adm-activity-count" style={{color: row.accent}}>{row.count}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}