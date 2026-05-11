import { useNavigate } from "react-router-dom";

const tilts = [
  "-rotate-1",
  "rotate-1",
  "-rotate-[0.5deg]",
  "rotate-[0.7deg]",
  "-rotate-[1.2deg]",
];

const PaperCard = ({ writing, index }) => {
  const navigate = useNavigate();
  const tilt = tilts[index % tilts.length];

  const date = new Date(writing.date.replace(/-/g, "\/"));

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      onClick={(e) => navigate(`/site/entry/${writing.id}`)}
      aria-label={`Open ${writing.title}`}
      className={`group relative block animate-fade-up ${tilt} transition-all duration-500 ease-out hover:-translate-y-1 hover:rotate-0 active:translate-y-0`}
      style={{ animationDelay: `${index * 0.01}s` }}
      id={writing.id}
    >
      <article className="paper-surface paper-grain deckle-edge relative overflow-hidden px-6 py-7 sm:px-8 sm:py-9">
        {writing.image && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply"
            style={{
              //backgroundImage: `url(${writing.image})`,
              backgroundColor: "black",
              backgroundSize: "cover",
              backgroundPosition: "center",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />
        )}

        <div className="relative">
          <div className="mb-3 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.25em] text-ink-faded">
            <span className="font-hand text-base normal-case tracking-normal text-sepia">
              {formattedDate}
            </span>
            <span className="h-px flex-1 bg-ink/20" />
            <span className="italic">{writing.isPoem ? "poem" : "story"}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-[2rem] leading-tight text-ink text-shadow-ink">
            {writing.title}
          </h2>

          {writing.isPoem ? (
            <p
              className="mt-4 whitespace-pre-line font-serif text-[1.05rem] leading-relaxed text-ink-soft"
              style={{
                maskImage:
                  "linear-gradient(180deg, black 55%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(180deg, black 55%, transparent 100%)",
              }}
            >
              {writing.content[0]}
              <br />
              {writing.content[1]}
              <br />
              {writing.content[2]}
            </p>
          ): (
            <p
              className="mt-4 whitespace-pre-line font-serif text-[1.05rem] leading-relaxed text-ink-soft"
              style={{
                maskImage:
                  "linear-gradient(180deg, black 55%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(180deg, black 55%, transparent 100%)",
              }}
            >
              {writing.content[0].split(" ").slice(0, 20).join(" ") + " ....."}
            </p>
          )
          }

          <div className="mt-5 flex items-center justify-between">
            <span className="font-hand text-lg text-amber transition-colors group-hover:text-ink">
              read on →
            </span>
            <span className="h-2 w-2 rounded-full bg-ink/40" />
          </div>
        </div>
      </article>
    </div>
  );
};

export default PaperCard;
