import React, { useMemo, useState } from 'react';

const ALL_VIEWS = ['front', 'top', 'right', 'isometric'];

// PUBLIC_INTERFACE
export default function ConversionSettingsModal({ initial, onSave, onClose }) {
  /** Modal for conversion settings. */
  const init = useMemo(() => initial || {
    views: ['front', 'top', 'right', 'isometric'],
    projection: 'ISO',
    units: 'mm',
    scale: 1.0,
    show_gdt: true,
    show_dimensions: true,
  }, [initial]);

  const [views, setViews] = useState(init.views || []);
  const [projection, setProjection] = useState(init.projection || 'ISO');
  const [units, setUnits] = useState(init.units || 'mm');
  const [scale, setScale] = useState(init.scale || 1);
  const [showGDT, setShowGDT] = useState(!!init.show_gdt);
  const [showDim, setShowDim] = useState(!!init.show_dimensions);

  const toggleView = (v) => {
    setViews((prev) => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
  };

  const save = () => {
    onSave?.({
      views,
      projection,
      units,
      scale: Number(scale) || 1,
      show_gdt: showGDT,
      show_dimensions: showDim,
    });
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Conversion settings">
      <div className="modal">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 10 }}>
          <h2 style={{ margin: 0 }}>Conversion Settings</h2>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
        <div className="grid two" style={{ marginTop: 12 }}>
          <div className="card">
            <h3>Views</h3>
            <div className="actions" style={{ flexWrap: 'wrap' }}>
              {ALL_VIEWS.map(v => (
                <label key={v} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" checked={views.includes(v)} onChange={() => toggleView(v)} />
                  {v}
                </label>
              ))}
            </div>
            <p className="help">Select which views to include in the drawing.</p>
          </div>
          <div className="card">
            <h3>Standards</h3>
            <label>
              Projection
              <select value={projection} onChange={(e) => setProjection(e.target.value)}>
                <option value="ISO">ISO (First angle)</option>
                <option value="ANSI">ANSI (Third angle)</option>
              </select>
            </label>
            <div style={{ height: 8 }} />
            <label>
              Units
              <select value={units} onChange={(e) => setUnits(e.target.value)}>
                <option value="mm">Millimeters (mm)</option>
                <option value="inch">Inches (in)</option>
              </select>
            </label>
            <div style={{ height: 8 }} />
            <label>
              Scale
              <input className="input" type="number" min="0.01" step="0.01" value={scale} onChange={(e) => setScale(e.target.value)} />
            </label>
          </div>
        </div>
        <div className="card" style={{ marginTop: 12 }}>
          <h3>Annotations</h3>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={showGDT} onChange={(e) => setShowGDT(e.target.checked)} />
            Include GD&T
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="checkbox" checked={showDim} onChange={(e) => setShowDim(e.target.checked)} />
            Include Dimensions
          </label>
        </div>
        <div className="actions" style={{ marginTop: 12 }}>
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn primary" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
}
