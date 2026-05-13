const useTweaks = (defaults) => {
  const [state, setState] = React.useState(() => {
    try {
      const saved = localStorage.getItem('thulaim-tweaks');
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch { return defaults; }
  });
  const setTweak = (key, val) => setState(prev => {
    const next = { ...prev, [key]: val };
    try { localStorage.setItem('thulaim-tweaks', JSON.stringify(next)); } catch {}
    return next;
  });
  return [state, setTweak];
};

const TweaksPanel = ({ title = 'Tweaks', children }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ position: 'fixed', bottom: 80, left: 16, zIndex: 9999, direction: 'ltr' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: 40, height: 40, borderRadius: '50%',
          background: '#2a2620', color: '#f9f1e8', border: 'none',
          cursor: 'pointer', fontSize: 16, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,.3)',
        }}
      >⚙</button>
      {open && (
        <div style={{
          position: 'absolute', bottom: 48, left: 0,
          background: '#fff', border: '1px solid #e0d8ce',
          borderRadius: 6, padding: '14px 16px', minWidth: 220,
          boxShadow: '0 4px 24px rgba(0,0,0,.12)',
        }}>
          <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 12, marginBottom: 12, color: '#2a2620' }}>{title}</div>
          {children}
        </div>
      )}
    </div>
  );
};

const TweakSection = ({ title, children }) => (
  <div style={{ marginBottom: 12 }}>
    <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 10, color: '#939580', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>{title}</div>
    {children}
  </div>
);

const TweakRadio = ({ label, value, options, onChange }) => (
  <div style={{ marginBottom: 8 }}>
    <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 11, color: '#605f4b', marginBottom: 4 }}>{label}</div>
    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          style={{
            padding: '4px 10px', fontSize: 11, fontFamily: 'Cairo, sans-serif',
            background: value === opt.value ? '#2a2620' : '#f5f0ea',
            color: value === opt.value ? '#f9f1e8' : '#2a2620',
            border: `1px solid ${value === opt.value ? '#2a2620' : '#ddd'}`,
            borderRadius: 3, cursor: 'pointer',
          }}
        >{opt.label}</button>
      ))}
    </div>
  </div>
);

Object.assign(window, { useTweaks, TweaksPanel, TweakSection, TweakRadio });
