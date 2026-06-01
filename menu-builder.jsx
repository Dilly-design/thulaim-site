/* Menu Builder — اقترح لي / أختار بنفسي */

const MENU_CATS = [
  {
    t: 'المقبلات', en: 'Starters', tone: 'beige',
    items: ['متبل','بابا غنوج','حمص','حمص بالشمندر','حمص باللحمة','رولات باذنجان باللبنة','ورق عنب','ورق عنب كرسبي','مسخن','كبة مشوية','سمبوسة هندية','داينمايت شرامب','مقالي مشكلة'],
    popular: ['متبل','حمص','مسخن','سمبوسة هندية','رولات باذنجان باللبنة'],
  },
  {
    t: 'السلطات', en: 'Salads', tone: 'green',
    items: ['سلطة زهرة','سلطة آسيوية','سلطة زعتر','سلطة سيزر','سلطة فتوش','سلطة جرجير','سلطة تبولة','سلطة شمندر','سلطة كينوا','سلطة يونانية'],
    popular: ['سلطة فتوش','سلطة زهرة','سلطة تبولة','سلطة سيزر'],
  },
  {
    t: 'الأطباق الرئيسية', en: 'Main Courses', tone: 'ink',
    items: ['كبسة لحم','برياني لحم','مرقوق','كبيبة حائل','مشاوي مشكلة','بامية باللحم','كباب إيراني','كباب بالكرز','ستيك','برياني دجاج','بخاري دجاج','مسالا دجاج مع خبز نان','دجاج بكريمة الليمون','دجاج حلو','صينية شاورما الدجاج','أرز صيني بقطع الدجاج'],
    popular: ['كبسة لحم','مشاوي مشكلة','برياني دجاج','بخاري دجاج','مرقوق'],
  },
  {
    t: 'الأطباق الجانبية', en: 'Accompaniments', tone: 'cream',
    items: ['كشري','محشي مشكلة','محشي ورق عنب (مضروبة)','لفائف باذنجان','كرات بطاطس بالدجاج','كبيبة باللبن','جريش','خضار بالكريمة'],
    popular: ['كشري','محشي مشكلة','جريش','محشي ورق عنب (مضروبة)'],
  },
  {
    t: 'الباستا', en: 'Pasta', tone: 'beige',
    items: ['فيتوتشيني','ريزوتو السبانخ والدجاج','لازانيا باللحم','باستا بيني أرابياتا','أصداف مكرونة بالدجاج','مكرونة بشاميل بالدجاج','نودلز الدجاج','باستا بيستو بالدجاج'],
    popular: ['لازانيا باللحم','ريزوتو السبانخ والدجاج','فيتوتشيني'],
  },
  {
    t: 'الحلويات', en: 'Desserts', tone: 'burg',
    items: ['أم علي','تيراميسو','كيكة العسل','كيكة التوت والليمون','براونيز بالتوت','ترافيل مانجو','سلة فواكه','بسبوسة'],
    popular: ['أم علي','بسبوسة','تيراميسو','كيكة العسل'],
  },
];

/* Recommended counts by guest group */
const REC_TABLE = {
  '٢٠': { starters: 2, salads: 3, mains: 4, sides: 0, pasta: 0, sweets: 3 },
  '٣٠': { starters: 3, salads: 4, mains: 5, sides: 0, pasta: 0, sweets: 4 },
  '٤٠': { starters: 3, salads: 4, mains: 6, sides: 0, pasta: 0, sweets: 4 },
  '٥٠': { starters: 4, salads: 5, mains: 7, sides: 0, pasta: 0, sweets: 5 },
  '٦٠': { starters: 4, salads: 5, mains: 8, sides: 0, pasta: 0, sweets: 5 },
  '+٦٠':{ starters: 5, salads: 6, mains: 9, sides: 0, pasta: 0, sweets: 6 },
};
const CAT_KEYS = ['starters','salads','mains','sides','pasta','sweets'];

const buildRecommended = (guests) => {
  const counts = REC_TABLE[guests] || REC_TABLE['٣٠'];
  const keys = CAT_KEYS;
  const result = {};
  MENU_CATS.forEach((cat, i) => {
    const n = counts[keys[i]] || 3;
    result[cat.t] = cat.popular.slice(0, n).concat(cat.items.filter(x => !cat.popular.includes(x)).slice(0, Math.max(0, n - cat.popular.length)));
  });
  return result;
};

/* ── Menu Preview (always-visible section) ── */
const MenuPreview = ({ onBook }) => (
  <section id="menu" style={{ background: C.creamD, padding: 'clamp(72px,10vh,120px) 0' }}>
    <Container>
      <SectionHeader eyebrow="قائمة ثُليم" title="صمّم ضيافتك" en="Build Your Menu" sub="اختر بنفسك أو دعنا نقترح لك — كل قائمة تُبنى خصيصاً لمناسبتك." />
      <MenuBuilder onBook={onBook} />
    </Container>
  </section>
);

/* ── Main MenuBuilder component ── */
const MenuBuilder = ({ onBook }) => {
  const [mode, setMode]       = React.useState(null);       // 'suggest' | 'diy'
  const [guests, setGuests]   = React.useState('٣٠');
  const [recMenu, setRecMenu] = React.useState(null);
  const [selected, setSelected] = React.useState({});       // {catTitle: Set}
  const [phase, setPhase]     = React.useState('pick');     // 'pick' | 'result'

  const guestOpts = ['٢٠','٣٠','٤٠','٥٠','٦٠','+٦٠'];

  const initDIY = () => {
    const init = {};
    MENU_CATS.forEach(c => { init[c.t] = new Set(); });
    setSelected(init);
    setMode('diy');
    setPhase('pick');
  };

  const toggleItem = (cat, item) => {
    setSelected(prev => {
      const next = { ...prev };
      const s = new Set(next[cat]);
      s.has(item) ? s.delete(item) : s.add(item);
      next[cat] = s;
      return next;
    });
  };

  const buildSuggest = () => {
    setRecMenu(buildRecommended(guests));
    setMode('suggest');
    setPhase('result');
  };

  const totalSelected = Object.values(selected).reduce((n, s) => n + s.size, 0);

  /* Mode selector */
  if (!mode) return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 700 }}>
      {[
        {
          key: 'suggest', icon: '✦',
          title: 'اقترح لي', sub: 'بناءً على أكثر الاختيارات طلباً وعدد ضيوفك',
          action: () => setMode('suggest'),
        },
        {
          key: 'diy', icon: '◈',
          title: 'أختار بنفسي', sub: 'تصفّح كل الأصناف واختر ما يناسبك',
          action: initDIY,
        },
      ].map(opt => (
        <div
          key={opt.key}
          onClick={opt.action}
          style={{
            border: `1px solid ${C.border}`, borderRadius: 2, padding: '36px 28px',
            cursor: 'pointer', transition: 'all .2s', background: C.cream,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.beige; e.currentTarget.style.background = C.cream; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; }}
        >
          <div style={{ fontFamily: F.text, fontSize: 28, color: C.beige, marginBottom: 14 }}>{opt.icon}</div>
          <div style={{ fontFamily: F.text, fontWeight: 700, fontSize: 20, color: C.ink, marginBottom: 8 }}>{opt.title}</div>
          <div style={{ fontFamily: F.text, fontWeight: 300, fontSize: 14, lineHeight: 1.8, color: C.green }}>{opt.sub}</div>
        </div>
      ))}
    </div>
  );

  /* Suggest mode — guest picker */
  if (mode === 'suggest' && phase === 'pick') return (
    <div style={{ maxWidth: 560 }}>
      <button onClick={() => setMode(null)} style={{ fontFamily: F.sans, fontSize: 12, color: C.greenL, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 28 }}>← رجوع</button>
      <div style={{ fontFamily: F.text, fontWeight: 700, fontSize: 22, color: C.ink, marginBottom: 8 }}>كم عدد ضيوفك؟</div>
      <p style={{ fontFamily: F.text, fontWeight: 300, fontSize: 15, color: C.green, marginBottom: 28 }}>
        بناءً عليه نحدد العدد المناسب من كل صنف.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 32 }}>
        {guestOpts.map(g => (
          <button
            key={g}
            onClick={() => setGuests(g)}
            style={{
              padding: '14px', borderRadius: 2, cursor: 'pointer',
              fontFamily: F.text, fontWeight: guests === g ? 500 : 300, fontSize: 16,
              background: guests === g ? C.ink : 'transparent',
              color: guests === g ? C.cream : C.ink,
              border: `1px solid ${guests === g ? C.ink : C.border}`,
              transition: 'all .18s',
            }}
          >{g} ضيف</button>
        ))}
      </div>
      <Btn kind="primary" onClick={buildSuggest}>اعرض لي التوصية →</Btn>
    </div>
  );

  /* Suggest mode — result */
  if (mode === 'suggest' && phase === 'result') return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: F.text, fontWeight: 700, fontSize: 22, color: C.ink, marginBottom: 6 }}>
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
                  <div style={{ fontFamily: F.text, fontWeight: 700, fontSize: 16, color: C.ink }}>{cat.t}</div>
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

  /* DIY mode */
  if (mode === 'diy') return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <button onClick={() => setMode(null)} style={{ fontFamily: F.sans, fontSize: 12, color: C.greenL, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 6, display: 'block' }}>← رجوع</button>
          <div style={{ fontFamily: F.text, fontWeight: 700, fontSize: 20, color: C.ink }}>اختر أصنافك</div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ fontFamily: F.sans, fontSize: 13, color: C.green }}>
            {totalSelected} صنف مختار
          </span>
          {totalSelected > 0 && (
            <Btn kind="burgundy" size="sm" onClick={() => onBook({})}>أرسل قائمتي</Btn>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {MENU_CATS.map((cat, ci) => {
          const sel = selected[cat.t] || new Set();
          return (
            <div key={ci} style={{ border: `1px solid ${C.border}`, borderRadius: 2, background: C.cream }}>
              <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: F.text, fontWeight: 700, fontSize: 17, color: C.ink }}>{cat.t}</div>
                {sel.size > 0 && <span style={{ fontFamily: F.sans, fontSize: 12, color: C.burgundy, fontWeight: 600 }}>✓ {sel.size} مختار</span>}
              </div>
              <div style={{ padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cat.items.map((item, ii) => {
                  const on = sel.has(item);
                  return (
                    <button
                      key={ii}
                      onClick={() => toggleItem(cat.t, item)}
                      style={{
                        padding: '8px 14px', borderRadius: 2, cursor: 'pointer',
                        fontFamily: F.text, fontWeight: on ? 500 : 300, fontSize: 14,
                        background: on ? C.ink : 'transparent',
                        color: on ? C.cream : C.ink,
                        border: `1px solid ${on ? C.ink : C.border}`,
                        transition: 'all .15s',
                      }}
                    >
                      {cat.popular.includes(item) && !on && (
                        <span style={{ color: C.beige, marginLeft: 4, fontSize: 10 }}>★</span>
                      )}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return null;
};

Object.assign(window, { MenuPreview, MenuBuilder });
