/* ══════════════════════════════
   NAV
══════════════════════════════ */
const Nav = ({ onBook }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = [
    { label: 'خدماتنا', id: 'services' },
    { label: 'قصتنا', id: 'story' },
    { label: 'أسئلة', id: 'faq' },
  ];
  return (
    <nav style={{
      position: 'fixed', top: 0, right: 0, left: 0, zIndex: 1000,
      transition: 'background .4s, border-color .4s',
      background: scrolled ? 'rgba(249,241,232,.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: `1px solid ${scrolled ? C.border : 'transparent'}`,
    }}>
      <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <Logo height={30} light={!scrolled} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {links.map(l => (
            <button key={l.id} className="nav-lnk"
              onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                fontFamily: F.sans, fontSize: 11, fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: C.green, background: 'none', border: 'none', cursor: 'pointer',
                display: 'none', transition: 'color .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = C.ink}
              onMouseLeave={e => e.currentTarget.style.color = C.green}
            >{l.label}</button>
          ))}
          <Btn kind="primary" size="sm" onClick={onBook}>اطلب ضيافتك</Btn>
        </div>
      </Container>
      <style>{`@media(min-width:900px){.nav-lnk{display:block!important}}`}</style>
    </nav>
  );
};

/* ══════════════════════════════
   HERO
══════════════════════════════ */
const Hero = ({ onBook, onMenu, tone = 'ink' }) => {
  const dark    = tone === 'ink';
  const bg      = dark ? C.ink   : C.cream;
  const fg      = dark ? C.cream : C.ink;
  const mobile  = useIsMobile();
  return (
    <section style={{
      background: bg, minHeight: '100vh', paddingTop: 72,
      display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
    }}>
      {dark && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(194,164,128,.06) 0%, transparent 70%)',
        }} />
      )}

      <Container style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(48px,9vh,120px) clamp(24px,5vw,96px)' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: mobile ? 36 : 52 }}>
          <span style={{ width: 40, height: 1, background: dark ? C.beige : C.burgundy }} />
          <span style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: dark ? C.beige : C.burgundy }}>ثُليم ✦ الرياض</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : '1fr auto',
          gap: mobile ? 0 : 80, alignItems: 'end',
        }}>
          <h1 style={{
            fontFamily: F.display, fontWeight: 900, margin: 0,
            fontSize: mobile ? 'clamp(36px,10vw,60px)' : 'clamp(40px, 5.5vw, 84px)',
            lineHeight: 1.08, color: fg, letterSpacing: '-0.02em',
          }}>
            ضيافة سعودية فاخرة<br />
            <span style={{ color: dark ? C.beige : C.burgundy }}>للمناسبات والولائم</span><br />
            في الرياض
          </h1>

          {!mobile && (
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 32,
              borderRight: `1px solid ${dark ? 'rgba(194,164,128,.15)' : C.border}`,
              paddingRight: 28, alignSelf: 'stretch', justifyContent: 'flex-end', paddingBottom: 8,
            }}>
              {[
                { n: '+٢٠٠', l: 'مناسبة نُفِّذت' },
                { n: '٤٨س', l: 'أقصى رد' },
                { n: '٩٨٪', l: 'رضا العملاء' },
              ].map(t => (
                <div key={t.n} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: F.display, fontWeight: 900, fontSize: 28,
                    color: dark ? C.beige : C.burgundy, lineHeight: 1 }}>{t.n}</div>
                  <div style={{ fontFamily: F.sans, fontSize: 9, fontWeight: 600,
                    color: dark ? 'rgba(194,164,128,.5)' : C.greenL,
                    letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4 }}>{t.l}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: mobile ? 14 : 28, marginTop: mobile ? 36 : 56,
          paddingTop: mobile ? 24 : 32, borderTop: `1px solid ${dark ? 'rgba(249,241,232,.08)' : C.border}`,
          flexWrap: 'wrap',
        }}>
          <Btn kind={dark ? 'cream' : 'primary'} size={mobile ? 'md' : 'lg'} onClick={onBook}>اطلب ضيافتك</Btn>
          {!mobile && <Btn kind={dark ? 'ghost-light' : 'ghost'} size="lg" onClick={onBook}>صمّم قائمتك</Btn>}
          <a href="https://wa.me/966539446123" target="_blank" rel="noreferrer"
            style={{
              fontFamily: F.sans, fontSize: 11, fontWeight: 700,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: dark ? C.beige : C.green,
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >تواصل عبر واتساب <span style={{ fontSize: 14 }}>↗</span></a>
        </div>

        <p style={{
          fontFamily: F.text, fontWeight: 300, fontSize: mobile ? 15 : 16, lineHeight: 1.95,
          color: dark ? 'rgba(218,200,179,.6)' : C.green,
          maxWidth: 520, marginTop: 20,
        }}>
          ثُليم يصمّم وينفّذ ضيافة سعودية فاخرة للبيوت، الشركات، المناسبات العائلية، والولائم الخاصة.
        </p>
      </Container>

      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr 1fr' : '2fr 1fr 1fr',
        height: mobile ? 'clamp(120px,18vh,180px)' : 'clamp(160px,22vh,280px)',
      }}>
        <Photo src="assets/photo-hall.jpg"    alt="قاعة وليمة ثُليم الفاخرة"     loading="eager" style={{ height: '100%', aspectRatio: 'unset' }} />
        <Photo src="assets/photo-setting.jpg" alt="إعداد طاولة ضيافة ثُليم"      loading="eager" style={{ height: '100%', aspectRatio: 'unset' }} />
        {!mobile && <Photo src="assets/photo-venue.jpg" alt="أجواء حفل ضيافة ثُليم" loading="eager" style={{ height: '100%', aspectRatio: 'unset' }} />}
      </div>
    </section>
  );
};

/* ══════════════════════════════
   HERITAGE STRIP
══════════════════════════════ */
const HeritageStrip = () => {
  const mobile = useIsMobile();
  const stats = [
    { n: '+١٥٠٠٠', sub: 'ضيف يومياً', desc: 'كان يستقبلهم مضيف ثُليم التاريخي' },
    { n: '٨٥', sub: 'سنة من الإرث', desc: 'يستلهم منها ثُليم قيم ضيافتنا اليوم' },
    { n: '٣', sub: 'أقسام ضيافة', desc: 'للبادية والحضر وكبار الوفود' },
  ];
  const cols = mobile
    ? '1fr'
    : '1fr 1px 1fr 1px 1fr';
  const items = mobile
    ? stats
    : [stats[0], null, stats[1], null, stats[2]];
  return (
    <section style={{
      background: C.ink, borderTop: '1px solid rgba(194,164,128,.08)',
      padding: 'clamp(48px,8vh,100px) 0', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
        background: `linear-gradient(to bottom, transparent, ${C.beige}, transparent)`,
      }} />
      <Container>
        <div style={{
          display: 'grid',
          gridTemplateColumns: cols,
          gap: 0,
          alignItems: 'center',
        }}>
          {items.map((item, i) => {
            if (!item) return (
              <div key={i} style={{ height: mobile ? 56 : 64, width: 1, background: 'rgba(194,164,128,.1)', justifySelf: 'center' }} />
            );
            return (
              <div key={i} style={{
                padding: `0 clamp(16px, ${mobile ? '4vw' : '3vw'}, 48px)`,
                textAlign: 'center',
                paddingTop: mobile ? 28 : 0,
                paddingBottom: mobile ? 28 : 0,
                borderBottom: mobile && i < items.length - 1 ? '1px solid rgba(194,164,128,.1)' : 'none',
              }}>
                <div style={{
                  fontFamily: F.display, fontWeight: 900,
                  fontSize: mobile ? 'clamp(28px, 8vw, 44px)' : 'clamp(32px, 4vw, 52px)',
                  color: C.beige, lineHeight: 1, marginBottom: 8,
                }}>{item.n}</div>
                <div style={{
                  fontFamily: F.sans, fontWeight: 700, fontSize: 9,
                  color: 'rgba(194,164,128,.6)', letterSpacing: '0.18em',
                  textTransform: 'uppercase', marginBottom: 6,
                }}>{item.sub}</div>
                {!mobile && (
                  <div style={{
                    fontFamily: F.text, fontWeight: 300, fontSize: 12,
                    color: 'rgba(147,149,128,.45)', lineHeight: 1.7,
                  }}>{item.desc}</div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

/* ══════════════════════════════
   PROCESS
══════════════════════════════ */
const Process = ({ onBook }) => {
  const mobile = useIsMobile();
  const steps = [
    { n: '٠١', t: 'أخبرنا عن مناسبتك', d: 'تواصل معنا عبر نموذج الحجز أو واتساب — أخبرنا عن عدد ضيوفك والتاريخ.', icon: '◈' },
    { n: '٠٢', t: 'نبني قائمتك معك', d: 'نصمم لك قائمة مخصصة من مطبخنا بناءً على مناسبتك وذوقك وميزانيتك.', icon: '✦' },
    { n: '٠٣', t: 'نحضر ونترتّب', d: 'يصل فريقنا قبل ضيوفك. نُجهّز، نُرتّب، ونقدّم. أنت تستمتع فقط.', icon: '◉' },
  ];
  return (
    <section style={{ background: C.creamD, padding: 'clamp(72px,13vh,160px) 0' }}>
      <Container>
        <SectionHeader eyebrow="كيف نعمل" title="ثلاث خطوات فقط" en="Three Simple Steps" align="center" maxWidth={480} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 0, position: 'relative', maxWidth: 900, margin: '0 auto',
        }}>
          {!mobile && (
            <div style={{
              position: 'absolute', top: 28, right: '16.66%', left: '16.66%', height: 1,
              background: `linear-gradient(to left, ${C.border}, ${C.beige}, ${C.border})`,
              zIndex: 0,
            }} />
          )}
          {steps.map((s, i) => (
            <div key={i} style={{
              padding: mobile ? '28px 0' : 'clamp(28px, 4vw, 52px)',
              textAlign: mobile ? 'right' : 'center',
              position: 'relative', zIndex: 1,
              display: mobile ? 'flex' : 'block', gap: mobile ? 20 : 0, alignItems: mobile ? 'flex-start' : 'center',
              borderBottom: mobile && i < steps.length - 1 ? `1px solid ${C.border}` : 'none',
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                margin: mobile ? '4px 0 0' : '0 auto 28px',
                background: C.ink, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${C.beige}`, flexShrink: 0,
              }}>
                <span style={{ fontFamily: F.text, fontSize: 18, color: C.beige }}>{s.icon}</span>
              </div>
              <div>
                <div style={{
                  fontFamily: F.sans, fontSize: 9, fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: C.beige, marginBottom: 10,
                }}>{s.n}</div>
                <div style={{
                  fontFamily: F.display, fontWeight: 700, fontSize: 19,
                  color: C.ink, marginBottom: 12, lineHeight: 1.3,
                }}>{s.t}</div>
                <p style={{
                  fontFamily: F.text, fontWeight: 300, fontSize: 14,
                  lineHeight: 1.9, color: C.green, margin: 0,
                }}>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Btn kind="primary" size="lg" onClick={onBook}>اطلب ضيافتك</Btn>
        </div>
      </Container>
    </section>
  );
};

/* ══════════════════════════════
   SERVICES
══════════════════════════════ */
const SERVICES = [
  { ar: 'مناسبات نسائية', en: 'Ladies Events',           desc: 'ضيافة راقية تليق بأجواء المناسبات النسائية الخاصة والحفلات.' },
  { ar: 'مناسبات رجالية', en: "Gentlemen's Gatherings",  desc: 'ولائم وبوفيهات بمستوى يعكس شرف الضيافة السعودية الأصيلة.' },
  { ar: 'ضيافة شركات',   en: 'Corporate Hospitality',   desc: 'اجتماعات ومؤتمرات وفعاليات الشركات بتنفيذ محترف ودقيق.' },
  { ar: 'مناسبات عائلية',en: 'Family Occasions',        desc: 'أعراس وخطوبات ومناسبات العائلة بروح الكرم السعودي.' },
  { ar: 'تجارب مخصّصة', en: 'Bespoke Experiences',     desc: 'قوائم وأجواء مصمّمة تماماً حسب طبيعة مناسبتك.' },
];

const Services = () => {
  const mobile = useIsMobile();
  const cols = mobile ? 1 : 3;
  return (
    <section id="services" style={{ background: C.cream, padding: 'clamp(72px,13vh,160px) 0' }}>
      <Container>
        <SectionHeader eyebrow="خدماتنا" title="ضيافة لكل مناسبة" en="A Service for Every Occasion" maxWidth={600} />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 1, border: `1px solid ${C.border}` }}>
          {SERVICES.map((s, i) => (
            <div key={i}
              style={{
                padding: mobile ? '28px 24px' : '40px 36px',
                borderLeft: !mobile && i % 3 !== 0 ? `1px solid ${C.border}` : 'none',
                borderBottom: !mobile ? (i < 3 ? `1px solid ${C.border}` : 'none') : (i < SERVICES.length - 1 ? `1px solid ${C.border}` : 'none'),
                cursor: 'default', transition: 'background .25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.creamD; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{ fontFamily: F.sans, fontSize: 9, fontWeight: 700,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: C.beige, marginBottom: 14 }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: mobile ? 19 : 22,
                color: C.ink, marginBottom: 6, lineHeight: 1.2 }}>{s.ar}</div>
              <div style={{ fontFamily: F.display, fontStyle: 'italic', fontWeight: 300,
                fontSize: 13, color: C.greenL, marginBottom: 16 }}>{s.en}</div>
              <Rule color={C.border} style={{ marginBottom: 16 }} />
              <p style={{ fontFamily: F.text, fontWeight: 300, fontSize: 14,
                lineHeight: 1.85, color: C.green, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

/* ══════════════════════════════
   PHILOSOPHY
══════════════════════════════ */
const Philosophy = () => {
  const mobile = useIsMobile();
  return (
    <section style={{ background: C.ink, padding: 'clamp(72px,13vh,160px) 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '-2%', left: '2%',
        fontFamily: F.display, fontWeight: 900, fontSize: 'clamp(200px,30vw,480px)',
        color: 'rgba(194,164,128,.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      }}>"</div>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 48 : 96, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 700,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'rgba(194,164,128,.4)', marginBottom: 24 }}>هويتنا</div>
            {[
              { t: 'هادئ',  d: 'بلا ضجيج بصري — كل عنصر له غرض واضح.' },
              { t: 'مدروس', d: 'كل تفصيل يُختار بوعي، لا بالصدفة.' },
              { t: 'موثوق', d: 'دقة التنفيذ في كل مناسبة، بلا استثناء.' },
              { t: 'عريق',  d: 'إرث حضاري راسخ يُلهم كل تجربة نُقدّمها.' },
            ].map((v, i) => (
              <div key={i} style={{
                display: 'flex', gap: 24, alignItems: 'flex-start',
                padding: '24px 0', borderBottom: '1px solid rgba(194,164,128,.1)',
              }}>
                <span style={{ fontFamily: F.sans, fontSize: 9, fontWeight: 700,
                  color: 'rgba(194,164,128,.35)', letterSpacing: '0.1em',
                  flexShrink: 0, paddingTop: 4 }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 20,
                    color: C.beige, marginBottom: 6 }}>{v.t}</div>
                  <div style={{ fontFamily: F.text, fontWeight: 300, fontSize: 14,
                    lineHeight: 1.8, color: 'rgba(147,149,128,.7)' }}>{v.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <Eyebrow light>فلسفتنا</Eyebrow>
            <h2 style={{
              fontFamily: F.display, fontWeight: 900,
              fontSize: 'clamp(32px, 4.5vw, 64px)', color: C.cream,
              lineHeight: 1.1, marginBottom: 28, letterSpacing: '-0.02em',
            }}>
              لسنا مجرد مزوّد طعام.<br />
              <span style={{ color: C.beige }}>نحن نصمّم</span><br />
              حضور الضيافة.
            </h2>
            <p style={{ fontFamily: F.text, fontWeight: 300, fontSize: mobile ? 15 : 17,
              lineHeight: 1.95, color: 'rgba(218,200,179,.7)', marginBottom: 36 }}>
              معيارنا ليس أن نُشبع الضيوف فقط — بل أن تحضر الضيافة بكل تفاصيلها: الرائحة، والترتيب، والتوقيت، والأثر.
            </p>
            <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 600,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'rgba(194,164,128,.4)', marginBottom: 12 }}>جذورنا</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <Diamond size={4} color="rgba(194,164,128,.3)" />
              <span style={{ fontFamily: F.text, fontStyle: 'italic', fontWeight: 300,
                fontSize: 16, color: 'rgba(194,164,128,.45)', letterSpacing: '0.04em' }}>مضيف ثُليم — الرياض ١٩٤٠م</span>
            </div>
          </div>
        </div>

        {/* ── معاييرنا — merged ── */}
        <div style={{ borderTop: '1px solid rgba(194,164,128,.1)', paddingTop: 'clamp(48px,7vh,80px)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16,
            marginBottom: 40,
            fontFamily: F.sans, fontSize: 10, fontWeight: 700,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(194,164,128,.4)',
          }}>
            <span style={{ width: 24, height: 1, background: 'rgba(194,164,128,.3)' }} />
            معاييرنا
            <span style={{ width: 24, height: 1, background: 'rgba(194,164,128,.3)' }} />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: 1, border: '1px solid rgba(194,164,128,.1)',
          }}>
            {[
              { t: 'فريق خاص بك',    d: 'تُعيَّن لك فريقاً من أول تواصل وحتى نهاية المناسبة.' },
              { t: 'كل شيء مكتوب',   d: 'اتفاق مفصَّل على القائمة والعدد والتوقيت — لا مفاجآت.' },
              { t: 'نصل قبل ضيوفك',  d: 'الإعداد يبدأ بساعات قبل أول ضيف يطرق الباب.' },
              { t: '٤٠ نقطة تحقق',   d: 'قائمة فحص شاملة لكل مناسبة — لا يُنسى فيها شيء.' },
              { t: 'قائمة من الصفر',  d: 'لا قوائم جاهزة — كل مناسبة تُصمَّم لك من البداية.' },
              { t: 'للبيت والشركة',   d: 'خبرة في المجالسات العائلية والفعاليات الرسمية الكبرى.' },
            ].map((item, i) => {
              const cols = mobile ? 2 : 3;
              return (
                <div key={i} style={{
                  padding: mobile ? '24px 20px' : '32px 28px',
                  borderLeft: i % cols !== 0 ? '1px solid rgba(194,164,128,.1)' : 'none',
                  borderBottom: i < 6 - cols ? '1px solid rgba(194,164,128,.1)' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <Diamond size={5} color="rgba(194,164,128,.45)" />
                    <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: mobile ? 15 : 17, color: C.cream }}>{item.t}</span>
                  </div>
                  <p style={{ fontFamily: F.text, fontWeight: 300, fontSize: 13,
                    lineHeight: 1.85, color: 'rgba(147,149,128,.6)', margin: 0 }}>{item.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

/* Trust — merged into Philosophy */
const Trust = () => null;

/* ══════════════════════════════
   TESTIMONIALS
══════════════════════════════ */
const Testimonials = () => {
  const mobile = useIsMobile();
  const testimonials = [
    { q: 'الضيافة كانت على مستوى لا يُوصف — كل تفصيل كان مقصوداً ومرتّباً. الضيوف ما زالوا يتحدثون عنها.', n: 'أم عبدالعزيز', o: 'مناسبة عائلية' },
    { q: 'استخدمنا ثُليم لفعالية شركتنا وكانت المفاجأة الحقيقية للضيوف. التنفيذ كان بمستوى خمس نجوم.', n: 'م. سلطان الشمري', o: 'فعالية شركة' },
    { q: 'رمضان هذا العام مع ثُليم كان مختلفاً تماماً. إحساس الكرم الحقيقي يظهر في كل تفصيل صغير.', n: 'أبو فيصل', o: 'إفطار رمضاني' },
  ];
  return (
    <section id="testimonials" style={{ background: C.ink, padding: 'clamp(72px,13vh,160px) 0' }}>
      <Container>
        <SectionHeader eyebrow="يقولون عنّا" title="تجارب تُروى" en="Experiences Worth Telling" light maxWidth={500} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 1, border: '1px solid rgba(194,164,128,.12)',
        }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              padding: mobile ? '32px 24px' : '44px 36px', position: 'relative',
              borderLeft: !mobile && i > 0 ? '1px solid rgba(194,164,128,.12)' : 'none',
              borderBottom: mobile && i < testimonials.length - 1 ? '1px solid rgba(194,164,128,.12)' : 'none',
            }}>
              <div style={{
                fontFamily: F.display, fontSize: 64, fontWeight: 900, lineHeight: .6,
                color: C.beige, opacity: .2, marginBottom: 20, display: 'block',
              }}>"</div>
              <p style={{ fontFamily: F.text, fontWeight: 300, fontSize: mobile ? 15 : 16,
                lineHeight: 1.9, color: 'rgba(249,241,232,.75)', marginBottom: 28 }}>{t.q}</p>
              <div style={{ borderTop: '1px solid rgba(194,164,128,.12)', paddingTop: 18 }}>
                <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 12,
                  color: C.beige, letterSpacing: '0.08em' }}>{t.n}</div>
                <div style={{ fontFamily: F.sans, fontSize: 10, color: 'rgba(147,149,128,.5)',
                  letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{t.o}</div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

/* ══════════════════════════════
   FAQ
══════════════════════════════ */
const FAQ = () => {
  const [open, setOpen] = React.useState(null);
  const items = [
    { q: 'كم تبلغ أسعار ضيافة ثُليم؟', a: 'تختلف الأسعار بحسب عدد الضيوف، نوع المناسبة، والأصناف المختارة. نقدم عروضاً تبدأ من باقة ٢٠ ضيفاً. تواصل معنا للحصول على سعر دقيق يناسب مناسبتك.' },
    { q: 'كيف أحجز مع ثُليم؟', a: 'تواصل معنا عبر نموذج الحجز في الموقع أو عبر واتساب مباشرة. نرد خلال ٢٤ ساعة لتأكيد التفاصيل وبدء بناء القائمة معك.' },
    { q: 'هل يمكن تخصيص القائمة بالكامل؟', a: 'نعم، بالكامل. كل مناسبة تُبنى قائمتها من الصفر بناءً على عدد ضيوفك، طبيعة المناسبة، وذوقك الخاص. لا توجد قوائم جاهزة.' },
    { q: 'هل تقدمون ضيافة للشركات والفعاليات؟', a: 'نعم، ضيافة الشركات من خدماتنا الأساسية. نقدم بوفيهات الاجتماعات والمؤتمرات والفعاليات بمستوى يعكس احترافية شركتك.' },
    { q: 'هل تقدمون ضيافة للمناسبات الموسمية كرمضان والأعياد؟', a: 'نعم، نصمّم ضيافة المناسبات الموسمية بعناية خاصة — إفطار، سحور، عيد — بروح سعودية أصيلة تليق ببيتك أو شركتك.' },
    { q: 'كم من الوقت مسبقاً يجب الحجز؟', a: 'ننصح بالتواصل قبل ٧٢ ساعة على الأقل للمناسبات الصغيرة. للمناسبات الكبيرة والولائم ننصح بالحجز قبل أسبوع أو أكثر لضمان الجودة.' },
    { q: 'ماذا يشمل التجهيز والتقديم؟', a: 'يصل فريقنا قبل ضيوفك، يُجهّز طاولات الضيافة، ويُرتّب العرض بالكامل. بعد انتهاء المناسبة نتولى ترتيب وإزالة الأدوات. أنت تستمتع فقط.' },
    { q: 'ما الفرق بين ثُليم وخدمات الكيتارينق العادية؟', a: 'نحن لسنا مجرد مزوّد طعام. ثُليم يصمّم تجربة ضيافة متكاملة: القائمة، التقديم، الترتيب، والأثر. كل تفصيل مقصود ليعكس مستوى مناسبتك.' },
  ];
  const mobile = useIsMobile();
  return (
    <section id="faq" style={{ background: C.cream, padding: 'clamp(72px,13vh,160px) 0' }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1.8fr', gap: mobile ? 40 : 96 }}>
          <div style={{ position: mobile ? 'static' : 'sticky', top: 96, alignSelf: 'start' }}>
            <SectionHeader eyebrow="أسئلة شائعة" title="يسألوننا" en="Frequently Asked" maxWidth={360} />
            <p style={{ fontFamily: F.text, fontWeight: 300, fontSize: 15,
              lineHeight: 1.9, color: C.green, marginBottom: 32 }}>
              لم تجد إجابتك؟ راسلنا عبر واتساب وسنرد بشكل مباشر.
            </p>
            <a href="https://wa.me/966539446123" target="_blank" rel="noreferrer"
              style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 700,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: C.burgundy, display: 'inline-flex', alignItems: 'center', gap: 8 }}
            ><span style={{ width: 20, height: 1, background: C.burgundy }} /> تواصل عبر واتساب</a>
          </div>
          <div>
            {items.map((item, i) => (
              <div key={i} style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%', textAlign: 'right', padding: '24px 0',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontFamily: F.text, fontWeight: 500, fontSize: 17, color: C.ink,
                    background: 'none', border: 'none', cursor: 'pointer', gap: 16,
                  }}
                >
                  <span>{item.q}</span>
                  <span style={{
                    fontFamily: F.sans, color: C.beige, fontSize: 18, flexShrink: 0,
                    width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${C.border}`, borderRadius: 0,
                  }}>{open === i ? '−' : '+'}</span>
                </button>
                {open === i && (
                  <p style={{ fontFamily: F.text, fontWeight: 300, fontSize: 15,
                    lineHeight: 1.9, color: C.green, paddingBottom: 24, margin: 0 }}>{item.a}</p>
                )}
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${C.border}` }} />
          </div>
        </div>
      </Container>
    </section>
  );
};

/* CTABanner — removed per brand review */
const CTABanner = () => null;

/* ══════════════════════════════
   FOOTER
══════════════════════════════ */
const Footer = () => {
  const mobile = useIsMobile();
  return (
  <footer style={{ background: C.ink, padding: 'clamp(56px,10vh,120px) 0 0' }}>
    <Container>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : '1.6fr 1fr 1fr 1fr', gap: mobile ? '40px 24px' : 56, paddingBottom: mobile ? 40 : 64 }}>
        <div>
          <Logo light height={32} />
          <p style={{ fontFamily: F.text, fontWeight: 300, fontSize: 14, lineHeight: 1.95,
            color: 'rgba(147,149,128,.6)', marginTop: 24, maxWidth: 260 }}>
            بيت ضيافة سعودي حديث مستوحى من عراقة الكرم السعودي الأصيل. الرياض، المملكة العربية السعودية.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 28 }}>
            {[
              { label: 'Instagram', href: 'https://www.instagram.com/thulaimcatering/', icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              )},
              { label: 'TikTok', href: 'https://www.tiktok.com/@thulaimcatering/', icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.85 1.56V6.78a4.85 4.85 0 01-1.08-.09z"/></svg>
              )},
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                style={{
                  width: 36, height: 36, border: '1px solid rgba(194,164,128,.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(147,149,128,.45)', transition: 'all .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.beige; e.currentTarget.style.color = C.beige; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(194,164,128,.15)'; e.currentTarget.style.color = 'rgba(147,149,128,.45)'; }}
                aria-label={s.label}
              >{s.icon}</a>
            ))}
          </div>
        </div>
        {[
          { title: 'خدماتنا', links: [
            { l: 'مناسبات نسائية' }, { l: 'مناسبات رجالية' },
            { l: 'ضيافة شركات' }, { l: 'مناسبات عائلية' },
          ]},
          { title: 'استكشف', links: [
            { l: 'قصتنا', id: 'story' },
            { l: 'الأسئلة الشائعة', id: 'faq' },
          ]},
          { title: 'تواصل', links: [
            { l: 'واتساب', href: 'https://wa.me/966539446123' },
            { l: 'إنستغرام', href: 'https://www.instagram.com/thulaimcatering/' },
            { l: 'تيك توك', href: 'https://www.tiktok.com/@thulaimcatering/' },
            { l: 'الرياض، السعودية' },
          ]},
        ].map((col, i) => (
          <div key={i}>
            <div style={{ fontFamily: F.sans, fontWeight: 700, fontSize: 9,
              color: 'rgba(194,164,128,.5)', letterSpacing: '0.18em',
              textTransform: 'uppercase', marginBottom: 24 }}>{col.title}</div>
            {col.links.map(({ l, id, href }) => {
              const baseStyle = { fontFamily: F.text, fontWeight: 300, fontSize: 14,
                color: 'rgba(147,149,128,.55)', marginBottom: 12,
                transition: 'color .2s', cursor: (id || href) ? 'pointer' : 'default',
                display: 'block', textDecoration: 'none' };
              if (href) return (
                <a key={l} href={href} target="_blank" rel="noreferrer" style={baseStyle}
                  onMouseEnter={e => e.currentTarget.style.color = C.beige}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(147,149,128,.55)'}
                >{l}</a>
              );
              if (id) return (
                <div key={l} style={baseStyle}
                  onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                  onMouseEnter={e => e.currentTarget.style.color = C.beige}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(147,149,128,.55)'}
                >{l}</div>
              );
              return <div key={l} style={baseStyle}>{l}</div>;
            })}
          </div>
        ))}
      </div>
      <div style={{
        borderTop: '1px solid rgba(194,164,128,.08)', padding: '24px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ fontFamily: F.sans, fontSize: 10, color: 'rgba(147,149,128,.3)',
          letterSpacing: '0.08em' }}>© ٢٠٢٦ ثُليم</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Diamond size={4} color="rgba(194,164,128,.2)" />
          <span style={{ fontFamily: F.display, fontStyle: 'italic', fontWeight: 300,
            fontSize: 12, color: 'rgba(194,164,128,.2)' }}>Premium Saudi Hospitality</span>
          <Diamond size={4} color="rgba(194,164,128,.2)" />
        </div>
      </div>
    </Container>
  </footer>
  );
};

/* ══════════════════════════════
   STICKY WHATSAPP
══════════════════════════════ */
const StickyWA = () => (
  <a href="https://wa.me/966539446123" target="_blank" rel="noreferrer"
    style={{
      position: 'fixed', bottom: 28, right: 28, zIndex: 900,
      width: 52, height: 52, borderRadius: '50%',
      background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 20px rgba(37,211,102,.35)', transition: 'transform .2s, box-shadow .2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,.5)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,.35)'; }}
    aria-label="واتساب"
  >
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  </a>
);

Object.assign(window, { Nav, Hero, HeritageStrip, Process, Services, Philosophy, Trust, Testimonials, FAQ, CTABanner, Footer, StickyWA });
