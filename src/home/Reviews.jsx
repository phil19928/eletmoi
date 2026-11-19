import { REVIEWS, REVIEW_STATS } from "./data.js";
import { Star } from "./ui.jsx";

function Card({ r }) {
  return (
    <figure className="rv__card">
      <div className="rv__stars">{[...Array(5)].map((_, i) => <Star key={i} size={14} />)}</div>
      <blockquote>
        <strong>{r.title}</strong>
        <p>« {r.text} »</p>
      </blockquote>
      <figcaption>{r.author} · <span>{r.source}</span></figcaption>
    </figure>
  );
}

export default function Reviews() {
  const row = [...REVIEWS, ...REVIEWS];
  return (
    <section className="rv" aria-labelledby="rv-title">
      <div className="wrap rv__head">
        <h2 id="rv-title" className="display h3">
          <span className="rv__score">{REVIEW_STATS.rating}</span>
          <span className="rv__stars-lg">{[...Array(5)].map((_, i) => <Star key={i} size={26} />)}</span>
        </h2>
        <p className="muted">Ce que disent les parents. Avis publiés sur l'App Store et Google Play.</p>
      </div>
      <div className="marquee" aria-label="Avis clients">
        <div className="marquee__track">
          {row.map((r, i) => <Card r={r} key={i} />)}
        </div>
      </div>
      <div className="marquee marquee--rev" aria-hidden="true">
        <div className="marquee__track">
          {[...row].reverse().map((r, i) => <Card r={r} key={i} />)}
        </div>
      </div>
    </section>
  );
}
