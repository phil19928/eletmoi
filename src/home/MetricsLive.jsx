/*
  Live values laid over the parent "Aujourd'hui" metrics block (real capture,
  1074×783 card). Same block exists inside the parent dashboard screenshot at
  x 50 / y 382 of the 1170×2415 capture — see MetricsLive.inPhone.
  Values are written by the hero timeline through [data-m] hooks.
  Numbers are illustrative, as in the reels.
*/
const W = 1074, H = 783;
const box = (l, t, w, h) => ({ left: `${(l / W) * 100}%`, top: `${(t / H) * 100}%`, width: `${(w / W) * 100}%`, height: `${(h / H) * 100}%` });

export default function MetricsLive({ initial = { passe: 0, restant: 30, conso: 0, gagne: 0 } }) {
  const v = initial;
  return (
    <div className="ml" aria-hidden="true">
      <span className="ml__val ml__big" style={{ ...box(300, 116, 474, 128), background: "#f0f5f2" }}>
        <b data-m="passe">{v.passe}</b><i>min</i>
      </span>
      <span className="ml__bar" style={box(40, 283, 994, 29)}>
        <span data-m="bar" style={{ transform: `scaleX(${v.passe / 90})` }} />
      </span>
      <span className="ml__val ml__sub" style={{ ...box(370, 330, 334, 50), background: "#eef4f1" }}>
        <b data-m="passe">{v.passe}</b>&nbsp;min / 1h30
      </span>
      <span className="ml__val ml__small" style={box(58, 582, 284, 56)}>
        <b data-m="restant">{v.restant}</b>&nbsp;min
      </span>
      <span className="ml__val ml__small" style={box(398, 582, 280, 56)}>
        <b data-m="conso">{v.conso}</b>&nbsp;min
      </span>
      <span className="ml__val ml__small ml__green" style={box(733, 582, 284, 56)}>
        +<b data-m="gagne">{v.gagne}</b>&nbsp;min
      </span>
    </div>
  );
}

/* Position of the metrics card inside the parent dashboard capture (1170×2415). */
export const IN_PHONE = {
  left: `${(50 / 1170) * 100}%`,
  top: `${(382 / 2415) * 100}%`,
  width: `${(1074 / 1170) * 100}%`,
  height: `${(783 / 2415) * 100}%`,
};
