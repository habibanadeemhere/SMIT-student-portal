import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import Logo from "../../assets/logo.png";
import './Complaint.css'

const Complaint = () => {

const [username, setUsername] = useState("")
const [campus, setCampus] = useState("")
const [title, setTitle] = useState("")
const [description, setDescription] = useState("")
const [category, setCategory] = useState("")
const [userId, setUserId] = useState(null)
const [complaints, setComplaints] = useState([])
const [editingId,setEditingId] = useState(null) 

const getUser = async () => {
const { data } = await supabase.auth.getUser()
setUserId(data.user.id)
}

const fetchComplaints = async () => {
const { data } = await supabase
.from("complaints")
.select("*")
.order("created_at", { ascending: false })
setComplaints(data)
}

const handleSubmit = async (e) => {
    e.preventDefault()
 if (!username || !campus || !title || !category || !description) {
    alert("Please fill all the fields before submitting!");
    return; 
  }
    if(editingId){ 
        const { error } = await supabase
        .from("complaints")
        .update({username,campus,title,category,description})
        .eq("id",editingId)
        if(error){ alert(error.message) } 
        else {
            alert("Complaint updated successfully")
            setEditingId(null)
            resetForm()
            fetchComplaints()
        }
    } else { 
        const { error } = await supabase
        .from("complaints")
        .insert([{ username, campus, title, category, description, user_id:userId, status:"submitted" }])
        if(error){ alert(error.message) } 
        else {
            alert("Complaint submitted successfully")
            resetForm()
            fetchComplaints()
        }
    }
}

const dltComplaint = async (id) => {
await supabase.from("complaints").delete().eq("id", id)
fetchComplaints()
}

const editComplaint = (item)=>{
    setEditingId(item.id)
    setUsername(item.username)
    setCampus(item.campus)
    setTitle(item.title)
    setCategory(item.category)
    setDescription(item.description)
}

const resetForm = ()=>{
    setUsername("")
    setCampus("")
    setTitle("")
    setCategory("")
    setDescription("")
}

useEffect(()=>{
    getUser()
    fetchComplaints()
},[])

const statusColor = (status) => {
  if (status === "submitted") return { bg: "#eef5ff", color: "#0057a8", border: "#c0d8f5" }
  if (status === "resolved") return { bg: "#f0f9e8", color: "#3a8a10", border: "#c0e890" }
  return { bg: "#fff8e8", color: "#b07800", border: "#f0d890" }
}

return (
<>


<div className="complaint-root">
  <div className="comp-top-accent" />


  <div className="comp-header">
    <div className="comp-header-inner">
      <div className="comp-logo-ring">
        <img src={Logo} alt="Saylani" />
      </div>
      <div>
        <div className="comp-header-title">SAYLANI</div>
        <div className="comp-header-sub">Welfare Trust</div>
      </div>
      <div className="comp-divider-v" />
      <div className="comp-smit-badge">
        <div className="comp-smit-dot" />
        <span className="comp-smit-label">SMIT</span>
      </div>
      <div className="comp-page-tag">
        <div className="comp-page-dot" />
        <span className="comp-page-label">Complaints</span>
      </div>
    </div>
  </div>

  
  <div className="comp-main">


    <div className="comp-hero">
      <div className="comp-hero-eyebrow">
        <div className="hero-dot-b" />
        <span style={{fontSize:11,fontWeight:700,color:'#0057a8',letterSpacing:'0.2em',textTransform:'uppercase'}}>Student Services</span>
      </div>
      <h1 className="comp-hero-title">{editingId ? "Edit Your" : "Submit a"} <span>Complaint</span></h1>
      <p className="comp-hero-sub">Report campus issues quickly — we're here to help.</p>
      <div className="comp-glow-sep" />
    </div>

   
    <div className="comp-grid">

    
      <div className="form-card">
        <div className="form-card-top-bar" />

        <div className="form-title">
          <div className="form-title-icon">
            <svg width="18" height="18" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
            </svg>
          </div>
          {editingId ? "Edit Complaint" : "Submit Complaint"}
        </div>

        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>

          <div className="form-field">
            <label className="form-label">Your Name</label>
            <input type="text" placeholder="Enter your full name" value={username} onChange={(e)=>setUsername(e.target.value)} className="form-input" />
          </div>

          <div className="form-field">
            <label className="form-label">Campus</label>
            <select value={campus} onChange={(e)=>setCampus(e.target.value)} className="form-select">
              <option value="">Select Campus</option>
              <option>SMIT Bahadurabad</option>
              <option>SMIT Korangi</option>
              <option>SMIT Gulshan</option>
              <option>SMIT Numaish</option>
            </select>
          </div>

          <div className="form-field">
            <label className="form-label">Complaint Title</label>
            <input type="text" placeholder="Brief title of your complaint" value={title} onChange={(e)=>setTitle(e.target.value)} className="form-input" />
          </div>

          <div className="form-field">
            <label className="form-label">Category</label>
            <select value={category} onChange={(e)=>setCategory(e.target.value)} className="form-select">
              <option value="">Select Category</option>
              <option>Internet</option>
              <option>Water</option>
              <option>Maintenance</option>
              <option>Electricity</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-field">
            <label className="form-label">Description</label>
            <textarea value={description} placeholder="Describe your issue in detail..." onChange={(e)=>setDescription(e.target.value)} className="form-textarea" />
          </div>

          <button className={`submit-btn ${editingId ? 'editing' : ''}`}>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {editingId
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16.862 4.487a2.25 2.25 0 013.182 3.182L7.5 20.213l-4.5 1.5 1.5-4.5 12.362-12.226z"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.5v15m7.5-7.5h-15"/>
              }
            </svg>
            {editingId ? "Update Complaint" : "Submit Complaint"}
          </button>

          {editingId && (
            <button type="button" onClick={()=>{setEditingId(null);resetForm()}}
              style={{width:'100%',padding:'10px',background:'#f4f7fb',border:'1.5px solid #e4edf8',borderRadius:12,color:'#7a8fa8',fontFamily:'Outfit,sans-serif',fontSize:13,fontWeight:600,cursor:'pointer'}}>
              Cancel Edit
            </button>
          )}

        </form>
      </div>

      
      <div className="complaints-section">
        <div className="section-header">
          <div className="section-title">
            <svg width="20" height="20" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"/>
            </svg>
            All Complaints
          </div>
          <span className="count-badge">{complaints.length} total</span>
        </div>

        {complaints.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg width="28" height="28" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
              </svg>
            </div>
            <div className="empty-title">No Complaints Yet</div>
            <div className="empty-sub">Submit your first complaint using the form.</div>
          </div>
        ) : (
          <div className="complaints-grid">
            {complaints.map((item, i) => {
              const sc = statusColor(item.status)
              return (
                <div key={item.id} className="comp-card" style={{animationDelay:`${i*0.07}s`}}>
                  <div className="comp-card-bar" />

                  <h3 className="comp-card-title">{item.title}</h3>

                  <div className="comp-card-meta">
                    <span>{item.username}</span>
                    <div className="meta-dot" />
                    <span>{item.campus}</span>
                  </div>

                  <p className="comp-card-desc">{item.description}</p>

                  <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap',marginBottom:4}}>
                    <span className="comp-card-category">
                      <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/>
                      </svg>
                      {item.category}
                    </span>
                    <span className="comp-card-status" style={{background:sc.bg,color:sc.color,borderColor:sc.border}}>
                      <div className="status-dot" style={{background:sc.color}} />
                      {item.status}
                    </span>
                  </div>

                  {item.user_id === userId && (
                    <div className="action-row">
                      <button onClick={()=>editComplaint(item)} className="btn-edit">
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16.862 4.487a2.25 2.25 0 013.182 3.182L7.5 20.213l-4.5 1.5 1.5-4.5 12.362-12.226z"/>
                        </svg>
                        Edit
                      </button>
                      <button onClick={()=>dltComplaint(item.id)} className="btn-delete">
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                        </svg>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  </div>
</div>
</>
)
}

export default Complaint