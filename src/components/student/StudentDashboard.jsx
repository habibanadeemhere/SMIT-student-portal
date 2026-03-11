import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Outfit:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        .portal-root {
          font-family: 'Outfit', sans-serif;
          min-height: 100vh;
          background: #f4f7fb;
          position: relative;
          overflow-x: hidden;
        }

        .content-layer { position: relative; z-index: 1; }

        /* NAVBAR */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: #fff;
          border-bottom: 2px solid #e8eef6;
          box-shadow: 0 2px 16px rgba(0,87,168,0.08);
        }

        .navbar-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
          height: 68px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .logo-group { display: flex; align-items: center; gap: 14px; }

        .logo-ring {
          position: relative;
          width: 100px; height: 80px;
          border-radius: 50%;
          padding: 9px;
          
          
        }

        .logo-ring img {
          width: 100%; height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #fff;
          display: block;
        }

        .logo-text-main {
          font-family: 'Cinzel', serif;
          font-size: 16px;
          font-weight: 900;
          color: #0057a8;
          letter-spacing: 0.08em;
          line-height: 1.1;
        }

        .logo-text-sub {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #66b032;
          margin-top: 2px;
        }

        .smit-badge {
          display: flex; align-items: center; gap: 7px;
          background: #f0f9e8;
          border: 1.5px solid #c8e8a0;
          border-radius: 10px;
          padding: 6px 14px;
        }
        .smit-dot { width: 7px; height: 7px; border-radius: 50%; background: #66b032; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.5;transform:scale(1.4);} }
        .smit-label { font-size: 12px; font-weight: 800; color: #3a8a10; letter-spacing: 0.15em; }

        .divider-v { width: 1px; height: 34px; background: #e0e8f0; margin: 0 4px; }

        .logout-btn {
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #fff;
          background: linear-gradient(135deg, #0057a8, #0071cc);
          border: none;
          border-radius: 10px;
          padding: 9px 22px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0,87,168,0.25);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,87,168,0.35);
          background: linear-gradient(135deg, #66b032, #4a9e1a);
        }

        /* Blue top accent bar */
        .top-accent {
          height: 4px;
          background: linear-gradient(90deg, #0057a8 0%, #66b032 50%, #0057a8 100%);
          background-size: 200% 100%;
          animation: slideGrad 3s linear infinite;
        }
        @keyframes slideGrad { 0%{background-position:0% 0%;} 100%{background-position:200% 0%;} }

        /* HERO */
        .hero {
          text-align: center;
          padding: 3.5rem 2rem 2rem;
          animation: fadeDown 0.7s ease both;
        }
        @keyframes fadeDown { from{opacity:0;transform:translateY(-16px);} to{opacity:1;transform:translateY(0);} }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #eef5ff;
          border: 1.5px solid #c0d8f5;
          border-radius: 50px;
          padding: 5px 16px 5px 10px;
          margin-bottom: 1.2rem;
        }
        .eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: #0057a8; animation: pulse 2s infinite; }
        .eyebrow-text { font-size: 11px; font-weight: 700; color: #0057a8; letter-spacing: 0.2em; text-transform: uppercase; }

        .hero-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 900;
          line-height: 1.15;
          margin: 0 0 0.8rem;
          color: #0057a8;
        }

        .hero-title span { color: #66b032; }

        .hero-sub {
          font-size: 14.5px;
          color: #7a8fa8;
          font-weight: 400;
          max-width: 380px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .glow-sep {
          width: 100px;
          height: 3px;
          background: linear-gradient(90deg, #0057a8, #66b032);
          margin: 1.8rem auto;
          border-radius: 4px;
        }

        /* STATS */
        .stats-row {
          display: flex;
          justify-content: center;
          gap: 1.2rem;
          padding: 0 2rem 2.5rem;
          max-width: 600px;
          margin: 0 auto;
          animation: fadeUp 0.6s ease 0.2s both;
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }

        .stat-item {
          text-align: center;
          flex: 1;
          padding: 1rem;
          background: #fff;
          border: 1.5px solid #e4edf8;
          border-radius: 14px;
          box-shadow: 0 2px 10px rgba(0,87,168,0.06);
        }
        .stat-num {
          font-family: 'Cinzel', serif;
          font-size: 22px;
          font-weight: 900;
          color: #0057a8;
        }
        .stat-label { font-size: 10px; color: #9ab0c8; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 3px; font-weight: 600; }

        /* CARDS */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
          gap: 1.6rem;
          padding: 0 2.5rem 2rem;
          max-width: 1100px;
          margin: 0 auto;
        }

        .portal-card {
          position: relative;
          background: #fff;
          border-radius: 20px;
          padding: 2rem;
          cursor: pointer;
          border: 1.5px solid #e4edf8;
          box-shadow: 0 4px 20px rgba(0,87,168,0.07);
          transition: transform 0.38s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, border-color 0.3s;
          overflow: hidden;
          animation: fadeUp 0.6s ease both;
        }
        .portal-card:nth-child(1) { animation-delay: 0.12s; }
        .portal-card:nth-child(2) { animation-delay: 0.24s; }
        .portal-card:nth-child(3) { animation-delay: 0.36s; }

        .portal-card:hover { transform: translateY(-10px) scale(1.02); }
        .card-blue:hover { box-shadow: 0 20px 50px rgba(0,87,168,0.18); border-color: #0057a8; }
        .card-green:hover { box-shadow: 0 20px 50px rgba(102,176,50,0.18); border-color: #66b032; }

        /* Top colored bar */
        .card-top-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          border-radius: 20px 20px 0 0;
        }
        .bar-blue { background: linear-gradient(90deg, #0057a8, #4aa3ff); }
        .bar-green { background: linear-gradient(90deg, #66b032, #a0d840); }

        .card-icon-wrap {
          width: 54px; height: 54px;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.2rem;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .portal-card:hover .card-icon-wrap { transform: scale(1.15) rotate(-5deg); }
        .icon-blue { background: #eef5ff; border: 1.5px solid #c0d8f5; }
        .icon-green { background: #f0f9e8; border: 1.5px solid #c0e890; }

        .card-badge {
          display: inline-block;
          font-size: 9px; font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 50px;
          margin-bottom: 0.9rem;
        }
        .badge-blue { background: #eef5ff; color: #0057a8; border: 1px solid #c0d8f5; }
        .badge-green { background: #f0f9e8; color: #3a8a10; border: 1px solid #c0e890; }

        .card-title {
          font-family: 'Cinzel', serif;
          font-size: 17px; font-weight: 700;
          color: #0057a8;
          margin: 0 0 8px;
        }

        .card-desc {
          font-size: 13.5px;
          color: #7a8fa8;
          line-height: 1.65;
          margin: 0 0 1.4rem;
        }

        .card-cta {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: gap 0.25s;
        }
        .portal-card:hover .card-cta { gap: 11px; }
        .cta-blue { color: #0057a8; }
        .cta-green { color: #3a8a10; }
        .cta-arrow { transition: transform 0.25s; }
        .portal-card:hover .cta-arrow { transform: translateX(4px); }

        /* FOOTER */
        .footer-strip {
          max-width: 1100px;
          margin: 0.5rem auto 3rem;
          padding: 1.2rem 1.8rem;
          background: #fff;
          border: 1.5px solid #e4edf8;
          border-left: 4px solid #66b032;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 12px rgba(0,87,168,0.06);
          animation: fadeUp 0.6s ease 0.5s both;
          margin-left: 2.5rem; margin-right: 2.5rem;
        }
        .footer-left { display: flex; align-items: center; gap: 12px; }
        .footer-icon {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #0057a8, #0071cc);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(0,87,168,0.25);
        }
        .footer-title { font-size: 13px; font-weight: 700; color: #0057a8; }
        .footer-sub { font-size: 11px; color: #9ab0c8; margin-top: 2px; }
        .footer-dots { display: flex; gap: 5px; align-items: center; }
        .fdot { width: 8px; height: 8px; border-radius: 50%; }
        .fdot-g { background: #66b032; }
        .fdot-b { background: #0057a8; }
        .fdot-sm { width: 5px; height: 5px; opacity: 0.4; }
      `}</style>

      <div className="portal-root">
        <div className="top-accent" />
        <div className="content-layer">

          {/* NAVBAR */}
          <div className="navbar">
            <div className="navbar-inner">
              <div className="logo-group">
                <div className="logo-ring">
                  <img
                    src={Logo}
                    alt="Saylani Logo"
                  />
                </div>
                <div>
                  <div className="logo-text-main">SAYLANI</div>
                  <div className="logo-text-sub">Welfare Trust</div>
                </div>
                <div className="divider-v" />
                <div className="smit-badge">
                  <div className="smit-dot" />
                  <span className="smit-label">SMIT</span>
                </div>
              </div>
              <button className="logout-btn" onClick={() => navigate("/login")}>
                ⎋ Logout
              </button>
            </div>
          </div>

          {/* HERO */}
          <div className="hero">
            <div className="hero-eyebrow">
              <div className="eyebrow-dot" />
              <span className="eyebrow-text">Student Portal · Active</span>
            </div>
            <h1 className="hero-title">SMIT <span>Student</span> Portal</h1>
            <p className="hero-sub">Your gateway to campus services — fast, simple, and always available.</p>
            <div className="glow-sep" />
          </div>

          {/* STATS */}
          <div className="stats-row">
            {[{ num: "3", label: "Services" }, { num: "24/7", label: "Available" }, { num: "100%", label: "Free" }].map(s => (
              <div className="stat-item" key={s.label}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CARDS */}
          <div className="cards-grid">

            <div onClick={() => navigate("/complaint")} className="portal-card card-blue">
              <div className="card-top-bar bar-blue" />
              <div className="card-icon-wrap icon-blue">
                <svg width="26" height="26" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                </svg>
              </div>
              <span className="card-badge badge-blue">Support</span>
              <h2 className="card-title">Submit Complaint</h2>
              <p className="card-desc">Report any issue to campus or classes</p>
              <div className="card-cta cta-blue">
                <span>Open Service</span>
                <svg className="cta-arrow" width="14" height="14" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                </svg>
              </div>
            </div>

            <div onClick={() => navigate("/lostfound")} className="portal-card card-green">
              <div className="card-top-bar bar-green" />
              <div className="card-icon-wrap icon-green">
                <svg width="26" height="26" fill="none" stroke="#3a8a10" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"/>
                </svg>
              </div>
              <span className="card-badge badge-green">Campus</span>
              <h2 className="card-title">Lost & Found</h2>
              <p className="card-desc">Report lost items or find found items</p>
              <div className="card-cta cta-green">
                <span>Open Service</span>
                <svg className="cta-arrow" width="14" height="14" fill="none" stroke="#3a8a10" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                </svg>
              </div>
            </div>

            <div onClick={() => navigate('/volunteer')} className="portal-card card-blue">
              <div className="card-top-bar bar-blue" />
              <div className="card-icon-wrap icon-blue">
                <svg width="26" height="26" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                </svg>
              </div>
              <span className="card-badge badge-blue">Community</span>
              <h2 className="card-title">Volunteer Registration</h2>
              <p className="card-desc">Register to volunteer for Saylani events.</p>
              <div className="card-cta cta-blue">
                <span>Open Service</span>
                <svg className="cta-arrow" width="14" height="14" fill="none" stroke="#0057a8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                </svg>
              </div>
            </div>

          </div>

          {/* FOOTER */}
          <div className="footer-strip">
            <div className="footer-left">
              <div className="footer-icon">
                <svg width="18" height="18" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <div className="footer-title">Need Help?</div>
                <div className="footer-sub">Contact your batch coordinator or visit the admin office</div>
              </div>
            </div>
            <div className="footer-dots">
              <div className="fdot fdot-g" />
              <div className="fdot fdot-b fdot-sm" />
              <div className="fdot fdot-g fdot-sm" />
              <div className="fdot fdot-b" />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;