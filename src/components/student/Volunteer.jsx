import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import "./Volunteer.css";
import Logo from '../../assets/logo.png'

function Volunteer() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [campus, setCampus] = useState("");
  const [eventName, setEventName] = useState("");
  const [availability, setAvailability] = useState("");
  const [volunteers, setVolunteers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUserId(user.id);
  };

  const fetchVolunteers = async () => {
    const { data } = await supabase
      .from("volunteers")
      .select("*")
      .order("created_at", { ascending: false });
    setVolunteers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await supabase.from("volunteers").update({ username, phone, campus, event_name: eventName, availability }).eq("id", editingId);
      setEditingId(null);
    } else {
      await supabase.from("volunteers").insert([{ username, phone, campus, event_name: eventName, availability, user_id: userId }]);
    }
    fetchVolunteers();
    setUsername(""); setPhone(""); setCampus(""); setEventName(""); setAvailability("");
  };

  const deleteVolunteer = async (id) => {
    await supabase.from("volunteers").delete().eq("id", id);
    fetchVolunteers();
  };

  const editVolunteer = (item) => {
    setEditingId(item.id);
    setUsername(item.username);
    setPhone(item.phone);
    setCampus(item.campus);
    setEventName(item.event_name);
    setAvailability(item.availability);
  };

  useEffect(() => {
    getUser();
    fetchVolunteers();
  }, []);

  const availabilityColor = (a) => {
    if (a === "Morning") return { bg: "#fff8e8", color: "#b07800", border: "#f0d890" };
    if (a === "Afternoon") return { bg: "#eef5ff", color: "#0057a8", border: "#c0d8f5" };
    if (a === "Evening") return { bg: "#f5eeff", color: "#7c3aed", border: "#d8c0f5" };
    return { bg: "#f4f7fb", color: "#7a8fa8", border: "#e4edf8" };
  };

  return (
    <>


      <div className="vol-root">
        <div className="vol-top-accent" />

        
        <div className="vol-header">
          <div className="vol-header-inner">
            <div className="vol-logo-ring">
              <img src={Logo} alt="Saylani" />
            </div>
            <div>
              <div className="vol-header-title">SAYLANI</div>
              <div className="vol-header-sub">Welfare Trust</div>
            </div>
            <div className="vol-divider-v" />
            <div className="vol-smit-badge">
              <div className="vol-smit-dot" />
              <span className="vol-smit-label">SMIT</span>
            </div>
            <div className="vol-page-tag">
              <div className="vol-page-dot" />
              <span className="vol-page-label">Volunteers</span>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="vol-main">

          {/* HERO */}
          <div className="vol-hero">
            <div className="vol-hero-eyebrow">
              <div className="vol-eyedot" />
              <span style={{fontSize:11,fontWeight:700,color:'#0057a8',letterSpacing:'0.2em',textTransform:'uppercase'}}>Community Service</span>
            </div>
            <h1 className="vol-hero-title">{editingId ? "Edit" : "Volunteer"} <span>Registration</span></h1>
            <p className="vol-hero-sub">Join Saylani events and make a difference in your community.</p>
            <div className="vol-glow-sep" />
          </div>

          {/* LAYOUT */}
          <div className="vol-layout">

            {/* FORM */}
            <div className="vol-form-card">
              <div className="vol-form-top-bar" />

              <div className="vol-form-title">
                <div className="vol-form-icon">
                  <svg width="18" height="18" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                  </svg>
                </div>
                {editingId ? "Edit Volunteer" : "Volunteer Registration"}
              </div>

              <form onSubmit={handleSubmit}>

                <div className="vol-field">
                  <label className="vol-label">Your Name</label>
                  <input placeholder="Enter your full name" value={username} onChange={(e) => setUsername(e.target.value)} className="vol-input" />
                </div>

                <div className="vol-field">
                  <label className="vol-label">Phone Number</label>
                  <input placeholder="e.g. 0300-1234567" value={phone} onChange={(e) => setPhone(e.target.value)} className="vol-input" />
                </div>

                <div className="vol-field">
                  <label className="vol-label">Campus</label>
                  <select value={campus} onChange={(e) => setCampus(e.target.value)} className="vol-select">
                    <option>Select Campus</option>
                    <option>SMIT Bahadurabad</option>
                    <option>SMIT Korangi</option>
                    <option>SMIT Gulshan</option>
                    <option>SMIT Numaish</option>
                  </select>
                </div>

                <div className="vol-field">
                  <label className="vol-label">Event Name</label>
                  <input placeholder="e.g. Ramazan Drive, Blood Camp..." value={eventName} onChange={(e) => setEventName(e.target.value)} className="vol-input" />
                </div>

                <div className="vol-field">
                  <label className="vol-label">Availability</label>
                  <div className="vol-avail-grid">
                    {[
                      { val:"Morning", icon:"🌅", cls:"morning-active" },
                      { val:"Afternoon", icon:"☀️", cls:"afternoon-active" },
                      { val:"Evening", icon:"🌙", cls:"evening-active" },
                    ].map(a => (
                      <button key={a.val} type="button"
                        onClick={() => setAvailability(a.val)}
                        className={`vol-avail-btn ${availability === a.val ? a.cls : ""}`}>
                        <span style={{fontSize:18}}>{a.icon}</span>
                        <span>{a.val}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button className={`vol-submit-btn ${editingId ? "mode-edit" : "mode-new"}`}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {editingId
                      ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16.862 4.487a2.25 2.25 0 013.182 3.182L7.5 20.213l-4.5 1.5 1.5-4.5 12.362-12.226z"/>
                      : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.5v15m7.5-7.5h-15"/>
                    }
                  </svg>
                  {editingId ? "Update" : "Submit"}
                </button>

                {editingId && (
                  <button type="button"
                    onClick={() => { setEditingId(null); setUsername(""); setPhone(""); setCampus(""); setEventName(""); setAvailability(""); }}
                    className="vol-cancel-btn">
                    Cancel Edit
                  </button>
                )}

              </form>
            </div>

            {/* VOLUNTEERS LIST */}
            <div className="vol-section">
              <div className="vol-section-header">
                <div className="vol-section-title">
                  <svg width="20" height="20" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                  </svg>
                  Registered Volunteers
                </div>
                <span className="vol-count-badge">{volunteers?.length || 0} registered</span>
              </div>

              {!volunteers || volunteers.length === 0 ? (
                <div className="vol-empty">
                  <div className="vol-empty-icon">
                    <svg width="28" height="28" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
                    </svg>
                  </div>
                  <div className="vol-empty-title">No Volunteers Yet</div>
                  <div className="vol-empty-sub">Be the first to register for a Saylani event.</div>
                </div>
              ) : (
                <div className="vol-grid">
                  {volunteers.map((item, i) => {
                    const ac = availabilityColor(item.availability);
                    return (
                      <div key={item.id} className="vol-card" style={{animationDelay:`${i*0.07}s`}}>
                        <div className="vol-card-bar" />

                        <div style={{display:'flex',alignItems:'flex-start',gap:12,marginBottom:10}}>
                          <div className="vol-avatar">
                            {item.username?.charAt(0)?.toUpperCase() || "V"}
                          </div>
                          <div>
                            <h3 className="vol-card-name">{item.username}</h3>
                            <div className="vol-card-meta">
                              <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                              </svg>
                              <span>{item.phone}</span>
                            </div>
                          </div>
                        </div>

                        <div className="vol-info-row">
                          <div className="vol-info-item">
                            <div className="vol-info-icon">
                              <svg width="13" height="13" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                              </svg>
                            </div>
                            <span>{item.campus}</span>
                          </div>
                          <div className="vol-info-item">
                            <div className="vol-info-icon">
                              <svg width="13" height="13" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
                              </svg>
                            </div>
                            <span>{item.event_name}</span>
                          </div>
                        </div>

                        <span className="vol-avail-tag" style={{background:ac.bg,color:ac.color,borderColor:ac.border}}>
                          {item.availability === "Morning" ? "🌅" : item.availability === "Afternoon" ? "☀️" : "🌙"}
                          &nbsp;{item.availability}
                        </span>

                        {item.user_id === userId && (
                          <div className="vol-action-row">
                            <button onClick={() => editVolunteer(item)} className="vol-btn-edit">
                              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16.862 4.487a2.25 2.25 0 013.182 3.182L7.5 20.213l-4.5 1.5 1.5-4.5 12.362-12.226z"/>
                              </svg>
                              Edit
                            </button>
                            <button onClick={() => deleteVolunteer(item.id)} className="vol-btn-delete">
                              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                              </svg>
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Volunteer;