import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useJobPolling } from '../hooks/useJobs';
import ResultPreview from '../components/ResultPreview';

// PUBLIC_INTERFACE
export default function JobDetailPage() {
  /** Job detail page, polls until job is complete, showing settings and outputs. */
  const { id } = useParams();
  const { job, loading, done, reload } = useJobPolling(id, 2000);

  const status = (job?.status || '').toLowerCase();
  const badgeClass = status === 'completed' ? 'ok' : status === 'failed' ? 'err' : 'warn';

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="actions">
        <Link to="/dashboard" className="btn">Back</Link>
        <button className="btn" onClick={reload} disabled={loading}>{loading ? 'Refreshing...' : 'Refresh'}</button>
        <Link to="/upload" className="btn success">New Conversion</Link>
      </div>

      <div className="card">
        <h2>Job #{id}</h2>
        <div className={`badge ${badgeClass}`} style={{ marginTop: 6, marginBottom: 10 }}>
          Status: {job?.status || 'loading'}
        </div>

        <div className="grid two">
          <div className="card">
            <h3>Settings</h3>
            <pre style={{ overflow: 'auto' }}>{JSON.stringify(job?.settings || job?.meta?.settings || {}, null, 2)}</pre>
          </div>
          <div className="card">
            <h3>Preview</h3>
            <ResultPreview thumbnailUrl={job?.preview_url || job?.thumbnail} />
          </div>
        </div>

        <div className="card" style={{ marginTop: 12 }}>
          <h3>Outputs</h3>
          <div className="actions">
            {job?.pdf_url ? <a className="btn primary" href={job.pdf_url} target="_blank" rel="noreferrer">Download PDF</a> : <span className="help">PDF not available</span>}
            {job?.dxf_url ? <a className="btn" href={job.dxf_url} target="_blank" rel="noreferrer">Download DXF</a> : <span className="help">DXF not available</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
