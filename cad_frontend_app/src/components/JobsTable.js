import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function JobsTable({ jobs = [], loading = false }) {
  /** Render jobs list in a table. */
  if (loading && jobs.length === 0) {
    return <div className="help">Loading jobs...</div>;
  }
  if (!loading && jobs.length === 0) {
    return <div className="help">No jobs yet. Start by creating a new conversion.</div>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="table">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Status</th>
            <th>Filename</th>
            <th>Created</th>
            <th>Updated</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {jobs.map((j) => {
            const id = j.id || j.jobId || j.uuid;
            const status = (j.status || '').toLowerCase();
            const badgeClass = status === 'completed' ? 'ok' : status === 'failed' ? 'err' : 'warn';
            const name = j.file_name || j.filename || j.input_name || '—';
            const created = j.created_at || j.createdAt || j.created || '';
            const updated = j.updated_at || j.updatedAt || j.updated || '';
            return (
              <tr key={id}>
                <td style={{ fontFamily: 'ui-monospace, SFMono-Regular' }}>{id}</td>
                <td><span className={`badge ${badgeClass}`}>{j.status}</span></td>
                <td>{name}</td>
                <td>{created ? new Date(created).toLocaleString() : '—'}</td>
                <td>{updated ? new Date(updated).toLocaleString() : '—'}</td>
                <td><Link className="link" to={`/jobs/${id}`}>View</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
