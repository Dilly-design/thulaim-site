/*
  Font strategy:
  TSD → TST → serif   (Display: عناوين — يستخدم TST حتى تُضاف ملفات TSD)
  TST → serif          (Text: نصوص)
  TSANS → system-ui   (Sans: UI elements — يستخدم system-ui حتى تُضاف ملفات TSANS)
*/
const F = {
  display: "'TSD', 'TST', serif",
  text:    "'TST', serif",
  sans:    "'TSANS', system-ui, -apple-system, 'Segoe UI', sans-serif",
};

const C = {
  cream:    '#f9f1e8',
  creamD:   '#ede4d8',
  ink:      '#2a2620',
  green:    '#605f4b',
  greenL:   '#939580',
  beige:    '#c2a480',
  beigeL:   '#dac8b3',
  burgundy: '#a0373d',
  border:   'rgba(96,95,75,.14)',
  borderD:  'rgba(194,164,128,.18)',
};

/* ── Btn ── */
const Btn = ({ kind = 'primary', size = 'md', children, onClick, type, style }) => {
  const [hov, setHov] = React.useState(false);
  const sizes = {
    sm: { padding: '10px 22px', fontSize: 12, letterSpacing: '0.08em' },
    md: { padding: '14px 32px', fontSize: 13, letterSpacing: '0.08em' },
    lg: { padding: '18px 44px', fontSize: 14, letterSpacing: '0.08em' },
  };
  const v = {
    primary:  { bg: hov ? '#3d3830' : C.ink,      fg: C.cream,    bd: 'none' },
    burgundy: { bg: hov ? '#8a2f33' : C.burgundy, fg: C.cream,    bd: 'none' },
    ghost:    { bg: hov ? C.ink : 'transparent',  fg: hov ? C.cream : C.ink, bd: `1px solid ${C.ink}` },
    'ghost-light': { bg: hov ? 'rgba(249,241,232,.12)' : 'transparent', fg: C.cream, bd: '1px solid rgba(249,241,232,.3)' },
    outline:  { bg: 'transparent', fg: C.ink, bd: `1px solid ${C.beige}` },
    cream:    { bg: hov ? C.creamD : C.cream, fg: C.ink, bd: 'none' },
    beige:    { bg: 'transparent', fg: C.beige, bd: `1px solid ${C.beige}` },
  };
  const s = v[kind] || v.primary;
  return (
    <button type={type} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: F.sans, fontWeight: 600, textTransform: 'uppercase',
        borderRadius: 0, cursor: 'pointer', transition: 'all .25s',
        display: 'inline-flex', alignItems: 'center', gap: 10,
        background: s.bg, color: s.fg, border: s.bd,
        ...sizes[size], ...style,
      }}
    >{children}</button>
  );
};

/* ── Eyebrow ── */
const Eyebrow = ({ children, color = C.burgundy, light }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18,
    fontFamily: F.sans, fontSize: 10, fontWeight: 700,
    letterSpacing: '0.22em', textTransform: 'uppercase',
    color: light ? 'rgba(249,241,232,.5)' : color,
  }}>
    <span style={{ width: 24, height: 1, background: 'currentColor', flexShrink: 0 }} />
    {children}
    <span style={{ width: 24, height: 1, background: 'currentColor', flexShrink: 0 }} />
  </div>
);

/* ── SectionHeader ── */
const SectionHeader = ({ eyebrow, title, en, sub, align = 'right', maxWidth = 720, light }) => (
  <div style={{
    maxWidth, marginBottom: 56,
    textAlign: align === 'center' ? 'center' : 'right',
    marginRight: align === 'center' ? 'auto' : 0,
    marginLeft: align === 'center' ? 'auto' : 0,
  }}>
    {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
    <h2 style={{
      fontFamily: F.display, fontWeight: 900,
      fontSize: 'clamp(34px, 4.5vw, 64px)', lineHeight: 1.1,
      color: light ? C.cream : C.ink,
      marginBottom: (en || sub) ? 12 : 0,
      letterSpacing: '-0.01em',
    }}>{title}</h2>
    {en && (
      <div style={{
        fontFamily: F.display, fontStyle: 'italic', fontWeight: 300,
        fontSize: 'clamp(14px, 1.5vw, 18px)',
        color: light ? 'rgba(194,164,128,.7)' : C.greenL,
        marginBottom: sub ? 20 : 0, letterSpacing: '0.04em',
      }}>{en}</div>
    )}
    {sub && (
      <p style={{ fontFamily: F.text, fontWeight: 300, fontSize: 17, lineHeight: 1.95, color: light ? C.beigeL : C.green }}>
        {sub}
      </p>
    )}
  </div>
);

/* ── Photo placeholder ── */
const toneGrad = {
  green: ['rgba(96,95,75,.12)',   'rgba(42,38,32,.55)'],
  beige: ['rgba(194,164,128,.18)','rgba(96,95,75,.5)'],
  cream: ['rgba(194,164,128,.15)','rgba(96,95,75,.35)'],
  ink:   ['rgba(42,38,32,.7)',    'rgba(42,38,32,.95)'],
  burg:  ['rgba(160,55,61,.15)',  'rgba(42,38,32,.75)'],
};

/*
  Props:
  - src: real image URL — omit for gradient placeholder
  - contain: true = object-fit:contain with cream bg (for menu/text images)
  - loading: 'lazy' (default) | 'eager' (hero/above-fold)
  - alt: SEO alt text (falls back to label)
  - objectPosition: used only when contain=false
*/
const Photo = ({
  ratio = '4/3',
  label,
  tone = 'ink',
  radius = 0,
  style,
  src,
  objectPosition = 'center',
  contain = false,
  loading = 'lazy',
  alt,
}) => {
  const [a, b] = toneGrad[tone] || toneGrad.ink;

  if (src) {
    return (
      <div style={{
        aspectRatio: ratio,
        borderRadius: radius,
        position: 'relative',
        overflow: 'hidden',
        background: contain ? '#f7f3ec' : undefined,
        ...style,
      }}>
        <img
          src={src}
          alt={alt || label || ''}
          loading={loading}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: contain ? 'contain' : 'cover',
            objectPosition: contain ? 'center' : objectPosition,
            display: 'block',
            maxWidth: '100%',
          }}
        />
        {label && !contain && (
          <div style={{
            position: 'absolute', bottom: 14, right: 16,
            fontFamily: F.sans, fontSize: 9, fontWeight: 700,
            color: 'rgba(249,241,232,.75)', letterSpacing: '0.14em', textTransform: 'uppercase',
            textShadow: '0 1px 4px rgba(0,0,0,.6)',
          }}>{label}</div>
        )}
        {label && contain && (
          <div style={{
            position: 'absolute', bottom: 0, right: 0, left: 0,
            padding: '24px 12px 12px',
            background: 'linear-gradient(to top, rgba(247,243,236,.96) 30%, transparent 100%)',
            fontFamily: F.sans, fontSize: 9, fontWeight: 700,
            color: C.greenL, letterSpacing: '0.16em', textTransform: 'uppercase',
            textAlign: 'center',
          }}>{label}</div>
        )}
      </div>
    );
  }

  return (
    <div style={{
      aspectRatio: ratio,
      background: `linear-gradient(160deg, ${a} 0%, ${b} 100%)`,
      borderRadius: radius, position: 'relative', overflow: 'hidden',
      ...style,
    }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: .06,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px',
      }} />
      {label && (
        <div style={{
          position: 'absolute', bottom: 14, right: 16,
          fontFamily: F.sans, fontSize: 9, fontWeight: 700,
          color: 'rgba(249,241,232,.5)', letterSpacing: '0.14em', textTransform: 'uppercase',
        }}>{label}</div>
      )}
    </div>
  );
};

/* ── Logo ── */
const Logo = ({ light = false, height = 36 }) => {
  const [imgFailed, setImgFailed] = React.useState(false);
  const src = light ? 'assets/logo-light.png' : 'assets/logo-dark.png';
  if (!imgFailed) {
    return (
      <div style={{ height, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <img
          src={src}
          alt="ثُليم"
          onError={() => setImgFailed(true)}
          style={{ height: '100%', width: 'auto', display: 'block', objectFit: 'contain' }}
        />
      </div>
    );
  }
  return (
    <div style={{ height, display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
      <span style={{
        fontFamily: F.display, fontWeight: 900, fontSize: height * 0.82,
        color: light ? C.cream : C.ink, letterSpacing: '-0.01em', lineHeight: 1,
      }}>ثُليم</span>
      <span style={{
        display: 'flex', flexDirection: 'column', gap: 3, flexShrink: 0, paddingBottom: 1,
      }}>
        <span style={{
          fontFamily: F.text, fontStyle: 'italic', fontWeight: 300,
          fontSize: height * 0.32, color: light ? 'rgba(194,164,128,.65)' : C.greenL,
          letterSpacing: '0.12em', lineHeight: 1, display: 'block',
        }}>Thulaim</span>
        <span style={{
          width: '100%', height: 1,
          background: light ? 'rgba(194,164,128,.2)' : C.border,
          display: 'block',
        }} />
      </span>
    </div>
  );
};

/* ── Diamond ── */
const Diamond = ({ size = 5, color = C.beige }) => (
  <span style={{
    display: 'inline-block', width: size, height: size,
    background: color, transform: 'rotate(45deg)', flexShrink: 0,
  }} />
);

/* ── Rule ── */
const Rule = ({ color = C.border, style }) => (
  <div style={{ width: '100%', height: 1, background: color, ...style }} />
);

/* ── Container ── */
const Container = ({ children, maxWidth = 1280, style }) => (
  <div style={{ maxWidth, margin: '0 auto', padding: '0 clamp(24px, 5vw, 96px)', ...style }}>
    {children}
  </div>
);

/* ── useIsMobile ── */
const useIsMobile = (bp = 768) => {
  const [w, setW] = React.useState(window.innerWidth);
  React.useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, []);
  return w < bp;
};

Object.assign(window, { F, C, Btn, Eyebrow, SectionHeader, Photo, Logo, Diamond, Rule, Container, toneGrad, useIsMobile });
