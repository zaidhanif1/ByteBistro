const API_BASE = import.meta.env.MODE === 'development' 
  ? 'http://localhost:8000' 
  : "https://bytebistro-l3ya.onrender.com";

export const apiCall = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE}/api${endpoint}`, config);
  console.log(response)
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();

};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}; 