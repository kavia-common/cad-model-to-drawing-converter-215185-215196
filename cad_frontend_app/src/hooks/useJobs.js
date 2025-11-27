import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchJob, listJobs } from '../api/client';

// PUBLIC_INTERFACE
export function useJobs() {
  /** Manage job listing and polling a single job. */
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listJobs();
      setJobs(Array.isArray(data) ? data : data?.items || []);
    } catch (e) {
      setError(e?.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  return { jobs, loading, error, refresh, setJobs };
}

// PUBLIC_INTERFACE
export function useJobPolling(jobId, intervalMs = 2000) {
  /** Poll a single job until it reaches a terminal state. */
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const timer = useRef(null);

  const load = useCallback(async () => {
    if (!jobId) return;
    setLoading(true);
    try {
      const data = await fetchJob(jobId);
      setJob(data);
      const status = (data?.status || '').toLowerCase();
      if (['completed', 'failed', 'error', 'cancelled'].includes(status)) {
        setDone(true);
      }
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    load();
    if (!jobId) return undefined;
    timer.current = setInterval(load, intervalMs);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [jobId, load, intervalMs]);

  useEffect(() => {
    if (done && timer.current) clearInterval(timer.current);
  }, [done]);

  return { job, loading, done, reload: load };
}
