import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import "./Lost.css";
import Logo from "../../assets/logo.png";

export default function LostFoundAdmin() {

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchItems = async () => {
    const { data } = await supabase.from("Lost_Found").select("*");
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filtered = items?.filter(i => {
    const matchSearch =
      i.username?.toLowerCase().includes(search.toLowerCase()) ||
      i.item_name?.toLowerCase().includes(search.toLowerCase()) ||
      i.campus?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || i.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <>

      <div className="lfa-root">
        <div className="lfa-top-accent" />

    
        <div className="lfa-header">
          <div className="lfa-header-inner">
            <div className="lfa-logo-ring">
              <img src={Logo} alt="Saylani" />
            </div>
            <div>
              <div className="lfa-header-title">SAYLANI</div>
              <div className="lfa-header-sub">Welfare Trust</div>
            </div>
            <div className="lfa-divider-v" />
            <div className="lfa-smit-badge">
              <div className="lfa-smit-dot" />
              <span className="lfa-smit-label">SMIT</span>
            </div>
            <div className="lfa-admin-badge">
              <div className="lfa-admin-dot" />
              <span className="lfa-admin-label">Admin Panel</span>
            </div>
          </div>
        </div>

        <div className="lfa-main">

         
          <div className="lfa-hero">
            <div className="lfa-hero-eyebrow">
              <div className="lfa-hero-eyedot" />
              <span style={{fontSize:11,fontWeight:700,color:'#3a8a10',letterSpacing:'0.2em',textTransform:'uppercase'}}>Admin · Lost & Found</span>
            </div>
            <h1 className="lfa-hero-title">Lost <span>&</span> Found</h1>
            <p className="lfa-hero-sub">Monitor all lost and found item reports across all campuses.</p>
            <div className="lfa-glow-sep" />
          </div>

        
          <div className="lfa-stats">
            {[
              { label:"Total Items", num: items?.length || 0, accent:"#0057a8", bg:"#eef5ff", border:"#c0d8f5", icon:(
                <svg width="16" height="16" fill="none" stroke="#0057a8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"/></svg>
              )},
              { label:"Lost", num: items?.filter(i=>i.status==="Lost").length || 0, accent:"#dc2626", bg:"#fff5f5", border:"#fca5a5", icon:(
                <svg width="16" height="16" fill="none" stroke="#dc2626" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>
              )},
              { label:"Found", num: items?.filter(i=>i.status==="Found").length || 0, accent:"#3a8a10", bg:"#f0f9e8", border:"#c8e8a0", icon:(
                <svg width="16" height="16" fill="none" stroke="#3a8a10" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              )},
            ].map(s => (
              <div className="lfa-stat" key={s.label} style={{borderColor: s.border}}>
                <div className="lfa-stat-icon" style={{background: s.bg, border:`1px solid ${s.border}`}}>{s.icon}</div>
                <div>
                  <div className="lfa-stat-num" style={{color: s.accent}}>{s.num}</div>
                  <div className="lfa-stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

         
          <div className="lfa-toolbar">
            <div className="lfa-search-wrap">
              <span className="lfa-search-icon">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"/>
                </svg>
              </span>
              <input
                className="lfa-search"
                placeholder="Search by name, item or campus..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="lfa-filters">
              {["All","Lost","Found"].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`lfa-tab lfa-tab-${f.toLowerCase()} ${filter === f ? 'active' : ''}`}>
                  {f === "Lost" ? "🔴" : f === "Found" ? "🟢" : "📋"} {f}
                </button>
              ))}
            </div>
          </div>

         
          <div className="lfa-table-card">
            {!filtered || filtered.length === 0 ? (
              <div className="lfa-empty">
                <div className="lfa-empty-icon">
                  <svg width="28" height="28" fill="none" stroke="#66b032" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"/>
                  </svg>
                </div>
                <div className="lfa-empty-title">No Items Found</div>
                <div style={{fontSize:13}}>Try adjusting your search or filter.</div>
              </div>
            ) : (
              <table className="lfa-table">
                <thead className="lfa-thead">
                  <tr>
                    <th className="lfa-th" style={{width:50}}>#</th>
                    <th className="lfa-th">
                      <span className="lfa-th-icon">
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
                        Student
                      </span>
                    </th>
                    <th className="lfa-th">
                      <span className="lfa-th-icon">
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"/></svg>
                        Item
                      </span>
                    </th>
                    <th className="lfa-th">
                      <span className="lfa-th-icon">
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                        Campus
                      </span>
                    </th>
                    <th className="lfa-th">
                      <span className="lfa-th-icon">
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        Status
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered?.map((i, idx) => (
                    <tr key={i.id} className="lfa-tr">
                      <td className="lfa-td"><span className="lfa-row-num">{String(idx+1).padStart(2,'0')}</span></td>
                      <td className="lfa-td">
                        <div className="lfa-user-cell">
                          <div className="lfa-avatar">{i.username?.charAt(0)?.toUpperCase() || "S"}</div>
                          <span className="lfa-username">{i.username || "—"}</span>
                        </div>
                      </td>
                      <td className="lfa-td">
                        <div className="lfa-item-chip">
                          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"/></svg>
                          {i.item_name || "—"}
                        </div>
                      </td>
                      <td className="lfa-td">
                        <span className="lfa-campus-badge">
                          <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                          {i.campus || "—"}
                        </span>
                      </td>
                      <td className="lfa-td">
                        {i.status === "Lost"
                          ? <span className="lfa-status-lost"><div className="lfa-status-dot" style={{background:'#dc2626'}}/>Lost</span>
                          : <span className="lfa-status-found"><div className="lfa-status-dot" style={{background:'#3a8a10'}}/>Found</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>
      </div>
    </>
  );
}