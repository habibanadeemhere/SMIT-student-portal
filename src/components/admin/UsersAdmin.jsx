import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import "./Users.css";
import Logo from "../../assets/logo.png";

export default function UsersAdmin() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    const { data } = await supabase.from("profiles").select("*");
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users?.filter(u =>
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>


      <div className="ua-root">
        <div className="ua-top-accent" />

     
        <div className="ua-header">
          <div className="ua-header-inner">
            <div className="ua-logo-ring">
              <img src={Logo} alt="Saylani" />
            </div>
            <div>
              <div className="ua-header-title">SAYLANI</div>
              <div className="ua-header-sub">Welfare Trust</div>
            </div>
            <div className="ua-divider-v" />
            <div className="ua-smit-badge">
              <div className="ua-smit-dot" />
              <span className="ua-smit-label">SMIT</span>
            </div>
            <div className="ua-admin-badge">
              <div className="ua-admin-dot" />
              <span className="ua-admin-label">Admin Panel</span>
            </div>
          </div>
        </div>

       
        <div className="ua-main">

      
          <div className="ua-hero">
            <div className="ua-hero-eyebrow">
              <div className="ua-hero-eyedot" />
              <span style={{fontSize:11,fontWeight:700,color:'#0057a8',letterSpacing:'0.2em',textTransform:'uppercase'}}>Admin · User Management</span>
            </div>
            <h1 className="ua-hero-title">All <span>Users</span></h1>
            <p className="ua-hero-sub">View and monitor all registered students and admins.</p>
            <div className="ua-glow-sep" />
          </div>

         
          <div className="ua-toolbar">
            <div className="ua-search-wrap">
              <span className="ua-search-icon">
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"/>
                </svg>
              </span>
              <input
                className="ua-search"
                placeholder="Search by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="ua-count-badge">
              <svg width="14" height="14" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
              </svg>
              <span className="ua-count-num">{filtered?.length || 0}</span>
              <span>users found</span>
            </div>
          </div>

          
          <div className="ua-table-card" style={{overflowX:'auto'}}>
            {!filtered || filtered.length === 0 ? (
              <div className="ua-empty">
                <div className="ua-empty-icon">
                  <svg width="28" height="28" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                  </svg>
                </div>
                <div className="ua-empty-title">No Users Found</div>
                <div style={{fontSize:13}}>Try adjusting your search.</div>
              </div>
            ) : (
              <table className="ua-table">
                <thead className="ua-thead">
                  <tr>
                    <th className="ua-th" style={{width:50}}>#</th>
                    <th className="ua-th">
                      <span className="ua-th-icon">
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                        </svg>
                        Username
                      </span>
                    </th>
                    <th className="ua-th">
                      <span className="ua-th-icon">
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                        </svg>
                        Email
                      </span>
                    </th>
                    <th className="ua-th">
                      <span className="ua-th-icon">
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                        </svg>
                        Campus
                      </span>
                    </th>
                    <th className="ua-th">
                      <span className="ua-th-icon">
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                        </svg>
                        Role
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered?.map((u, i) => (
                    <tr key={u.id} className="ua-tr">
                      <td className="ua-td">
                        <span className="ua-row-num">{String(i + 1).padStart(2, '0')}</span>
                      </td>
                      <td className="ua-td">
                        <div className="ua-user-cell">
                          <div className="ua-avatar">
                            {u.username?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                          <span className="ua-username">{u.username || "—"}</span>
                        </div>
                      </td>
                      <td className="ua-td">
                        <div className="ua-email-chip">
                          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                          </svg>
                          {u.email || "—"}
                        </div>
                      </td>
                      <td className="ua-td">
                        {u.campus
                          ? <span className="ua-campus-badge">
                              <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                              </svg>
                              {u.campus}
                            </span>
                          : <span style={{color:'#c0d0e0',fontSize:13}}>—</span>
                        }
                      </td>
                      <td className="ua-td">
                        {u.role === 'admin'
                          ? <span className="ua-role-admin">
                              <div className="ua-role-dot" style={{background:'#66b032'}} />
                              Admin
                            </span>
                          : <span className="ua-role-student">
                              <div className="ua-role-dot" style={{background:'#3a8a10'}} />
                              Student
                            </span>
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