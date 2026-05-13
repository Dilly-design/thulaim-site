/* ══════════════════════════════
   BLOG — مقالات في الضيافة السعودية
══════════════════════════════ */

const ARTICLES = [
  {
    cat: 'دليل الضيافة',
    title: 'كيف تختار ضيافة مناسبتك في الرياض؟',
    en: 'Choosing Your Hospitality in Riyadh',
    excerpt: 'دليل عملي يساعدك على تحديد نوع الضيافة المناسب، عدد الأصناف، وكيفية الحصول على أفضل تجربة لضيوفك.',
    time: '٤ دقائق',
  },
  {
    cat: 'ضيافة شركات',
    title: 'كيف تنجح ضيافة فعاليات شركتك؟',
    en: 'Corporate Hospitality Done Right',
    excerpt: 'الفرق بين ضيافة الشركة التي تُبهر العملاء وتلك التي تُحرج. معايير، نصائح، وما يجب التحقق منه قبل اليوم.',
    time: '٥ دقائق',
  },
  {
    cat: 'رمضان',
    title: 'ضيافة رمضان: الإفطار والسحور بلمسة نجدية',
    en: 'Ramadan Hospitality — Iftar & Suhoor',
    excerpt: 'كيف تصمّم تجربة إفطار لا تُنسى في بيتك أو شركتك؟ الأصناف، الترتيب، والتوقيت.',
    time: '٦ دقائق',
  },
  {
    cat: 'مناسبات نسائية',
    title: 'بوفيه المناسبة النسائية: ما الذي تبحثين عنه؟',
    en: "Women's Occasion Buffet Guide",
    excerpt: 'من السلطات إلى الحلويات — دليل اختيار قائمة تُعجب ضيوفك وتعكس ذوقك في التنظيم.',
    time: '٤ دقائق',
  },
  {
    cat: 'ولائم كبرى',
    title: 'الوليمة الكبرى: كيف تخطط لها بنجاح؟',
    en: 'Planning a Grand Feast',
    excerpt: 'الولائم فوق ٥٠ ضيفاً تحتاج تخطيطاً مختلفاً. كل ما تحتاج معرفته عن الكميات، التوقيت، والتجهيز.',
    time: '٧ دقائق',
  },
  {
    cat: 'إرث الضيافة',
    title: 'الضيافة النجدية: إرث وليس مجرد طعام',
    en: 'Najdi Hospitality — A Living Heritage',
    excerpt: 'قراءة في قيم الضيافة السعودية الأصيلة ومضيف ثُليم التاريخي — كيف يُلهمنا اليوم في كل مناسبة.',
    time: '٥ دقائق',
  },
];

const Blog = ({ onBook }) => {
  const mobile = useIsMobile();
  return (
    <section style={{ background: C.creamD, padding: 'clamp(72px,13vh,160px) 0' }}>
      <Container>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: 56, flexWrap: 'wrap', gap: 16,
        }}>
          <SectionHeader
            eyebrow="مقالات"
            title="في الضيافة السعودية"
            en="Saudi Hospitality Insights"
            maxWidth={500}
            style={{ marginBottom: 0 }}
          />
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 1,
          border: `1px solid ${C.border}`,
        }}>
          {ARTICLES.map((a, i) => (
            <ArticleCard key={i} article={a} index={i} onBook={onBook} mobile={mobile} />
          ))}
        </div>
      </Container>
    </section>
  );
};

const ArticleCard = ({ article: a, index: i, onBook, mobile }) => {
  const [hov, setHov] = React.useState(false);
  const cols = mobile ? 1 : 3;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: mobile ? '28px 24px' : '36px 32px',
        background: hov ? C.cream : 'transparent',
        borderLeft: !mobile && i % cols !== cols - 1 ? `1px solid ${C.border}` : 'none',
        borderBottom: mobile && i < 5 ? `1px solid ${C.border}` : (!mobile && i < 3 ? `1px solid ${C.border}` : 'none'),
        transition: 'background .25s',
        display: 'flex', flexDirection: 'column', gap: 0, cursor: 'default',
      }}
    >
      <div style={{
        fontFamily: F.sans, fontSize: 9, fontWeight: 700,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: C.burgundy, marginBottom: 14,
      }}>{a.cat}</div>
      <div style={{
        fontFamily: F.display, fontWeight: 700, fontSize: mobile ? 17 : 19,
        color: C.ink, lineHeight: 1.3, marginBottom: 8,
      }}>{a.title}</div>
      <div style={{
        fontFamily: F.display, fontStyle: 'italic', fontWeight: 300,
        fontSize: 12, color: C.greenL, marginBottom: 16,
      }}>{a.en}</div>
      <Rule color={C.border} style={{ marginBottom: 16 }} />
      <p style={{
        fontFamily: F.text, fontWeight: 300, fontSize: 14,
        lineHeight: 1.85, color: C.green, margin: 0, flex: 1,
      }}>{a.excerpt}</p>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.border}`,
      }}>
        <span style={{ fontFamily: F.sans, fontSize: 10, color: C.greenL }}>قراءة {a.time}</span>
        <button
          onClick={() => onBook && onBook({})}
          style={{
            fontFamily: F.sans, fontSize: 9, fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: C.burgundy, background: 'none', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
          }}
        >اطلب ضيافتك <span>←</span></button>
      </div>
    </div>
  );
};

Object.assign(window, { Blog });
