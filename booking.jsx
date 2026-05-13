/* ══════════════════════════════
   BOOKING MODAL — v3
   4 steps · price calculator · Riyadh only
══════════════════════════════ */

const OCCASIONS_LIST = [
  { value: 'home',      label: 'مناسبة منزلية' },
  { value: 'family',    label: 'عائلية' },
  { value: 'corporate', label: 'ضيافة شركات' },
  { value: 'waleema',   label: 'وليمة / عشاء' },
  { value: 'ramadan',   label: 'رمضانية' },
  { value: 'other',     label: 'أخرى' },
];

const GUESTS_OPTIONS = ['٢٠', '٣٠', '٤٠', '٥٠', '٦٠', '+٦٠'];

const TIME_OPTIONS = [
  { value: 'am',        label: 'قبل الظهر' },
  { value: 'afternoon', label: 'بعد الظهر' },
  { value: 'maghrib',   label: 'المغرب' },
  { value: 'isha',      label: 'العشاء' },
  { value: 'custom',    label: 'وقت مخصص' },
];

const LOGISTICS = [
  { key: 'space',    q: 'هل يوجد مساحة كافية للبوفيه؟' },
  { key: 'tables',   q: 'هل يوجد طاولات في المكان؟' },
  { key: 'chairs',   q: 'هل يوجد كراسي في المكان؟' },
  { key: 'outdoor',  q: 'هل المناسبة في الخارج (خيمة / فلة)؟' },
  { key: 'power',    q: 'هل يوجد مصدر كهرباء قريب؟' },
  { key: 'elevator', q: 'هل يوجد مصعد للوصول لمكان المناسبة؟' },
  { key: 'staff',    q: 'هل تحتاج طاقم خدمة من ثُليم؟' },
];

const STEPS = ['المناسبة', 'الموقع والإعداد', 'بياناتك', 'المراجعة'];

const PRICE_PER_PERSON = 180;
const SETUP_PER_PERSON = 50;
const VAT_RATE = 0.15;

/* ── helpers ── */
const arabicToNumber = str => {
  if (!str) return 0;
  if (str === '+٦٠') return 70;
  const map = { '٢٠': 20, '٣٠': 30, '٤٠': 40, '٥٠': 50, '٦٠': 60 };
  return map[str] || parseInt(str) || 0;
};

const toArabicNum = n => n.toLocaleString('ar-SA');

/* ── sub-components ── */
const FieldLabel = ({ children }) => (
  <div style={{
    fontFamily: F.sans, fontSize: 11, fontWeight: 700,
    color: C.greenL, letterSpacing: '0.1em', textTransform: 'uppercase',
    marginBottom: 10,
  }}>{children}</div>
);

const ChipRow = ({ value, onChange, options, cols = 3 }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 8 }}>
    {options.map(opt => {
      const sel = value === (opt.value || opt);
      return (
        <button key={opt.value || opt} type="button" onClick={() => onChange(opt.value || opt)}
          style={{
            padding: '11px 8px', cursor: 'pointer', borderRadius: 0,
            fontFamily: F.text, fontWeight: sel ? 500 : 300, fontSize: 14,
            textAlign: 'center', transition: 'all .15s',
            background: sel ? C.ink : 'transparent',
            color: sel ? C.cream : C.ink,
            border: `1px solid ${sel ? C.ink : C.border}`,
          }}
        >{opt.label || opt}</button>
      );
    })}
  </div>
);

const TextField = ({ value, onChange, placeholder, type = 'text', textarea, min }) => {
  const [focus, setFocus] = React.useState(false);
  const s = {
    width: '100%', background: 'transparent', outline: 'none',
    fontFamily: F.text, fontWeight: 300, fontSize: 15, color: C.ink,
    border: `1px solid ${focus ? C.ink : C.border}`,
    borderRadius: 0, padding: '13px 15px', transition: 'border-color .18s',
    resize: 'vertical',
  };
  return textarea
    ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        rows={3} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={s} />
    : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        type={type} min={min} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={s} />;
};

const YesNoField = ({ label, value, onChange }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 0', borderBottom: `1px solid ${C.border}`,
    gap: 12,
  }}>
    <span style={{ fontFamily: F.text, fontWeight: 300, fontSize: 14, color: C.ink, lineHeight: 1.4 }}>{label}</span>
    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
      {[['نعم', 'yes'], ['لا', 'no'], ['لست متأكداً', 'unsure']].map(([lbl, val]) => {
        const sel = value === val;
        return (
          <button key={val} type="button" onClick={() => onChange(val)}
            style={{
              padding: '6px 10px', cursor: 'pointer', borderRadius: 0,
              fontFamily: F.sans, fontSize: 10, fontWeight: 600,
              letterSpacing: '0.06em', transition: 'all .15s',
              background: sel ? C.ink : 'transparent',
              color: sel ? C.cream : C.greenL,
              border: `1px solid ${sel ? C.ink : C.border}`,
              whiteSpace: 'nowrap',
            }}
          >{lbl}</button>
        );
      })}
    </div>
  </div>
);

/* ── Price Calculator ── */
const PriceBox = ({ guests, wantsSetup }) => {
  const n = arabicToNumber(guests);
  if (!n) return null;
  const hosp   = n * PRICE_PER_PERSON;
  const setup  = wantsSetup ? n * SETUP_PER_PERSON : 0;
  const subtotal = hosp + setup;
  const vat    = Math.round(subtotal * VAT_RATE);
  const total  = subtotal + vat;
  return (
    <div style={{
      background: C.ink, borderRadius: 0, padding: '20px 20px',
      marginTop: 20,
    }}>
      <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 700,
        color: 'rgba(194,164,128,.5)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14 }}>
        التسعير التقديري
      </div>
      {[
        [`خدمات الضيافة (${toArabicNum(n)} ضيف × ${toArabicNum(PRICE_PER_PERSON)} ر.س)`, toArabicNum(hosp) + ' ر.س'],
        ...(wantsSetup ? [[`إعداد وتجهيز (${toArabicNum(n)} ضيف × ${toArabicNum(SETUP_PER_PERSON)} ر.س)`, toArabicNum(setup) + ' ر.س']] : []),
        [`ضريبة القيمة المضافة (١٥٪)`, toArabicNum(vat) + ' ر.س'],
      ].map(([k, v], i) => (
        <div key={i} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '7px 0', borderBottom: '1px solid rgba(194,164,128,.1)',
        }}>
          <span style={{ fontFamily: F.sans, fontSize: 11, color: 'rgba(218,200,179,.55)' }}>{k}</span>
          <span style={{ fontFamily: F.display, fontWeight: 700, fontSize: 14, color: C.beige }}>{v}</span>
        </div>
      ))}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 14, marginTop: 4,
      }}>
        <span style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 700, color: C.beige, letterSpacing: '0.1em' }}>الإجمالي التقديري</span>
        <span style={{ fontFamily: F.display, fontWeight: 900, fontSize: 22, color: C.cream }}>{toArabicNum(total)} ر.س</span>
      </div>
      <p style={{ fontFamily: F.text, fontWeight: 300, fontSize: 11, color: 'rgba(218,200,179,.4)', marginTop: 10, lineHeight: 1.6 }}>
        * هذا تسعير تقديري. السعر النهائي يُحدَّد بعد مراجعة تفاصيل المناسبة من فريق ثُليم.
      </p>
    </div>
  );
};

/* ══════════════════════════════
   BOOKING MODAL
══════════════════════════════ */
const BookingModal = ({ open, onClose, prefill }) => {
  const [step,      setStep]  = React.useState(0);
  const [submitted, setSub]   = React.useState(false);
  const [sending,   setSend]  = React.useState(false);

  const [data, setData] = React.useState({
    occasion: '', occasionOther: '',
    guests: '', date: '', time: '',
    customTime: '', district: '',
    notes: '', name: '', phone: '',
    logistics: {}, wantsSetup: false,
    source: 'Website',
  });

  React.useEffect(() => { if (prefill) setData(d => ({ ...d, ...prefill })); }, [prefill]);
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  React.useEffect(() => { if (!open) { setStep(0); setSub(false); setSend(false); } }, [open]);

  if (!open) return null;

  const set    = (k, v) => setData(d => ({ ...d, [k]: v }));
  const setLog = (k, v) => setData(d => ({ ...d, logistics: { ...d.logistics, [k]: v } }));

  /* Validation per step */
  const canNext = [
    data.occasion && data.guests,
    data.date && data.time,
    data.name && data.phone && data.phone.length >= 10,
    true,
  ];

  const occasionLabel = OCCASIONS_LIST.find(o => o.value === data.occasion)?.label || '';
  const timeLabel     = TIME_OPTIONS.find(t => t.value === data.time)?.label || '';

  /* CRM + WhatsApp submission */
  const handleSubmit = async () => {
    setSend(true);
    const n = arabicToNumber(data.guests);
    const hosp  = n * PRICE_PER_PERSON;
    const setup = data.wantsSetup ? n * SETUP_PER_PERSON : 0;
    const subtotal = hosp + setup;
    const vat   = Math.round(subtotal * VAT_RATE);
    const total = subtotal + vat;

    const logisticsText = LOGISTICS
      .filter(l => data.logistics[l.key])
      .map(l => `${l.q.replace('؟', '')}: ${
        data.logistics[l.key] === 'yes' ? 'نعم' :
        data.logistics[l.key] === 'no'  ? 'لا'  : 'غير متأكد'
      }`)
      .join('\n');

    const lines = [
      'السلام عليكم، أرغب في حجز ضيافة مع ثُليم 🌿',
      '',
      `📌 المناسبة: ${occasionLabel}${data.occasionOther ? ' — ' + data.occasionOther : ''}`,
      `👥 عدد الضيوف: ${data.guests}`,
      `📅 التاريخ: ${data.date}`,
      `🕐 الوقت: ${timeLabel}${data.time === 'custom' && data.customTime ? ' — ' + data.customTime : ''}`,
      `📍 المنطقة (الرياض): ${data.district || 'غير محدد'}`,
      '',
      '—— تفاصيل المكان ——',
      logisticsText || 'لم تُحدَّد',
      data.wantsSetup ? '✔ يحتاج إعداد وتجهيز (+٥٠ ر.س/ضيف)' : '✖ بدون إعداد',
      '',
      '—— التسعير التقديري ——',
      `الضيافة: ${toArabicNum(hosp)} ر.س`,
      ...(data.wantsSetup ? [`الإعداد: ${toArabicNum(setup)} ر.س`] : []),
      `ضريبة (١٥٪): ${toArabicNum(vat)} ر.س`,
      `الإجمالي: ${toArabicNum(total)} ر.س`,
      '',
      '—— بيانات التواصل ——',
      `الاسم: ${data.name}`,
      `الجوال: ${data.phone}`,
      ...(data.notes ? [`ملاحظات: ${data.notes}`] : []),
      '',
      `المصدر: ${data.source} | الحالة: طلب جديد`,
    ];

    window.open(`https://wa.me/966539446123?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
    setSub(true);
    setSend(false);
  };

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(42,38,32,.65)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div style={{
        background: C.cream, width: '100%', maxWidth: 520,
        border: `1px solid ${C.border}`,
        maxHeight: '92vh', overflowY: 'auto',
        boxShadow: '0 32px 96px rgba(42,38,32,.3)',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px', borderBottom: `1px solid ${C.border}`,
          position: 'sticky', top: 0, background: C.cream, zIndex: 10,
        }}>
          <Logo height={26} />
          <button onClick={onClose}
            style={{ fontSize: 22, color: C.greenL, background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1, padding: '4px 8px' }}>×</button>
        </div>

        {submitted ? (
          /* ── Success ── */
          <div style={{ padding: '56px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: 36, color: C.beige, marginBottom: 20 }}>✦</div>
            <h3 style={{ fontFamily: F.display, fontWeight: 900, fontSize: 28, color: C.ink, marginBottom: 16, lineHeight: 1.2 }}>
              وصلنا طلبك
            </h3>
            <p style={{ fontFamily: F.text, fontWeight: 300, fontSize: 16, color: C.green, lineHeight: 1.85, marginBottom: 36, maxWidth: 340, margin: '0 auto 36px' }}>
              سيقوم فريق ثُليم بمراجعة تفاصيل المناسبة والتواصل معك لتأكيد العرض المناسب.
            </p>
            <button onClick={onClose}
              style={{
                fontFamily: F.sans, fontSize: 11, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '14px 36px', background: C.ink, color: C.cream,
                border: 'none', cursor: 'pointer',
              }}>إغلاق</button>
          </div>
        ) : (
          <div style={{ padding: '24px 24px 36px' }}>

            {/* Progress bar */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', marginBottom: 10 }}>
                {STEPS.map((s, i) => (
                  <div key={i} style={{ flex: 1 }}>
                    <div style={{
                      height: 2, marginBottom: 8, transition: 'background .3s',
                      background: i <= step ? C.ink : C.border,
                    }} />
                    <span style={{
                      fontFamily: F.sans, fontSize: 10, fontWeight: 600,
                      letterSpacing: '0.06em', display: 'block', textAlign: 'center',
                      color: i === step ? C.ink : i < step ? C.green : C.greenL,
                    }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Step 0: المناسبة ── */}
            {step === 0 && (
              <div>
                <div style={{ fontFamily: F.display, fontWeight: 900, fontSize: 22, color: C.ink, marginBottom: 28, lineHeight: 1.2 }}>
                  ما طبيعة مناسبتك؟
                </div>

                <div style={{ marginBottom: 24 }}>
                  <FieldLabel>نوع المناسبة</FieldLabel>
                  <ChipRow value={data.occasion} onChange={v => set('occasion', v)} options={OCCASIONS_LIST} cols={2} />
                  {data.occasion === 'other' && (
                    <div style={{ marginTop: 10 }}>
                      <TextField value={data.occasionOther} onChange={v => set('occasionOther', v)} placeholder="اكتب نوع مناسبتك..." />
                    </div>
                  )}
                </div>

                <div>
                  <FieldLabel>عدد الضيوف</FieldLabel>
                  <ChipRow value={data.guests} onChange={v => set('guests', v)} options={GUESTS_OPTIONS} cols={3} />
                </div>

                {data.guests && (
                  <PriceBox guests={data.guests} wantsSetup={data.wantsSetup} />
                )}
              </div>
            )}

            {/* ── Step 1: الموقع والإعداد ── */}
            {step === 1 && (
              <div>
                <div style={{ fontFamily: F.display, fontWeight: 900, fontSize: 22, color: C.ink, marginBottom: 28 }}>
                  متى وأين؟
                </div>

                <div style={{ marginBottom: 20 }}>
                  <FieldLabel>تاريخ المناسبة</FieldLabel>
                  <TextField value={data.date} onChange={v => set('date', v)} type="date" min={new Date().toISOString().split('T')[0]} />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <FieldLabel>وقت المناسبة</FieldLabel>
                  <ChipRow value={data.time} onChange={v => set('time', v)} options={TIME_OPTIONS} cols={3} />
                  {data.time === 'custom' && (
                    <div style={{ marginTop: 10 }}>
                      <TextField value={data.customTime} onChange={v => set('customTime', v)} placeholder="مثال: الساعة ٧ مساءً" />
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: 20 }}>
                  <FieldLabel>الحي / المنطقة — الرياض</FieldLabel>
                  <TextField value={data.district} onChange={v => set('district', v)} placeholder="مثال: العليا، حي النرجس، الملقا..." />
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    background: C.creamD, border: `1px solid ${C.border}`,
                    padding: '11px 14px', marginTop: 8,
                  }}>
                    <Diamond size={4} color={C.beige} />
                    <span style={{ fontFamily: F.sans, fontSize: 12, color: C.green }}>
                      نخدم مدينة الرياض حصراً في الوقت الحالي
                    </span>
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <FieldLabel>تفاصيل المكان</FieldLabel>
                  <div style={{ border: `1px solid ${C.border}`, padding: '0 16px' }}>
                    {LOGISTICS.map(l => (
                      <YesNoField key={l.key} label={l.q} value={data.logistics[l.key] || ''} onChange={v => setLog(l.key, v)} />
                    ))}
                  </div>
                </div>

                <div>
                  <FieldLabel>إعداد وتجهيز كامل (+٥٠ ر.س / ضيف)</FieldLabel>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {[['نعم، أحتاج إعداد', true], ['لا، فقط الطعام', false]].map(([lbl, val]) => {
                      const sel = data.wantsSetup === val;
                      return (
                        <button key={String(val)} type="button" onClick={() => set('wantsSetup', val)}
                          style={{
                            padding: '12px', cursor: 'pointer', borderRadius: 0,
                            fontFamily: F.text, fontWeight: sel ? 500 : 300, fontSize: 14,
                            transition: 'all .15s', textAlign: 'center',
                            background: sel ? C.ink : 'transparent',
                            color: sel ? C.cream : C.ink,
                            border: `1px solid ${sel ? C.ink : C.border}`,
                          }}
                        >{lbl}</button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2: بياناتك ── */}
            {step === 2 && (
              <div>
                <div style={{ fontFamily: F.display, fontWeight: 900, fontSize: 22, color: C.ink, marginBottom: 28 }}>
                  كيف نتواصل معك؟
                </div>

                <div style={{ marginBottom: 18 }}>
                  <FieldLabel>الاسم</FieldLabel>
                  <TextField value={data.name} onChange={v => set('name', v)} placeholder="اسمك الكريم" />
                </div>

                <div style={{ marginBottom: 18 }}>
                  <FieldLabel>رقم الجوال</FieldLabel>
                  <TextField value={data.phone} onChange={v => set('phone', v)} placeholder="05XXXXXXXX" type="tel" />
                </div>

                <div>
                  <FieldLabel>ملاحظات إضافية (اختياري)</FieldLabel>
                  <TextField value={data.notes} onChange={v => set('notes', v)} placeholder="أي تفاصيل تودّ إضافتها..." textarea />
                </div>
              </div>
            )}

            {/* ── Step 3: المراجعة ── */}
            {step === 3 && (
              <div>
                <div style={{ fontFamily: F.display, fontWeight: 900, fontSize: 22, color: C.ink, marginBottom: 28 }}>
                  مراجعة طلبك
                </div>

                <div style={{ border: `1px solid ${C.border}`, marginBottom: 8 }}>
                  {[
                    ['المناسبة',   occasionLabel + (data.occasionOther ? ' — ' + data.occasionOther : '')],
                    ['عدد الضيوف', data.guests + ' ضيف'],
                    ['التاريخ',    data.date],
                    ['الوقت',      timeLabel + (data.time === 'custom' && data.customTime ? ' — ' + data.customTime : '')],
                    ['المنطقة',    data.district || 'الرياض'],
                    ['الإعداد',    data.wantsSetup ? 'نعم (+٥٠ ر.س/ضيف)' : 'بدون إعداد'],
                    ['الاسم',      data.name],
                    ['الجوال',     data.phone],
                    ...(data.notes ? [['ملاحظات', data.notes]] : []),
                  ].map(([k, v], i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                      gap: 16, padding: '12px 16px',
                      background: i % 2 === 0 ? C.cream : C.creamD,
                    }}>
                      <span style={{ fontFamily: F.sans, fontSize: 11, color: C.greenL, fontWeight: 600, flexShrink: 0 }}>{k}</span>
                      <span style={{ fontFamily: F.text, fontWeight: 400, fontSize: 14, color: C.ink, textAlign: 'left' }}>{v}</span>
                    </div>
                  ))}
                </div>

                <PriceBox guests={data.guests} wantsSetup={data.wantsSetup} />

                <p style={{ fontFamily: F.text, fontWeight: 300, fontSize: 13, color: C.greenL, lineHeight: 1.7, marginTop: 16 }}>
                  بالضغط على "أرسل ضيافتك" ستنتقل إلى واتساب لإرسال تفاصيل المناسبة لفريق ثُليم.
                </p>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, gap: 12 }}>
              {step > 0 ? (
                <button type="button" onClick={() => setStep(s => s - 1)}
                  style={{
                    fontFamily: F.sans, fontSize: 11, fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '13px 24px', cursor: 'pointer', background: 'transparent',
                    color: C.greenL, border: `1px solid ${C.border}`,
                  }}>← رجوع</button>
              ) : <div />}

              {step < 3 ? (
                <button type="button"
                  onClick={() => canNext[step] && setStep(s => s + 1)}
                  style={{
                    fontFamily: F.sans, fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    padding: '14px 32px', cursor: canNext[step] ? 'pointer' : 'not-allowed',
                    background: canNext[step] ? C.ink : C.border,
                    color: canNext[step] ? C.cream : C.greenL,
                    border: 'none', transition: 'all .2s',
                  }}>التالي →</button>
              ) : (
                <button type="button" onClick={handleSubmit} disabled={sending}
                  style={{
                    fontFamily: F.sans, fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    padding: '14px 32px', cursor: 'pointer',
                    background: C.burgundy, color: C.cream,
                    border: 'none', transition: 'all .2s',
                    opacity: sending ? .6 : 1,
                  }}>أرسل ضيافتك ✦</button>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { BookingModal });
