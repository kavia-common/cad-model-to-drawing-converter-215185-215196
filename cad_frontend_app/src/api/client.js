import axios from 'axios/dist/browser/axios.cjs';
// Force browser adapter to avoid Node 'crypto' import in Cypress/Electron
axios.defaults.adapter = undefined;

/**
 * API client with Authorization interceptor. Base URL is taken from
 * REACT_APP_API_BASE environment variable. Defaults to http://localhost:3001.
 */
const baseURL = process.env.REACT_APP_API_BASE || 'http://localhost:3001';

export const api = axios.create({
  baseURL,
});

/** Attach JWT token from localStorage to each request if present. */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** Basic 401 handling to purge token on unauthorized. */
api.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('auth_token');
      // Optionally redirect to login page
    }
    return Promise.reject(error);
  }
);

// PUBLIC_INTERFACE
export async function loginRequest(email, password) {
  /** Perform login and return JWT token. */
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);
  const res = await api.post('/auth/login', params, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  // Expecting `{ access_token: '...' }` or `{ token: '...' }`
  const token = res.data?.access_token || res.data?.token;
  if (!token) throw new Error('Invalid login response: token missing');
  return token;
}

// PUBLIC_INTERFACE
export async function uploadFile(file) {
  /** Upload a CAD file. Returns fileId or similar identifier. */
  const form = new FormData();
  form.append('file', file);
  const res = await api.post('/files/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}

// PUBLIC_INTERFACE
export async function startConversion(payload) {
  /** Start conversion with provided settings. Returns a job object with id. */
  const res = await api.post('/convert', payload);
  return res.data;
}

// PUBLIC_INTERFACE
export async function listJobs() {
  /** List recent jobs. */
  const res = await api.get('/jobs');
  return res.data;
}

// PUBLIC_INTERFACE
export async function fetchJob(id) {
  /** Fetch a single job by id. */
  const res = await api.get(`/jobs/${id}`);
  return res.data;
}
