import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import "./Complaints.css"
import Logo from "../../assets/logo.png";

export default function ComplaintsAdmin() {

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchComplaints = async () => {
    const { data } = await supabase
      .from("complaints")
      .select("*")
      .order("created_at", { ascending: false });
    setComplaints(data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const filtered = complaints?.filter(c => {
    const matchSearch =
      c.username?.toLowerCase().includes(search.toLowerCase()) ||
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.campus?.toLowerCase().includes(search.toLowerCase()) ||
      c.category?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || c.status === filter;
    return matchSearch && matchFilter;
  });

  const statusStyle = (status) => {
    if (status === "resolved") return { bg:"#f0f9e8", color:"#3a8a10", border:"#c8e8a0" };
    if (status === "submitted") return { bg:"#eef5ff", color:"#0057a8", border:"#c0d8f5" };
    if (status === "pending") return { bg:"#fff8e8", color:"#b07800", border:"#f0d890" };
    return { bg:"#f4f7fb", color:"#7a8fa8", border:"#e4edf8" };
  };

  return (
    <>
     

      <div className="ca-root">
        <div className="ca-top-accent" />

     
        <div className="ca-header">
          <div className="ca-header-inner">
            <div className="ca-logo-ring">
              <img src={Logo} alt="Saylani" />
            </div>
            <div>
              <div className="ca-header-title">SAYLANI</div>
              <div className="ca-header-sub">Welfare Trust</div>
            </div>
            <div className="ca-divider-v" />
            <div className="ca-smit-badge">
              <div className="ca-smit-dot" />
              <span className="ca-smit-label">SMIT</span>
            </div>
            <div className="ca-admin-badge">
              <div className="ca-admin-dot" />
              <span className="ca-admin-label">Admin Panel</span>
            </div>
          </div>
        </div>

   
        <div className="ca-main">

      
          <div className="ca-hero">
            <div className="ca-hero-eyebrow">
              <div className="ca-hero-eyedot" />
              <span style={{fontSize:11,fontWeight:700,color:'#0057a8',letterSpacing:'0.2em',textTransform:'uppercase'}}>Admin · Complaints</span>
            </div>
            <h1 className="ca-hero-title">All <span>Complaints</span></h1>
            <p className="ca-hero-sub">Monitor and manage all student complaints across campuses.</p>
            <div className="ca-glow-sep" />
          </div>

          
          <div className="ca-stats">
            {[
              { label:"Total", num: complaints?.length||0, accent:"#0057a8", bg:"#eef5ff", border:"#c0d8f5", icon:<svg width="16" height="16" fill="none" stroke="#0057a8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"/></svg> },
              { label:"Submitted", num: complaints?.filter(c=>c.status==="submitted").length||0, accent:"#0057a8", bg:"#eef5ff", border:"#c0d8f5", icon:<svg width="16" height="16" fill="none" stroke="#0057a8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg> },
              { label:"Resolved", num: complaints?.filter(c=>c.status==="resolved").length||0, accent:"#3a8a10", bg:"#f0f9e8", border:"#c8e8a0", icon:<svg width="16" height="16" fill="none" stroke="#3a8a10" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
              { label:"Pending", num: complaints?.filter(c=>c.status==="pending").length||0, accent:"#b07800", bg:"#fff8e8", border:"#f0d890", icon:<svg width="16" height="16" fill="none" stroke="#b07800" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
            ].map(s => (
              <div className="ca-stat" key={s.label} style={{borderColor:s.border}}>
                <div className="ca-stat-icon" style={{background:s.bg,border:`1px solid ${s.border}`}}>{s.icon}</div>
                <div>
                  <div className="ca-stat-num" style={{color:s.accent}}>{s.num}</div>
                  <div className="ca-stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

         
          <div className="ca-toolbar">
            <div className="ca-search-wrap">
              <span className="ca-search-icon">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"/>
                </svg>
              </span>
              <input className="ca-search" placeholder="Search by student, title, campus or category..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="ca-filters">
              {["All","submitted","resolved","pending"].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`ca-tab ca-tab-${f} ${filter===f?'active':''}`}>
                  {f==="resolved"?"✅":f==="pending"?"⏳":f==="submitted"?"📋":"📊"} {f.charAt(0).toUpperCase()+f.slice(1)}
                </button>
              ))}
            </div>
            <button className="ca-refresh-btn" onClick={fetchComplaints}>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
              </svg>
              Refresh
            </button>
          </div>

          
          <div className="ca-table-card">
            {!filtered || filtered.length === 0 ? (
              <div className="ca-empty">
                <div className="ca-empty-icon">
                  <svg width="28" height="28" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                  </svg>
                </div>
                <div className="ca-empty-title">No Complaints Found</div>
                <div style={{fontSize:13}}>Try adjusting your search or filter.</div>
              </div>
            ) : (
              <table className="ca-table">
                <thead className="ca-thead">
                  <tr>
                    <th className="ca-th" style={{width:50}}>#</th>
                    <th className="ca-th"><span className="ca-th-icon"><svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>Student</span></th>
                    <th className="ca-th"><span className="ca-th-icon"><svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>Campus</span></th>
                    <th className="ca-th"><span className="ca-th-icon"><svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"/></svg>Title</span></th>
                    <th className="ca-th"><span className="ca-th-icon"><svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Status</span></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered?.map((c, idx) => {
                    const sc = statusStyle(c.status);
                    return (
                      <tr key={c.id} className="ca-tr">
                        <td className="ca-td"><span className="ca-row-num">{String(idx+1).padStart(2,'0')}</span></td>
                        <td className="ca-td">
                          <div className="ca-user-cell">
                            <div className="ca-avatar">{c.username?.charAt(0)?.toUpperCase()||"S"}</div>
                            <span className="ca-username">{c.username||"—"}</span>
                          </div>
                        </td>
                        <td className="ca-td">
                          <span className="ca-campus-badge">
                            <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                            {c.campus||"—"}
                          </span>
                        </td>
                        <td className="ca-td">
                          <div className="ca-title-cell">{c.title||"—"}</div>
                          {c.category && <div className="ca-cat-chip">🏷️ {c.category}</div>}
                        </td>
                        <td className="ca-td">
                          <span className="ca-status" style={{background:sc.bg,color:sc.color,borderColor:sc.border}}>
                            <div className="ca-status-dot" style={{background:sc.color}}/>
                            {c.status||"—"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </>
  );
}