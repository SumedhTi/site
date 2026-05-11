import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { Context } from "../Context.jsx";
import { editLikes } from "../dataHandeler/dataHandeler.js";

const Entry = () => {
  let { id } = useParams();
  id = parseInt(id);
  const navigate = useNavigate();
  const { poemData, isLoading } = useContext(Context);

  const writing = poemData.find((p) => p.id == id);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (!writing) return;
    const stored = JSON.parse(localStorage.getItem("likes")) || {};
    const isLiked = stored[writing.id] || false;
    setLiked(isLiked);
    setLikes(writing.likes);
  }, [writing]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <div>Restoring memories...</div>;
  }

  if (!writing) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <p className="font-ink text-lg text-ink-faded">
            this page waits to be written…
          </p>
          <Link
            to="/site"
            className="mt-6 inline-block font-hand text-xl text-amber underline"
          >
            return to the library
          </Link>
        </div>
      </main>
    );
  }

  const date = new Date(writing.date.replace(/-/g, "\/"));

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const toggleLike = () => {
    let likesData = JSON.parse(localStorage.getItem("likes")) || {};
    const isLiked = likesData[writing.id] || false;
    const newLiked = !isLiked;
    likesData[writing.id] = newLiked;
    localStorage.setItem("likes", JSON.stringify(likesData));
    setLiked(newLiked);
    setLikes(prev => prev + (newLiked ? 1 : -1));
    editLikes(writing.id, (newLiked ? 1 : -1));
  };

  return (
    <main className="relative mx-auto min-h-screen max-w-2xl px-4 pb-24 pt-6 sm:px-6">
      {/* Floating chrome */}
      <nav className="sticky top-3 z-20 mb-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/site", {state: {id: writing.id}})}
          aria-label="Back to library"
          className="group inline-flex items-center gap-2 rounded-full bg-paper/70 px-3 py-2 text-ink shadow-paper backdrop-blur-sm transition-all hover:-translate-x-0.5 hover:bg-paper"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
            aria-hidden
          />
          <span className="font-hand text-base">back</span>
        </button>
        <button
          onClick={toggleLike}
          aria-label={liked ? "Unlike this entry" : "Like this entry"}
          aria-pressed={liked}
          className="group inline-flex items-center gap-2 rounded-full bg-paper/70 px-5 py-3 text-ink shadow-paper backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-paper active:scale-95"
        >
          <Heart
            className={`h-6 w-6 transition-all ${liked ? "fill-destructive text-destructive scale-110" : "text-ink"}`}
            aria-hidden
          />
          <span className="min-w-5 text-center font-hand text-xl leading-none">
            {likes}
          </span>
        </button>
      </nav>

      {/* Page */}
      <article className="paper-surface paper-grain animate-page-turn relative px-6 py-12 sm:px-12 sm:py-16">
        {/* Margin line (left rule) */}
        <div
          aria-hidden
          className="absolute inset-y-8 left-4 hidden w-px bg-destructive/30 sm:block"
        />

        <header className="relative mb-10 text-center">
          <p className="font-hand text-xl text-sepia">{formattedDate}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            {writing.title}
          </h1>
          <div className="mx-auto mt-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-ink/40" />
            <span className="font-hand text-base italic text-ink-faded">
              {writing.isPoem ? "poem" : "story"}
            </span>
            <span className="h-px w-8 bg-ink/40" />
          </div>
        </header>

        {writing.image && (
          <figure
            className="relative mx-auto my-10 w-[78%] -rotate-2 animate-fade-up delay-1"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Tape */}
            <span
              aria-hidden
              className="absolute -top-3 left-1/2 z-10 h-5 w-20 -translate-x-1/2 -rotate-3 bg-amber/40 shadow-sm"
              style={{ backdropFilter: "blur(1px)" }}
            />
            <img
              src={writing.image}
              alt={writing.imageCaption ?? writing.title}
              loading="lazy"
              className="block w-full border-4 border-paper bg-paper p-1 shadow-deep"
              style={{ filter: "sepia(0.25) contrast(0.95)" }}
            />
            {writing.imageCaption && (
              <figcaption className="mt-3 text-center font-hand text-base text-ink-faded">
                {writing.imageCaption}
              </figcaption>
            )}
          </figure>
        )}

        <div className="relative space-y-6">
          {writing.content.map((p, i) => (
            <p
              key={i}
              className={`animate-fade-up font-serif text-[1.18rem] leading-[1.85] text-ink-soft ${
                i === 0 && writing.type === "story" ? "drop-cap" : ""
              }`}
              style={{ animationDelay: `${0.1 + i * 0.02}s` }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Closing flourish */}
        <div className="mt-14 flex items-center justify-center gap-4 text-ink-faded animate-fade-up delay-5">
          <span className="h-px w-12 bg-ink/40" />
          <span className="font-display text-2xl">❦</span>
          <span className="h-px w-12 bg-ink/40" />
        </div>

        <p className="mt-6 text-center font-ink text-sm text-ink-faded">
          — end of page —
        </p>
      </article>

      <div className="mt-10 text-center flex items-center">
        {id > 1 && (
          <button
            onClick={() =>{ navigate(`/site/entry/${id - 1}`); window.scrollTo(0, 0);}}
            className="font-hand px-10 text-lg text-amber underline-offset-4 hover:underline"
          >
            Read Previous
          </button>
        )}
        <button
          onClick={() =>{ navigate(`/site/entry/${id + 1}`); window.scrollTo(0, 0);}}
          className="font-hand text-lg px-10 text-amber underline-offset-4 hover:underline ml-auto"
        >
          Read Next
        </button>
      </div>
    </main>
  );
};

export default Entry;
