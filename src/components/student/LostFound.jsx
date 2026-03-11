import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import './LostFound.css'
import Logo from '../../assets/logo.png'

function LostFound() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Lost");
  const [campus, setCampus] = useState("");
  const [username, setUsername] = useState("");
  const [lostItems, setLostItems] = useState([]);
  const [edit, setEdit] = useState(null);
  const [userId, setUserId] = useState(null);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) setUserId(user.id);
  };

  const fetchItems = async () => {
    const { data } = await supabase
      .from("Lost_Found")
      .select("*")
      .order("created_at", { ascending: false });
    setLostItems(data);
  };

  useEffect(() => {
    getUser();
    fetchItems();
  }, []);

  const resetForm = () => {
    setItemName("");
    setDescription("");
    setCampus("");
    setUsername("");
    setStatus("Lost");
    setEdit(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !campus || !itemName || !description) {
      alert("Please fill all fields");
      return;
    }
    if (edit) {
      const { error } = await supabase
        .from("Lost_Found")
        .update({ username, campus, item_name: itemName, description, status })
        .eq("id", edit.id);
      if (error) alert(error.message);
      else { alert("Item updated successfully"); resetForm(); fetchItems(); }
    } else {
      const { error } = await supabase
        .from("Lost_Found")
        .insert([{ username, campus, item_name: itemName, description, status, user_id: userId }]);
      if (error) alert(error.message);
      else { alert("Item submitted successfully"); resetForm(); fetchItems(); }
    }
  };

  const deleteItem = async (id) => {
    const { error } = await supabase.from("Lost_Found").delete().eq("id", id);
    if (error) alert(error.message);
    else fetchItems();
  };

  const startEdit = (item) => {
    setEdit(item);
    setItemName(item.item_name);
    setDescription(item.description);
    setCampus(item.campus);
    setUsername(item.username);
    setStatus(item.status);
  };

  return (
    <>
      
      <div className="lf-root">
        <div className="lf-top-accent" />

       
        <div className="lf-header">
          <div className="lf-header-inner">
            <div className="lf-logo-ring">
              <img src={Logo} alt="Saylani" />
            </div>
            <div>
              <div className="lf-header-title">SAYLANI</div>
              <div className="lf-header-sub">Welfare Trust</div>
            </div>
            <div className="lf-divider-v" />
            <div className="lf-smit-badge">
              <div className="lf-smit-dot" />
              <span className="lf-smit-label">SMIT</span>
            </div>
            <div className="lf-page-tag">
              <div className="lf-page-dot" />
              <span className="lf-page-label">Lost & Found</span>
            </div>
          </div>
        </div>

      
        <div className="lf-main">

         
          <div className="lf-hero">
            <div className="lf-hero-eyebrow">
              <div className="lf-hero-eyedot" />
              <span style={{fontSize:11,fontWeight:700,color:'#3a8a10',letterSpacing:'0.2em',textTransform:'uppercase'}}>Campus Services</span>
            </div>
            <h1 className="lf-hero-title">Lost <span>&</span> Found</h1>
            <p className="lf-hero-sub">{edit ? "Update your item report below." : "Report a lost item or register something you've found on campus."}</p>
            <div className="lf-glow-sep" />
          </div>

          
          <div className="lf-grid">

          
            <div className="lf-form-card">
              <div className="lf-form-top-bar" />

              <div className="lf-form-title">
                <div className="lf-form-title-icon">
                  <svg width="18" height="18" fill="none" stroke="#66b032" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"/>
                  </svg>
                </div>
                {edit ? "Edit Item" : "Submit Item"}
              </div>

              <form onSubmit={handleSubmit}>

                <div className="lf-field">
                  <label className="lf-label">Your Name</label>
                  <input type="text" placeholder="Enter your full name" value={username} onChange={(e) => setUsername(e.target.value)} className="lf-input" />
                </div>

                <div className="lf-field">
                  <label className="lf-label">Campus</label>
                  <select value={campus} onChange={(e) => setCampus(e.target.value)} className="lf-select">
                    <option value="">Select Campus</option>
                    <option>SMIT Bahadurabad</option>
                    <option>SMIT Korangi</option>
                    <option>SMIT Gulshan</option>
                    <option>SMIT Numaish</option>
                  </select>
                </div>

                <div className="lf-field">
                  <label className="lf-label">Item Name</label>
                  <input type="text" placeholder="e.g. Blue backpack, iPhone 14..." value={itemName} onChange={(e) => setItemName(e.target.value)} className="lf-input" />
                </div>

                <div className="lf-field">
                  <label className="lf-label">Description</label>
                  <textarea placeholder="Describe the item — color, size, markings..." value={description} onChange={(e) => setDescription(e.target.value)} className="lf-textarea" />
                </div>

                <div className="lf-field">
                  <label className="lf-label">Status</label>
                  <div className="lf-status-toggle">
                    <button type="button" onClick={() => setStatus("Lost")}
                      className={`lf-status-btn ${status === "Lost" ? "lost-active" : ""}`}>
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
                      </svg>
                      Lost
                    </button>
                    <button type="button" onClick={() => setStatus("Found")}
                      className={`lf-status-btn ${status === "Found" ? "found-active" : ""}`}>
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Found
                    </button>
                  </div>
                </div>

                <button type="submit" className={`lf-submit-btn ${edit ? "mode-edit" : "mode-new"}`}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {edit
                      ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16.862 4.487a2.25 2.25 0 013.182 3.182L7.5 20.213l-4.5 1.5 1.5-4.5 12.362-12.226z"/>
                      : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.5v15m7.5-7.5h-15"/>
                    }
                  </svg>
                  {edit ? "Update Item" : "Submit Item"}
                </button>

                {edit && (
                  <button type="button" onClick={resetForm} className="lf-cancel-btn">
                    Cancel Edit
                  </button>
                )}

              </form>
            </div>

           
            <div className="lf-items-section">
              <div className="lf-section-header">
                <div className="lf-section-title">
                  <svg width="20" height="20" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"/>
                  </svg>
                  All Items
                </div>
                <span className="lf-count-badge">{lostItems?.length || 0} reported</span>
              </div>

              {!lostItems || lostItems.length === 0 ? (
                <div className="lf-empty">
                  <div className="lf-empty-icon">
                    <svg width="28" height="28" fill="none" stroke="#66b032" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"/>
                    </svg>
                  </div>
                  <div className="lf-empty-title">No Items Reported</div>
                  <div className="lf-empty-sub">Be the first to report a lost or found item.</div>
                </div>
              ) : (
                <div className="lf-items-grid">
                  {lostItems.map((item, i) => (
                    <div key={item.id} className="lf-card" style={{animationDelay:`${i*0.07}s`}}>
                      <div className={item.status === "Lost" ? "lf-card-bar-lost" : "lf-card-bar-found"} />

                      <div className="lf-card-header">
                        <h3 className="lf-card-title">{item.item_name}</h3>
                        <span className={`lf-status-pill ${item.status === "Lost" ? "lost" : "found"}`}>
                          <div className="pill-dot" style={{background: item.status === "Lost" ? "#dc2626" : "#3a8a10"}} />
                          {item.status}
                        </span>
                      </div>

                      <div className="lf-card-meta">
                        <span>{item.username}</span>
                        <div className="lf-meta-dot" />
                        <span>{item.campus}</span>
                      </div>

                      <p className="lf-card-desc">{item.description}</p>

                      <span className="lf-campus-tag">
                        <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                        </svg>
                        {item.campus}
                      </span>

                      {item.user_id === userId && (
                        <div className="lf-action-row">
                          <button onClick={() => startEdit(item)} className="lf-btn-edit">
                            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16.862 4.487a2.25 2.25 0 013.182 3.182L7.5 20.213l-4.5 1.5 1.5-4.5 12.362-12.226z"/>
                            </svg>
                            Edit
                          </button>
                          <button onClick={() => deleteItem(item.id)} className="lf-btn-delete">
                            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                            </svg>
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default LostFound;