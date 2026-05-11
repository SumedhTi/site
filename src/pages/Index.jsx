import { useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Shuffle, Feather } from "lucide-react";
import PaperCard from "./PaperCard";
import heroFlower from "../assets/hero_image.jpg";
import { Context } from "../Context.jsx";


const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;  
  const { poemData, isLoading } = useContext(Context);
  
  const washRef = useRef(null);
  
  
  const openRandom = () => {
    const r = poemData[Math.floor(Math.random() * poemData.length)];
    navigate(`/site/entry/${r.id}`);
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
    }
  };

  useEffect(() => {
    if (id) {
      handleScroll(id);
    }
  }, [id]);

  // useEffect(() => {
  //   const handleParallax = () => {
  //     if (!washRef.current) return;
  //     const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  //     const currentScroll = window.scrollY;
  //     const scrollFraction = maxScroll > 0 ? currentScroll / maxScroll : 0;
  //     const washHeight = washRef.current.offsetHeight;
  //     const viewHeight = window.innerHeight;
  //     const maxMove = washHeight - viewHeight;

  //     const yPos = scrollFraction * maxMove;
  //     washRef.current.style.transform = `translateY(-${yPos}px)`;
  //   };

  //   window.addEventListener("scroll", handleParallax);
  //   window.addEventListener("resize", handleParallax);
  //   const resizeObserver = new ResizeObserver(() => {
  //     handleParallax();
  //   });
  //   resizeObserver.observe(document.body);

  //   // Initial trigger
  //   handleParallax();

  //   return () => {
  //     window.removeEventListener("scroll", handleParallax);
  //     window.removeEventListener("resize", handleParallax);
  //     resizeObserver.disconnect();
  //   };
  // }, [poemData]); // Re-run math if data updates

  if (isLoading) return <div>Restoring memories...</div>;

  return (
    <main className="relative mx-auto min-h-screen max-w-xl px-5 pb-32 sm:px-8">
      <div 
        ref={washRef}
        className="pointer-events-none fixed inset-0 -z-10 will-change-transform"
        style={{ height: "100vh" }} 
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroFlower})`,
            // filter: "contrast(1.1) saturate(1.1) brightness(1.1)",
            height: "100%", 
          }}
        />
        {/* Warm wash layers */}
        {/* <div aria-hidden className="absolute inset-0 bg-linear-to-b from-paper/10 via-paper/20 to-paper dusk" /> */}
        {/* <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,hsl(var(--ink)/0.5)_100%)]  " /> */}
      </div>

      {/* Hero Section */}
      <header className="relative -mx-5 mb-10 sm:-mx-8 dusk ">
        <div className="relative h-[10vh] min-h-120 w-full">
          <div className="absolute inset-x-0 bottom-0 px-6 pb-12 pt-15 text-center animate-ink-bleed">
            <div className="mb-4 flex items-center justify-center gap-3 text-ink">
              <span className="h-px w-10 bg-ink/60" />
              <Feather className="h-4 w-4" aria-hidden />
              <span className="h-px w-10 bg-ink/60" />
            </div>
            {/* <p className="font-hand text-2xl text-sepia drop-shadow-sm">a small collection of —</p> */}
            <h1 className="mt-5 font-display text-5xl font-semibold leading-none text-ink drop-shadow-sm sm:text-6xl">
              शुभ्रा की सरल बातें
            </h1>
            {/* <p className="mx-auto mt-4 max-w-xs font-serif italic text-ink-soft">
              poems and short stories, kept the way one keeps flowers between the pages.
            </p> */}
          </div>
        </div>
      </header>

      {/* Interaction */}
      <div className="mb-10 flex justify-center animate-fade-up dusk">
        <button
          onClick={openRandom}
          className="group inline-flex items-center gap-2 rounded-sm border border-ink/40 bg-paper/40 px-5 py-2 font-hand text-lg text-ink shadow-paper transition-all hover:-translate-y-0.5 hover:bg-paper hover:shadow-deep"
        >
          <Shuffle className="h-4 w-4 transition-transform group-hover:rotate-12" aria-hidden />
          open a random poem
        </button>
      </div>

      {/* Feed */}
      <section aria-label="Writings" className="space-y-10">
        {poemData.map((w, i) => (
          <PaperCard key={w.id} writing={w} index={i} />
        ))}
      </section>

      {/* Footer Hint */}
      <div className="mt-16 text-center animate-fade-up dusk">
        <p className="font-ink text-base leading-loose text-ink-faded">
          this page waits to be written…
        </p>
      </div>
    </main>
  );
};

export default Index;