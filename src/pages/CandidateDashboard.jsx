import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ active: 0, completion: 0 });

  useEffect(() => {
    if (!user) {
      navigate('/careers');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const [profileRes, appsRes] = await Promise.all([
          api.get('/intern/profile'),
          api.get('/intern/applications')
        ]);
        
        setUser(profileRes.data);
        localStorage.setItem('user', JSON.stringify(profileRes.data));
        setApplications(appsRes.data);
        
        // Calculate stats
        const activeCount = appsRes.data.filter(app => !['Rejected', 'Selected', 'Closed'].includes(app.status)).length;
        // Simple profile completion logic
        let completion = 20; // Base completion for having an account
        if (profileRes.data.phone) completion += 20;
        if (profileRes.data.education_history) completion += 20;
        if (profileRes.data.skills) completion += 20;
        if (appsRes.data.length > 0) completion += 20;
        
        setStats({ active: activeCount, completion });
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        if (err.message.includes('401')) {
          navigate('/careers');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/careers');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-bold text-on-surface animate-pulse font-headline uppercase tracking-tighter">Synchronizing Career Data...</p>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="md:h-screen md:w-64 md:fixed md:left-0 md:top-0 w-full bg-surface-container-low border-b md:border-b-0 md:border-r border-outline-variant/40 flex flex-col p-6 gap-4 z-40">
        <div className="mb-8 px-2 flex items-center gap-3">
          <span className="text-lg font-black text-primary tracking-tighter font-headline uppercase">LoopLab</span>
        </div>
        <div className="mb-10 px-2">
          <div className="flex items-center gap-3 mb-4">
            <img loading="lazy"
              alt="Candidate Profile"
              className="w-10 h-10 rounded-full border-2 border-primary-container object-cover"
              src={user?.profile_picture || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.full_name || 'User')}
            />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-on-surface truncate">{user?.full_name}</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Intern Portal</p>
            </div>
          </div>
          <Link to="/careers" className="w-full bg-primary text-on-primary py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-primary/20">
            <span className="material-symbols-outlined text-sm">search</span>
            Browse Openings
          </Link>
        </div>
        <nav className="flex-1 space-y-2">
          <a className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary font-bold rounded-lg transition-transform hover:translate-x-1" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Overview</span>
          </a>
          {[
            { icon: 'description', label: 'My Applications' },
            { icon: 'person', label: 'My Profile' },
            { icon: 'bookmark', label: 'Saved Roles' },
            { icon: 'settings', label: 'Settings' },
          ].map((item) => (
            <a key={item.label} className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container rounded-lg transition-transform hover:translate-x-1 font-medium" href="#">
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="pt-6 border-t border-outline-variant/40 space-y-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-on-surface-variant hover:text-error transition-colors text-sm font-bold uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Exit Portal
          </button>
          <p className="text-[9px] text-outline font-black px-4 uppercase tracking-[0.2em]">Recruitment Ecosystem v3.0</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="md:ml-64 min-h-screen p-6 md:p-8 lg:p-12 flex-1">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-on-surface font-headline uppercase">Candidate Hub</h1>
            <p className="text-on-surface-variant font-medium">Welcome back, {user?.full_name?.split(' ')[0]}. Your recruitment profile is {stats.completion}% complete.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="p-3 bg-surface-container-low rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <span className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-surface"></span>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Stats Section */}
          <section className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col justify-between h-48 border border-outline-variant/30">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <span className="material-symbols-outlined">work_history</span>
                </div>
                <span className="text-[10px] font-black text-primary px-3 py-1 bg-primary/5 rounded-full uppercase tracking-widest">Active Streams</span>
              </div>
              <div>
                <p className="text-5xl font-black text-on-surface tracking-tighter font-headline">{stats.active}</p>
                <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mt-1">Pending Evaluations</p>
              </div>
            </div>

            <div className="bg-primary p-8 rounded-2xl shadow-lg flex items-center justify-between h-48 text-on-primary">
              <div className="flex flex-col justify-between h-full">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Profile Integrity</p>
                <div>
                  <p className="text-3xl font-black font-headline uppercase tracking-tighter">
                    {stats.completion >= 80 ? 'Expert' : stats.completion >= 50 ? 'Intermediate' : 'Initial'} Tier
                  </p>
                  <p className="text-xs opacity-70 font-medium mt-1">Sync status: Optimal</p>
                </div>
              </div>
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="opacity-20" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="10"></circle>
                  <circle cx="48" cy="48" fill="transparent" r="40" stroke="white" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * stats.completion) / 100} strokeWidth="10" strokeLinecap="round" className="transition-all duration-1000"></circle>
                </svg>
                <span className="absolute text-xl font-black font-headline">{stats.completion}%</span>
              </div>
            </div>

            {/* Notifications / Alerts */}
            <div className="col-span-2 bg-surface-container-low p-8 rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-on-surface font-headline uppercase tracking-tight">System Alerts</h3>
                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">Clear Protocol</button>
              </div>
              <div className="space-y-4">
                {applications.slice(0, 2).map((app) => (
                  <div key={app.id} className="flex items-center gap-4 p-4 bg-white/60 rounded-xl transition-all hover:bg-white border border-outline-variant/20">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${app.status === 'Selected' ? 'bg-success-subtle text-success' : 'bg-primary/10 text-primary'}`}>
                      <span className="material-symbols-outlined text-sm">{app.status === 'Selected' ? 'verified' : 'sync'}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-on-surface">{app.status} Status: {app.applied_role}</p>
                      <p className="text-[10px] text-on-surface-variant font-medium">Evaluation protocol updated on {new Date(app.received_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
                {applications.length === 0 && (
                  <p className="text-center py-8 text-xs font-bold text-on-surface-variant opacity-50 uppercase tracking-widest">No active alerts in stream</p>
                )}
              </div>
            </div>
          </section>

          {/* Sidebar: Profile Info */}
          <section className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/30">
              <h3 className="text-lg font-black text-on-surface font-headline uppercase tracking-tight mb-6">Identity Profile</h3>
              <div className="space-y-6">
                {[
                  { label: 'Registered Identity', value: user?.full_name },
                  { label: 'Primary Contact', value: user?.email },
                  { label: 'Protocol Verified', value: user?.profile_complete ? 'Full Sync' : 'Partial Sync' },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-1">
                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{item.label}</span>
                    <p className="text-sm text-on-surface font-bold truncate">{item.value}</p>
                  </div>
                ))}
                <div className="pt-4">
                  <button className="w-full py-3 bg-surface-container-high text-on-surface rounded-xl text-xs font-black uppercase tracking-widest hover:bg-surface-container-highest transition-colors">Modify Detailed Profile</button>
                </div>
              </div>
            </div>

            {/* Resources / FAQ */}
            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
              <h3 className="text-lg font-black text-on-surface font-headline uppercase tracking-tight mb-4">Resources</h3>
              <ul className="space-y-3">
                {['Recruitment Guidelines', 'Interview Preparation', 'Career Development'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-xs font-bold text-primary hover:underline flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">launch</span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Application Table */}
          <section className="col-span-12 bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-outline-variant/30">
            <div className="p-8 border-b border-outline-variant/20 flex justify-between items-center bg-white/20">
              <h3 className="text-xl font-black text-on-surface font-headline uppercase tracking-tight">Application Stream History</h3>
              <div className="flex items-center bg-surface-container-low px-6 py-2 rounded-full">
                <span className="material-symbols-outlined text-sm text-on-surface-variant mr-3">search</span>
                <input className="bg-transparent border-none focus:ring-0 text-xs w-48 p-0 font-bold" placeholder="FILTER STREAMS..." type="text" />
              </div>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low">
                  <tr>
                    {['Opening / Position', 'Applied Date', 'Current Status', 'Action Protocol'].map((h, i) => (
                      <th key={h} className={`px-10 py-5 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] ${i === 3 ? 'text-right' : ''}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30 font-body">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary`}>
                            <span className="material-symbols-outlined text-sm">terminal</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">{app.applied_role}</p>
                            <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Protocol ID: {app.id.slice(0, 8)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-sm text-on-surface-variant font-bold">{new Date(app.received_at).toLocaleDateString()}</td>
                      <td className="px-10 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          app.status === 'Selected' ? 'bg-success-subtle text-success' : 
                          app.status === 'Rejected' ? 'bg-error/10 text-error' : 
                          'bg-amber-100 text-amber-700'
                        }`}>{app.status}</span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">View Signal Details</button>
                      </td>
                    </tr>
                  ))}
                  {applications.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-10 py-20 text-center opacity-30">
                        <span className="material-symbols-outlined text-6xl mb-4">history_toggle_off</span>
                        <p className="text-xs font-black uppercase tracking-[0.3em]">No application streams initialized</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
