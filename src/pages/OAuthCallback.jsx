import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const hasHandledCallback = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      if (hasHandledCallback.current) return;
      hasHandledCallback.current = true;

      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          // Exchange code for tokens via backend
          const response = await api.get(`/auth/intern/google/callback?code=${code}`);
          const { access_token, refresh_token, intern } = response.data;

          localStorage.setItem('token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          localStorage.setItem('user', JSON.stringify(intern));
          localStorage.setItem('user_type', 'intern');

          // Redirect to candidate dashboard
          navigate('/candidate-dashboard');
        } catch (error) {
          console.error('OAuth callback error:', error);
          navigate('/careers?error=oauth_failed');
        }
      } else {
        navigate('/careers');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-bold text-on-surface animate-pulse">Authenticating with Google Identity Pipeline...</p>
      </div>
    </div>
  );
}
