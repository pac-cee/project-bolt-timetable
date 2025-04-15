import React from 'react';
import AuthPanel from './AuthPanel';
import TimetableFileUploadPanel from './TimetableFileUploadPanel';
import DashboardLayout from './DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import AnalyticsPanel from './pages/AnalyticsPanel';
import ProfilePanel from './pages/ProfilePanel';
import PlanAndProgressPanel from './PlanAndProgressPanel';

function App() {
  const [token, setToken] = React.useState(() => localStorage.getItem('jwt_token') || '');
  const [fileUploaded, setFileUploaded] = React.useState(false);
  const [section, setSection] = React.useState<'dashboard'|'analytics'|'profile'>('dashboard');
  const [plan, setPlan] = React.useState<any>(null);
  const [progress, setProgress] = React.useState<any>(null);
  const user = token ? { username: 'User' } : null; // Replace with real user info if available

  const handleAuth = (tk: string) => {
    setToken(tk);
    localStorage.setItem('jwt_token', tk);
  };
  const handleLogout = () => {
    setToken('');
    setFileUploaded(false);
    localStorage.removeItem('jwt_token');
  };

  if (!token) {
    return <AuthPanel onAuth={handleAuth} />;
  }

  return (
    <DashboardLayout
      user={user}
      onLogout={handleLogout}
      setSection={setSection}
      section={section}
    >
      {section === 'dashboard' && (
        fileUploaded ? (
          <PlanAndProgressPanel token={token} onLogout={handleLogout} />
        ) : (
          <TimetableFileUploadPanel token={token} onUploaded={() => setFileUploaded(true)} />
        )
      )}
      {section === 'analytics' && (
        <AnalyticsPanel plan={plan} progress={progress} />
      )}
      {section === 'profile' && (
        <ProfilePanel user={user} />
      )}
    </DashboardLayout>
  );
}

export default App;