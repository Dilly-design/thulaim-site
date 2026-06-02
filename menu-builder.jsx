/* Menu Builder — اقترح لي / أختار بنفسي */

const MENU_CATS = [
  {
    t: 'المقبلات', en: 'Starters', key: 'starters',
    items: ['متبل','بابا غنوج','حمص','حمص بالشمندر','حمص باللحمة','رولات باذنجان باللبنة','ورق عنب','ورق عنب كرسبي','مسخن','كبة مشوية','سمبوسة هندية','داينمايت شرامب','مقالي مشكلة','سمبوسة لحم','سبرينق رول','كبة لحم'],
    popular: ['متبل','حمص','مسخن','سمبوسة هندية','رولات باذنجان باللبنة'],
  },
  {
    t: 'السلطات', en: 'Salads', key: 'salads',
    items: ['سلطة زهرة','سلطة آسيوية','سلطة زعتر','سلطة سيزر','سلطة فتوش','سلطة جرجير','سلطة تبولة','سلطة شمندر','سلطة كينوا','سلطة يونانية'],
    popular: ['سلطة فتوش','سلطة زهرة','سلطة تبولة','سلطة سيزر'],
  },
  {
    t: 'الأطباق الرئيسية', en: 'Main Courses', key: 'mains',
    items: ['كبسة لحم','برياني لحم','مرقوق','كبيبة حائل','مشاوي مشكلة','بامية باللحم','كباب إيراني','كباب بالكرز','ستيك','برياني دجاج','بخاري دجاج','مسالا دجاج مع خبز نان','دجاج بكريمة الليمون','دجاج حلو','صينية شاورما الدجاج','أرز صيني بقطع الدجاج'],
    popular: ['كبسة لحم','مشاوي مشكلة','برياني دجاج','بخاري دجاج','مرقوق'],
  },
  {
    t: 'الأطباق الجانبية', en: 'Accompaniments', key: 'sides', optional: true,
    items: ['كشري','محشي مشكلة','محشي ورق عنب (مضروبة)','لفائف باذنجان','كرات بطاطس بالدجاج','كبيبة باللبن','جريش','خضار بالكريمة'],
    popular: ['كشري','محشي مشكلة','جريش','محشي ورق عنب (مضروبة)'],
  },
  {
    t: 'الباستا', en: 'Pasta', key: 'pasta', optional: true,
    items: ['فيتوتشيني','ريزوتو السبانخ والدجاج','لازانيا باللحم','باستا بيني أرابياتا','أصداف مكرونة بالدجاج','مكرونة بشاميل بالدجاج','نودلز الدجاج','باستا بيستو بالدجاج'],
    popular: ['لازانيا باللحم','ريزوتو السبانخ والدجاج','فيتوتشيني'],
  },
  {
    t: 'الحلويات', en: 'Desserts', key: 'sweets',
    items: ['أم علي','تراميسو','كيكة العسل','كيكة التوت والليمون','براونيز بالتوت','ترافيل مانجو','سلة فواكه','بسبوسة'],
    popular: ['أم علي','بسبوسة','تراميسو','كيكة العسل'],
  },
];

/* عدد الأصناف المسموح بها لكل فئة حسب عدد الضيوف */
const REC_TABLE = {
  '٢٠': { starters: 2, salads: 3, mains: 4, sides: 2, pasta: 1, sweets: 3 },
  '٣٠': { starters: 3, salads: 3, mains: 5, sides: 2, pasta: 1, sweets: 4 },
  '٤٠': { starters: 3, salads: 4, mains: 6, sides: 2, pasta: 1, sweets: 4 },
  '٥٠': { starters: 4, salads: 5, mains: 7, sides: 2, pasta: 1, sweets: 5 },
  '٦٠': { starters: 5, salads: 5, mains: 8, sides: 2, pasta: 1, sweets: 5 },
  '+٦٠':{ starters: 5, salads: 6, mains: 9, sides: 3, pasta: 2, sweets: 6 },
};

const getLimits = (g) => {
  const counts = REC_TABLE[g] || REC_TABLE['٣٠'];
  const result = {};
  MENU_CATS.forEach(cat => { result[cat.t] = counts[cat.key] || 2; });
  return result;
};

const buildRecommended = (guests) => {
  const limits = getLimits(guests);
  const result = {};
  MENU_CATS.forEach(cat => {
    const n = limits[cat.t];
    result[cat.t] = cat.popular.slice(0, n).concat(
      cat.items.filter(x => !cat.popular.includes(x)).slice(0, Math.max(0, n - cat.popular.length))
    );
  });
  return result;
};

/* ── Menu Preview (always-visible section) ── */
const MenuPreview = ({ onBook }) => (
  <section id="menu" style={{ background: C.cream, padding: 'clamp(56px,8vh,96px) 0 clamp(72px,10vh,120px)' }}>
    <Container>
      <SectionHeader eyebrow="قائمة ثليم" title="صمّم ضيافتك" en="Build Your Menu" sub="اختر الأصناف بنفسك أو دعنا نقترح لك — كل قائمة تُبنى خصيصاً لعدد ضيوفك." />
      <MenuBuilder onBook={onBook} />
    </Container>
  </section>
);

/* ── Guest Picker (shared between suggest & diy) ── */
const GuestPicker = ({ guests, setGuests, onBack, onNext, nextLabel }) => {
  const guestOpts = ['٢٠','٣٠','٤٠','٥٠','٦٠','+٦٠'];
  const limits = getLimits(guests);
  return (
    <div style={{ maxWidth: 600 }}>
      <button onClick={onBack} style={{ fontFamily: F.sans, fontSize: 12, color: C.greenL, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 28 }}>← رجوع</button>
      <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 22, color: C.ink, marginBottom: 8 }}>كم عدد ضيوفك؟</div>
      <p style={{ fontFamily: F.text, fontWeight: 300, fontSize: 15, color: C.green, marginBottom: 28 }}>
        بناءً على العدد نحدد كم صنف تختار من كل فئة.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 28 }}>
        {guestOpts.map(g => (
          <button
            key={g}
            onClick={() => setGuests(g)}
            style={{
              padding: '14px', borderRadius: 2, cursor: 'pointer',
              fontFamily: F.display, fontWeight: guests === g ? 700 : 300, fontSize: 18,
              background: guests === g ? C.ink : 'transparent',
              color: guests === g ? C.cream : C.ink,
              border: `1px solid ${guests === g ? C.ink : C.border}`,
              transition: 'all .18s',
            }}
          >{g} ضيف</button>
        ))}
      </div>

      {/* ملخص الأصناف المسموحة */}
      <div style={{
        background: C.cream, border: `1px solid ${C.border}`, borderRadius: 2,
        padding: '18px 20px', marginBottom: 28,
      }}>
        <div style={{ fontFamily: F.sans, fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: C.greenL, textTransform: 'uppercase', marginBottom: 12 }}>
          أصناف مسموح باختيارها لـ {guests} ضيف
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {MENU_CATS.map((cat, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 10px', background: C.creamD, borderRadius: 2 }}>
              <span style={{ fontFamily: F.text, fontWeight: 300, fontSize: 13, color: C.green }}>
                {cat.t}
                {cat.optional && <span style={{ fontFamily: F.sans, fontSize: 9, color: C.greenL, marginRight: 4 }}> (إضافي)</span>}
              </span>
              <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: 18, color: C.burgundy }}>{limits[cat.t]}</span>
            </div>
          ))}
        </div>
      </div>

      <Btn kind="primary" onClick={onNext}>{nextLabel} →</Btn>
    </div>
  );
};

/* ── Main MenuBuilder component ── */
const MenuBuilder = ({ onBook }) => {
  const [mode, setMode]       = React.useState(null);       // null | 'suggest' | 'diy'
  const [guests, setGuests]   = React.useState('٣٠');
  const [recMenu, setRecMenu] = React.useState(null);
  const [selected, setSelected] = React.useState({});       // {catTitle: Set}
  const [phase, setPhase]     = React.useState('pick');     // 'pick' | 'result' | 'build'

  const initSelected = () => {
    const init = {};
    MENU_CATS.forEach(c => { init[c.t] = new Set(); });
    return init;
  };

  const startDIY = () => {
    setSelected(initSelected());
    setMode('diy');
    setPhase('pick');
  };

  const toggleItem = (cat, item, limit) => {
    setSelected(prev => {
      const next = { ...prev };
      const s = new Set(next[cat]);
      if (s.has(item)) {
        s.delete(item);
      } else if (s.size < limit) {
        s.add(item);
      }
      next[cat] = s;
      return next;
    });
  };

  const limits = getLimits(guests);
  const totalSelected = Object.values(selected).reduce((n, s) => n + s.size, 0);
  const totalLimit = Object.values(limits).reduce((n, v) => n + v, 0);

  /* ── Mode selector ── */
  if (!mode) return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 700 }}>
      {[
        {
          key: 'suggest', icon: '✦',
          title: 'اقترح لي', sub: 'بناءً على أكثر الاختيارات طلباً وعدد ضيوفك',
          action: () => { setMode('suggest'); setPhase('pick'); },
        },
        {
          key: 'diy', icon: '◈',
          title: 'أختار بنفسي', sub: 'تصفّح كل الأصناف واختر حسب باقتك',
          action: startDIY,
        },
      ].map(opt => (
        <div
          key={opt.key}
          onClick={opt.action}
          style={{
            border: `1px solid ${C.border}`, borderRadius: 2, padding: '36px 28px',
            cursor: 'pointer', transition: 'all .2s', background: C.cream,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.beige; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; }}
        >
          <div style={{ fontFamily: F.text, fontSize: 28, color: C.beige, marginBottom: 14 }}>{opt.icon}</div>
          <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 20, color: C.ink, marginBottom: 8 }}>{opt.title}</div>
          <div style={{ fontFamily: F.text, fontWeight: 300, fontSize: 14, lineHeight: 1.8, color: C.green }}>{opt.sub}</div>
        </div>
      ))}
    </div>
  );

  /* ── Suggest: guest picker ── */
  if (mode === 'suggest' && phase === 'pick') return (
    <GuestPicker
      guests={guests} setGuests={setGuests}
      onBack={() => setMode(null)}
      onNext={() => { setRecMenu(buildRecommended(guests)); setPhase('result'); }}
      nextLabel="اعرض لي التوصية"
    />
  );

  /* ── Suggest: result ── */
  if (mode === 'suggest' && phase === 'result') return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 22, color: C.ink, marginBottom: 6 }}>
            قائمتك المقترحة لـ {guests} ضيف
          </div>
          <p style={{ fontFamily: F.text, fontWeight: 300, fontSize: 14, color: C.green }}>
            بناءً على أكثر الاختيارات طلباً — يمكن تخصيصها عند الحجز
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setPhase('pick')} style={{ fontFamily: F.sans, fontSize: 12, color: C.greenL, background: 'none', border: `1px solid ${C.border}`, borderRadius: 2, padding: '8px 16px', cursor: 'pointer' }}>تغيير العدد</button>
          <Btn kind="burgundy" size="sm" onClick={() => onBook({ guests })}>اطلب هذه القائمة</Btn>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {MENU_CATS.map((cat, ci) => {
          const items = recMenu?.[cat.t] || cat.popular.slice(0, 4);
          return (
            <div key={ci} style={{ border: `1px solid ${C.border}`, borderRadius: 2, overflow: 'hidden', background: C.cream }}>
              <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 16, color: C.ink }}>{cat.t}</div>
                  <div style={{ fontFamily: F.text, fontStyle: 'italic', fontWeight: 300, fontSize: 12, color: C.greenL }}>{cat.en}</div>
                </div>
                <span style={{ fontFamily: F.sans, fontSize: 11, color: C.beige, fontWeight: 600 }}>{items.length} صنف</span>
              </div>
              <div style={{ padding: '14px 20px' }}>
                {items.map((item, ii) => (
                  <div key={ii} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: ii < items.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                    <Diamond size={4} color={C.beige} />
                    <span style={{ fontFamily: F.text, fontWeight: 300, fontSize: 14, color: C.ink }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ── DIY: guest picker ── */
  if (mode === 'diy' && phase === 'pick') return (
    <GuestPicker
      guests={guests} setGuests={setGuests}
      onBack={() => setMode(null)}
      onNext={() => { setSelected(initSelected()); setPhase('build'); }}
      nextLabel="ابدأ الاختيار"
    />
  );

  /* ── DIY: item picker with limits ── */
  if (mode === 'diy' && phase === 'build') return (
    <div>
      {/* Header bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 28, flexWrap: 'wrap', gap: 12,
      }}>
        <div>
          <button
            onClick={() => setPhase('pick')}
            style={{ fontFamily: F.sans, fontSize: 12, color: C.greenL, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 6, display: 'block' }}
          >← تغيير عدد الضيوف</button>
          <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 20, color: C.ink }}>
            اختر أصنافك — {guests} ضيف
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {/* Progress total */}
          <div style={{
            fontFamily: F.sans, fontSize: 12, color: C.green,
            background: C.cream, border: `1px solid ${C.border}`,
            borderRadius: 2, padding: '8px 14px', lineHeight: 1,
          }}>
            <span style={{ color: totalSelected === totalLimit ? C.burgundy : C.ink, fontWeight: 700 }}>{totalSelected}</span>
            <span style={{ color: C.greenL }}> / {totalLimit} صنف</span>
          </div>
          {totalSelected > 0 && (
            <Btn kind="burgundy" size="sm" onClick={() => onBook({ guests })}>أرسل قائمتي</Btn>
          )}
        </div>
      </div>

      {/* Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {MENU_CATS.map((cat, ci) => {
          const sel = selected[cat.t] || new Set();
          const limit = limits[cat.t];
          const full = sel.size >= limit;

          return (
            <div key={ci} style={{ border: `1px solid ${full ? C.beige : C.border}`, borderRadius: 2, background: C.cream, transition: 'border-color .2s' }}>

              {/* Category header */}
              <div style={{
                padding: '14px 20px',
                borderBottom: `1px solid ${C.border}`,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: full ? 'rgba(194,164,128,.06)' : 'transparent',
              }}>
                <div>
                  <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 16, color: C.ink, marginBottom: 2 }}>
                    {cat.t}
                    {cat.optional && (
                      <span style={{ fontFamily: F.sans, fontSize: 9, color: C.greenL, fontWeight: 400, marginRight: 8, letterSpacing: '0.1em' }}>إضافي</span>
                    )}
                  </div>
                  <div style={{ fontFamily: F.sans, fontSize: 10, color: C.greenL, letterSpacing: '0.08em' }}>
                    اختر {limit} {limit === 1 ? 'صنف' : 'أصناف'} من {cat.items.length}
                  </div>
                </div>

                {/* Counter */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  {/* Dots indicator */}
                  <div style={{ display: 'flex', gap: 4 }}>
                    {Array.from({ length: limit }).map((_, di) => (
                      <div key={di} style={{
                        width: 7, height: 7,
                        borderRadius: '50%',
                        background: di < sel.size ? C.burgundy : C.border,
                        transition: 'background .15s',
                      }} />
                    ))}
                  </div>
                  <span style={{
                    fontFamily: F.sans, fontSize: 11, fontWeight: 700,
                    color: full ? C.burgundy : sel.size > 0 ? C.ink : C.greenL,
                    minWidth: 36, textAlign: 'center',
                  }}>
                    {sel.size} / {limit}
                    {full && ' ✓'}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div style={{ padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cat.items.map((item, ii) => {
                  const on = sel.has(item);
                  const disabled = full && !on;
                  return (
                    <button
                      key={ii}
                      onClick={() => !disabled && toggleItem(cat.t, item, limit)}
                      style={{
                        padding: '8px 14px', borderRadius: 2,
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        fontFamily: F.text, fontWeight: on ? 500 : 300, fontSize: 14,
                        background: on ? C.ink : 'transparent',
                        color: on ? C.cream : disabled ? 'rgba(42,38,32,.25)' : C.ink,
                        border: `1px solid ${on ? C.ink : disabled ? 'rgba(42,38,32,.1)' : C.border}`,
                        opacity: disabled ? 0.5 : 1,
                        transition: 'all .15s',
                      }}
                    >
                      {cat.popular.includes(item) && !on && !disabled && (
                        <span style={{ color: C.beige, marginLeft: 5, fontSize: 10 }}>★</span>
                      )}
                      {item}
                    </button>
                  );
                })}
              </div>

              {/* Limit reached message */}
              {full && (
                <div style={{
                  margin: '0 20px 14px',
                  fontFamily: F.sans, fontSize: 10, color: C.burgundy,
                  letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span>✓</span>
                  <span>اكتمل العدد — ألغِ اختياراً لتستبدله</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      {totalSelected > 0 && (
        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'flex-end' }}>
          <Btn kind="burgundy" onClick={() => onBook({ guests })}>
            أرسل قائمتي ({totalSelected} صنف) →
          </Btn>
        </div>
      )}
    </div>
  );

  return null;
};

Object.assign(window, { MenuPreview, MenuBuilder });
