import React, { useEffect } from 'react';
import JobsTable from '../components/JobsTable';
import { useJobs } from '../hooks/useJobs';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function DashboardPage() {
  /** Dashboard shows job listing and quick actions. */
  const { jobs, loading, error, refresh } = useJobs();

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div className="actions">
        <Link to="/upload" className="btn success">New Conversion</Link>
        <button className="btn" onClick={refresh} disabled={loading}>{loading ? 'Refreshing...' : 'Refresh'}</button>
      </div>
      {error ? <div className="badge err" role="alert">{error}</div> : null}
      <div className="card">
        <h2>Recent Jobs</h2>
        <JobsTable jobs={jobs} loading={loading} />
      </div>
    </div>
  );
}
