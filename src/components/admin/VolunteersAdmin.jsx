import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import "./Volunteer.css"
import Logo from "../../assets/logo.png";

export default function VolunteersAdmin() {

  const [volunteers, setVolunteers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterAvail, setFilterAvail] = useState("All");

  const fetchVolunteers = async () => {
    const { data } = await supabase.from("volunteers").select("*");
    setVolunteers(data);
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const filtered = volunteers?.filter(v => {
    const matchSearch =
      v.username?.toLowerCase().includes(search.toLowerCase()) ||
      v.campus?.toLowerCase().includes(search.toLowerCase()) ||
      v.phone?.toLowerCase().includes(search.toLowerCase()) ||
      v.event_name?.toLowerCase().includes(search.toLowerCase());
    const matchAvail = filterAvail === "All" || v.availability === filterAvail;
    return matchSearch && matchAvail;
  });

  const availStyle = (a) => {
    if (a === "Morning")   return { bg:"#fff8e8", color:"#b07800", border:"#f0d890", emoji:"🌅" };
    if (a === "Afternoon") return { bg:"#eef5ff", color:"#0057a8", border:"#c0d8f5", emoji:"☀️" };
    if (a === "Evening")   return { bg:"#f5eeff", color:"#7c3aed", border:"#d8c0f5", emoji:"🌙" };
    return { bg:"#f4f7fb", color:"#7a8fa8", border:"#e4edf8", emoji:"🕐" };
  };

  return (
    <>
    

      <div className="va-root">
        <div className="va-top-accent" />

        
        <div className="va-header">
          <div className="va-header-inner">
            <div className="va-logo-ring">
              <img src={Logo} alt="Saylani" />
            </div>
            <div>
              <div className="va-header-title">SAYLANI</div>
              <div className="va-header-sub">Welfare Trust</div>
            </div>
            <div className="va-divider-v" />
            <div className="va-smit-badge">
              <div className="va-smit-dot" />
              <span className="va-smit-label">SMIT</span>
            </div>
            <div className="va-admin-badge">
              <div className="va-admin-dot" />
              <span className="va-admin-label">Admin Panel</span>
            </div>
          </div>
        </div>

        
        <div className="va-main">

          
          <div className="va-hero">
            <div className="va-hero-eyebrow">
              <div className="va-hero-eyedot" />
              <span style={{fontSize:11,fontWeight:700,color:'#0057a8',letterSpacing:'0.2em',textTransform:'uppercase'}}>Admin · Volunteers</span>
            </div>
            <h1 className="va-hero-title">Registered <span>Volunteers</span></h1>
            <p className="va-hero-sub">View and manage all volunteers registered for Saylani events.</p>
            <div className="va-glow-sep" />
          </div>

          
          <div className="va-stats">
            {[
              { label:"Total",     num: volunteers?.length||0,                                        accent:"#0057a8", bg:"#eef5ff", border:"#c0d8f5", emoji:"👥" },
              { label:"Morning",   num: volunteers?.filter(v=>v.availability==="Morning").length||0,   accent:"#b07800", bg:"#fff8e8", border:"#f0d890", emoji:"🌅" },
              { label:"Afternoon", num: volunteers?.filter(v=>v.availability==="Afternoon").length||0, accent:"#0057a8", bg:"#eef5ff", border:"#c0d8f5", emoji:"☀️" },
              { label:"Evening",   num: volunteers?.filter(v=>v.availability==="Evening").length||0,   accent:"#7c3aed", bg:"#f5eeff", border:"#d8c0f5", emoji:"🌙" },
            ].map(s => (
              <div className="va-stat" key={s.label} style={{borderColor:s.border}}>
                <div className="va-stat-icon" style={{background:s.bg,border:`1px solid ${s.border}`}}>{s.emoji}</div>
                <div>
                  <div className="va-stat-num" style={{color:s.accent}}>{s.num}</div>
                  <div className="va-stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="va-toolbar">
            <div className="va-search-wrap">
              <span className="va-search-icon">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"/>
                </svg>
              </span>
              <input className="va-search" placeholder="Search by name, campus, phone or event..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="va-filters">
              {[
                { val:"All",       label:"📊 All",       cls:"va-tab-all" },
                { val:"Morning",   label:"🌅 Morning",   cls:"va-tab-morning" },
                { val:"Afternoon", label:"☀️ Afternoon", cls:"va-tab-afternoon" },
                { val:"Evening",   label:"🌙 Evening",   cls:"va-tab-evening" },
              ].map(f => (
                <button key={f.val} onClick={() => setFilterAvail(f.val)}
                  className={`va-tab ${f.cls} ${filterAvail===f.val?'active':''}`}>
                  {f.label}
                </button>
              ))}
            </div>
            <button className="va-refresh-btn" onClick={fetchVolunteers}>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
              </svg>
              Refresh
            </button>
          </div>

         
          <div className="va-table-card">
            {!filtered || filtered.length === 0 ? (
              <div className="va-empty">
                <div className="va-empty-icon">
                  <svg width="28" height="28" fill="none" stroke="#7c3aed" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
                  </svg>
                </div>
                <div className="va-empty-title">No Volunteers Found</div>
                <div style={{fontSize:13}}>Try adjusting your search or filter.</div>
              </div>
            ) : (
              <table className="va-table">
                <thead className="va-thead">
                  <tr>
                    <th className="va-th" style={{width:50}}>#</th>
                    <th className="va-th"><span className="va-th-icon"><svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>Name</span></th>
                    <th className="va-th"><span className="va-th-icon"><svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>Campus</span></th>
                    <th className="va-th"><span className="va-th-icon"><svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>Phone</span></th>
                    <th className="va-th"><span className="va-th-icon"><svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>Event</span></th>
                    <th className="va-th"><span className="va-th-icon">⏰ Availability</span></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered?.map((v, idx) => {
                    const as = availStyle(v.availability);
                    return (
                      <tr key={v.id} className="va-tr">
                        <td className="va-td"><span className="va-row-num">{String(idx+1).padStart(2,'0')}</span></td>
                        <td className="va-td">
                          <div className="va-user-cell">
                            <div className="va-avatar">{v.username?.charAt(0)?.toUpperCase()||"V"}</div>
                            <div>
                              <div className="va-username">{v.username||"—"}</div>
                            </div>
                          </div>
                        </td>
                        <td className="va-td">
                          <span className="va-campus-badge">
                            <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                            {v.campus||"—"}
                          </span>
                        </td>
                        <td className="va-td">
                          <div className="va-phone-chip">
                            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
                            {v.phone||"—"}
                          </div>
                        </td>
                        <td className="va-td">
                          <div className="va-event-chip">
                            🎯 {v.event_name||"—"}
                          </div>
                        </td>
                        <td className="va-td">
                          <span className="va-avail" style={{background:as.bg,color:as.color,borderColor:as.border}}>
                            <div className="va-avail-dot" style={{background:as.color}}/>
                            {as.emoji} {v.availability||"—"}
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