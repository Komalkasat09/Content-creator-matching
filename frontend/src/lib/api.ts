// API utility with authentication
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('authToken');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(`http://127.0.0.1:8000${endpoint}`, config);
  
  // Handle token expiry
  if (response.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/auth';
    throw new Error('Authentication required');
  }

  return response;
};

// Convenience methods
export const api = {
  get: (endpoint: string) => apiCall(endpoint, { method: 'GET' }),
  post: (endpoint: string, data: any) => 
    apiCall(endpoint, { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),
  put: (endpoint: string, data: any) => 
    apiCall(endpoint, { 
      method: 'PUT', 
      body: JSON.stringify(data) 
    }),
  delete: (endpoint: string) => apiCall(endpoint, { method: 'DELETE' }),
};
