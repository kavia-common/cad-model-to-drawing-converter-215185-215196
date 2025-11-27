import React, { useMemo, useState } from 'react';
import UploadForm from '../components/UploadForm';
import ConversionSettingsModal from '../components/ConversionSettingsModal';
import { startConversion, uploadFile } from '../api/client';
import { Link, useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function UploadPage() {
  /** Upload page that accepts model, configures settings, and starts a conversion job. */
  const [showSettings, setShowSettings] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [job, setJob] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const defaultSettings = useMemo(() => ({
    views: ['front', 'top', 'right', 'isometric'],
    projection: 'ISO',
    units: 'mm',
    scale: 1.0,
    show_gdt: true,
    show_dimensions: true,
  }), []);

  const [settings, setSettings] = useState(defaultSettings);

  const onFileSelected = (file) => {
    setSelectedFile(file);
  };

  const onStart = async () => {
    if (!selectedFile) return;
    setError('');
    setBusy(true);
    try {
      // 1) upload
      const uploadRes = await uploadFile(selectedFile);
      const fileId = uploadRes?.fileId || uploadRes?.id || uploadRes?.uuid;
      // 2) convert
      const convertPayload = { fileId, settings };
      const jobRes = await startConversion(convertPayload);
      setJob(jobRes);
      const jobId = jobRes?.id || jobRes?.jobId;
      if (jobId) navigate(`/jobs/${jobId}`);
    } catch (e) {
      setError(e?.message || 'Failed to start conversion');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="card">
        <h2>Upload CAD Model</h2>
        <p className="help">Supported: .step, .stp, .iges, .igs, .stl</p>
        <UploadForm onFileSelected={onFileSelected} />
        <div className="actions" style={{ marginTop: 12 }}>
          <button className="btn" onClick={() => setShowSettings(true)}>Settings</button>
          <button className="btn primary" onClick={onStart} disabled={!selectedFile || busy}>{busy ? 'Starting...' : 'Start Conversion'}</button>
          <Link to="/dashboard" className="btn ghost">Cancel</Link>
        </div>
        {error ? <div className="badge err" style={{ marginTop: 10 }}>{error}</div> : null}
        {job ? <div className="badge ok" style={{ marginTop: 10 }}>Job created. Redirecting...</div> : null}
      </div>
      {showSettings ? (
        <ConversionSettingsModal
          initial={settings}
          onClose={() => setShowSettings(false)}
          onSave={(s) => { setSettings(s); setShowSettings(false); }}
        />
      ) : null}
    </div>
  );
}
