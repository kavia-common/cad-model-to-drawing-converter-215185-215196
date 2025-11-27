import React, { useRef, useState } from 'react';

const ALLOWED = ['.step', '.stp', '.iges', '.igs', '.stl'];

// PUBLIC_INTERFACE
export default function UploadForm({ onFileSelected }) {
  /** File input for supported CAD formats. */
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [err, setErr] = useState('');

  const onPick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const ext = '.' + (f.name.split('.').pop() || '').toLowerCase();
    if (!ALLOWED.includes(ext)) {
      setErr(`Unsupported file type: ${ext}`);
      onFileSelected?.(null);
      setFileName('');
      return;
    }
    setErr('');
    setFileName(f.name);
    onFileSelected?.(f);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED.join(',')}
        onChange={onPick}
        style={{ display: 'none' }}
        data-testid="file-input"
      />
      <div className="actions">
        <button className="btn" onClick={() => inputRef.current?.click()}>Choose File</button>
        <span className="help">{fileName || 'No file chosen'}</span>
      </div>
      {err ? <div className="badge err" role="alert" style={{ marginTop: 8 }}>{err}</div> : null}
    </div>
  );
}
