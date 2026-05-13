/* ══════════════════════════════
   STORY
══════════════════════════════ */
const Story = () => {
  const mobile = useIsMobile();
  return (
    <section id="story" style={{ background: C.cream, padding: 'clamp(72px,13vh,160px) 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '-2%', transform: 'translateY(-50%)',
        fontFamily: F.display, fontWeight: 900, fontSize: 'clamp(120px,26vw,380px)',
        color: 'rgba(160,55,61,.04)', userSelect: 'none', pointerEvents: 'none',
        lineHeight: 1, whiteSpace: 'nowrap',
      }}>ثُليم</div>

      <Container style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 40 : 96, alignItems: 'center' }}>

          {!mobile && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 8, height: 520 }}>
              <div style={{ gridColumn: '1', gridRow: '1 / 3' }}>
                <Photo src="assets/photo-outdoor.jpg" alt="أجواء الضيافة السعودية الأصيلة" objectPosition="center" style={{ height: '100%', aspectRatio: 'unset' }} />
              </div>
              <Photo src="assets/photo-table.jpg"    alt="إعداد طاولة ثُليم بالورود"   objectPosition="center" style={{ aspectRatio: 'unset', height: '100%' }} />
              <Photo src="assets/photo-desserts.jpg" alt="حلويات ضيافة ثُليم"          objectPosition="center top" style={{ aspectRatio: 'unset', height: '100%' }} />
            </div>
          )}

          <div>
            <Eyebrow>قصة الاسم</Eyebrow>
            <h2 style={{
              fontFamily: F.display, fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 56px)', color: C.ink,
              lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.02em',
            }}>
              إرث مستلهم من<br />
              <span style={{ color: C.burgundy }}>مضيف ثُليم ١٩٤٠م</span>
            </h2>
            <p style={{ fontFamily: F.text, fontWeight: 300, fontSize: mobile ? 15 : 17, lineHeight: 1.95, color: C.green, marginBottom: 20 }}>
              في عام ١٩٤٠م، أمر الملك عبدالعزيز بإنشاء مضيف ثُليم في الرياض — مقراً لاستقبال الضيوف وإطعام القادمين وملجأً لكل محتاج. كان يستقبل خمسة عشر ألف شخص يومياً، ويُقدَّم فيه يومياً خمسون خروفاً وثمانون كيساً من الأرز على مائدتين: صباحاً ومساءً.
            </p>
            <p style={{ fontFamily: F.text, fontWeight: 300, fontSize: mobile ? 15 : 17, lineHeight: 1.95, color: C.green, marginBottom: 32 }}>
              اسمنا مستوحى من هذا المضيف العريق — إرث الكرم النجدي الأصيل حين كانت الضيافة فعلاً حضارياً قبل أن تكون خدمة.
            </p>
            <blockquote style={{
              borderRight: `3px solid ${C.beige}`, paddingRight: 20,
              fontFamily: F.text, fontStyle: 'italic', fontWeight: 300,
              fontSize: mobile ? 16 : 19, color: C.ink, lineHeight: 1.75, marginBottom: 36,
            }}>
              "كل وليمة عند ثُليم تبدأ من فكرة واحدة: الضيف شَرَف."
            </blockquote>
            <div style={{ display: 'flex', gap: mobile ? 24 : 48 }}>
              {[{ n: '١٩٤٠', l: 'مضيف ثُليم' }, { n: '+١٥٠٠٠', l: 'ضيف يومياً' }, { n: 'اليوم', l: 'نكمل المسيرة' }].map((t, i) => (
                <div key={i} style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                  <div style={{ fontFamily: F.display, fontWeight: 900, fontSize: mobile ? 18 : 22, color: C.burgundy, lineHeight: 1 }}>{t.n}</div>
                  <div style={{ fontFamily: F.sans, fontSize: 9, fontWeight: 700,
                    color: C.greenL, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 6 }}>{t.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

/* ══════════════════════════════
   PACKAGES
══════════════════════════════ */
const PKGS = [
  { g: '٢٠', label: 'ضيافة موجزة',  desc: 'للمجالس الخاصة والاجتماعات الصغيرة',  occasion: 'مجلس خاص · اجتماع',      mains: 4, starters: 2, salads: 3, sweets: 3 },
  { g: '٣٠', label: 'ضيافة كاملة',  desc: 'مناسبة عائلية أو ضيافة شركة متوسطة', occasion: 'عائلي · شركات',           mains: 5, starters: 3, salads: 3, sweets: 4 },
  { g: '٤٠', label: 'ضيافة مكتملة', desc: 'مناسبات نسائية وعائلية بتنوع كامل',   occasion: 'نسائي · عائلي',           mains: 6, starters: 3, salads: 4, sweets: 4 },
  { g: '٥٠', label: 'ضيافة فاخرة',  desc: 'ولائم رسمية ومناسبات كبار الضيوف',    occasion: 'وليمة رسمية · رمضان',     mains: 7, starters: 4, salads: 5, sweets: 5 },
  { g: '٦٠', label: 'وليمة كبرى',   desc: 'أكبر مناسباتك بحضور فاخر كامل',       occasion: 'أعراس · فعاليات كبرى',    mains: 8, starters: 5, salads: 5, sweets: 5 },
];

const Packages = ({ onBook }) => {
  const mobile = useIsMobile();
  return (
  <section id="packages" style={{ background: C.ink, padding: 'clamp(72px,13vh,160px) 0' }}>
    <Container>
      <SectionHeader eyebrow="الباقات" title="باقة لكل مناسبة" en="A Package for Every Occasion" light
        sub="كل باقة مصمّمة بعناية لتوازن بين التنوع والجودة." maxWidth={580} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
        gap: 1, border: '1px solid rgba(194,164,128,.12)',
      }}>
        {PKGS.map((p, i) => (
          <div key={i} style={{
            borderLeft: mobile ? (i % 2 !== 0 ? '1px solid rgba(194,164,128,.12)' : 'none') : (i > 0 ? '1px solid rgba(194,164,128,.12)' : 'none'),
            borderBottom: mobile && i < PKGS.length - (PKGS.length % 2 === 0 ? 2 : 1) ? '1px solid rgba(194,164,128,.12)' : 'none',
            padding: mobile ? '24px 16px' : '36px 24px', display: 'flex', flexDirection: 'column', gap: 0,
            transition: 'background .25s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(194,164,128,.05)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ fontFamily: F.sans, fontSize: 9, fontWeight: 700,
              color: 'rgba(194,164,128,.5)', letterSpacing: '0.16em',
              textTransform: 'uppercase', marginBottom: 8 }}>{p.g} ضيف</div>
            <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 18,
              color: C.cream, marginBottom: 6, lineHeight: 1.2 }}>{p.label}</div>
            <div style={{ fontFamily: F.text, fontWeight: 300, fontSize: 12,
              color: 'rgba(218,200,179,.45)', lineHeight: 1.6, marginBottom: 6 }}>{p.desc}</div>
            <div style={{ fontFamily: F.sans, fontSize: 9, color: C.beige, opacity: .5,
              letterSpacing: '0.08em', marginBottom: 20 }}>{p.occasion}</div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                ['الرئيسية', p.mains],
                ['المقبلات', p.starters],
                ['السلطات', p.salads],
                ['الحلويات', p.sweets],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '9px 0', borderBottom: '1px solid rgba(194,164,128,.08)',
                }}>
                  <span style={{ fontFamily: F.sans, fontSize: 10, color: 'rgba(147,149,128,.5)',
                    letterSpacing: '0.08em' }}>{k}</span>
                  <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: 16, color: C.beige }}>{v}</span>
                </div>
              ))}
            </div>
            <button onClick={() => onBook({ guests: p.g })}
              style={{
                marginTop: 24, width: '100%', padding: '13px', fontFamily: F.sans,
                fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                cursor: 'pointer', borderRadius: 0, transition: 'all .2s',
                background: 'transparent', color: 'rgba(194,164,128,.6)',
                border: '1px solid rgba(194,164,128,.25)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = C.beige; e.currentTarget.style.color = C.ink; e.currentTarget.style.borderColor = C.beige; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(194,164,128,.6)'; e.currentTarget.style.borderColor = 'rgba(194,164,128,.25)'; }}
            >اطلب هذه الباقة</button>
          </div>
        ))}
      </div>
    </Container>
  </section>
  );
};

/* ══════════════════════════════
   GALLERY
══════════════════════════════ */
const Gallery = () => {
  const mobile = useIsMobile();
  return (
    <section style={{ background: C.cream, padding: 'clamp(72px,13vh,160px) 0' }}>
      <Container>
        <SectionHeader eyebrow="معرض الضيافة" title="لحظات من ثُليم" en="Moments from Thulaim" maxWidth={480} />
        {mobile ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <Photo src="assets/photo-hall.jpg"     alt="قاعة وليمة ثُليم"          loading="lazy" ratio="3/4" objectPosition="center" />
            <Photo src="assets/photo-table.jpg"    alt="طاولة ضيافة ثُليم بالورود" loading="lazy" ratio="3/4" objectPosition="center" />
            <Photo src="assets/photo-outdoor.jpg"  alt="أجواء حفل ضيافة خارجي"    loading="lazy" ratio="4/3" objectPosition="center" />
            <Photo src="assets/photo-food.jpg"     alt="أطباق ضيافة ثُليم"         loading="lazy" ratio="4/3" objectPosition="center" />
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: '260px 260px',
            gap: 8,
          }}>
            <div style={{ gridColumn: '1 / 6', gridRow: '1 / 3' }}>
              <Photo src="assets/photo-hall.jpg"    alt="قاعة وليمة ثُليم الفاخرة"     loading="lazy" objectPosition="center" style={{ height: '100%', aspectRatio: 'unset' }} />
            </div>
            <div style={{ gridColumn: '6 / 9', gridRow: '1' }}>
              <Photo src="assets/photo-table.jpg"   alt="طاولة ضيافة ثُليم بالورود"    loading="lazy" objectPosition="center" style={{ height: '100%', aspectRatio: 'unset' }} />
            </div>
            <div style={{ gridColumn: '9 / 13', gridRow: '1' }}>
              <Photo src="assets/photo-venue.jpg"   alt="أجواء حفل ضيافة ثُليم"        loading="lazy" objectPosition="center" style={{ height: '100%', aspectRatio: 'unset' }} />
            </div>
            <div style={{ gridColumn: '6 / 10', gridRow: '2' }}>
              <Photo src="assets/photo-outdoor.jpg" alt="إعداد حفل خارجي ليلي لثُليم" loading="lazy" objectPosition="center" style={{ height: '100%', aspectRatio: 'unset' }} />
            </div>
            <div style={{ gridColumn: '10 / 13', gridRow: '2' }}>
              <Photo src="assets/photo-food.jpg"    alt="أطباق ضيافة ثُليم"             loading="lazy" objectPosition="center top" style={{ height: '100%', aspectRatio: 'unset' }} />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

/* ══════════════════════════════
   MARQUEE STRIP
══════════════════════════════ */
const MARQUEE_ITEMS = [
  'ضيافة أصيلة', 'كرم نجدي', 'الرياض', 'تنفيذ دقيق', 'مضيف ثُليم ١٩٤٠م',
  'مناسبات لا تُنسى', 'بيت ضيافة سعودي', 'ضيافة تُشرَّف وتُبهر', '+١٥٠٠٠ ضيف يومياً',
];

const MarqueeStrip = ({ bg = C.ink, fg = C.beige, speed = 48 }) => {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div style={{
      background: bg,
      borderTop: '1px solid rgba(194,164,128,.1)',
      borderBottom: '1px solid rgba(194,164,128,.1)',
      padding: '16px 0', overflow: 'hidden',
    }}>
      <div dir="ltr" style={{
        display: 'flex', width: 'max-content',
        animation: `marquee-scroll ${speed}s linear infinite`,
      }}>
        {items.map((text, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
            <span style={{
              fontFamily: F.sans, fontSize: 9.5, fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: fg, opacity: 0.55, padding: '0 24px', whiteSpace: 'nowrap',
            }}>{text}</span>
            <span style={{
              display: 'inline-block', width: 4, height: 4,
              background: fg, opacity: 0.25, transform: 'rotate(45deg)', flexShrink: 0,
            }} />
          </span>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { Story, Packages, Gallery, MarqueeStrip });
