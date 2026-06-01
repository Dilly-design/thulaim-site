const TWEAK_DEFAULTS = { heroTone: 'ink' };

const App = () => {
  const [tweaks, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
  const [bookingOpen, setBookingOpen] = React.useState(false);
  const [prefill, setPrefill]         = React.useState(null);

  const openBooking = (data) => {
    setPrefill(data || null);
    setBookingOpen(true);
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  React.useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section, footer'));
    const toReveal = sections.slice(1); // skip Hero (always visible)
    toReveal.forEach(el => el.classList.add('section-reveal'));

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '-30px 0px' });

    toReveal.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Nav onBook={() => openBooking()} />
      <Hero onBook={() => openBooking()} onMenu={() => openBooking()} tone={tweaks.heroTone} />
      <MarqueeStrip />
      <HeritageStrip />
      <Story />
      <Services />
      <MenuPreview onBook={openBooking} />
      <Philosophy />
      <Gallery />
      <Process onBook={() => openBooking()} />
      <Testimonials />
      <FAQ />
      <Blog onBook={openBooking} />
      <Footer />
      <StickyWA />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} prefill={prefill} />

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection title="Hero">
          <window.TweakRadio
            label="الخلفية"
            value={tweaks.heroTone}
            options={[{ label: 'داكن', value: 'ink' }, { label: 'فاتح', value: 'cream' }]}
            onChange={(v) => setTweak('heroTone', v)}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
