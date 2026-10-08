/**
 * API service for LoopLab company webapp.
 * Communicates with the IMS backend to fetch public job listings.
 * VITE_API_URL should point to the IMS backend (e.g. http://localhost:8000/api)
 */
let BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000/api').replace(/\/$/, '');
if (BASE_URL.includes('api.looplab.lk') && !BASE_URL.endsWith('/api')) {
  BASE_URL += '/api';
}

const api = {
  get: async (endpoint) => {
    const token = localStorage.getItem('looplab_token');
    const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const response = await fetch(`${BASE_URL}${url}`, {
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(errorData.detail || `Request failed: ${response.status}`);
    }

    return response.json();
  },

  post: async (endpoint, data) => {
    const token = localStorage.getItem('looplab_token');
    const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(errorData.detail || `Request failed: ${response.status}`);
    }

    return response.json();
  },
};

export default api;
