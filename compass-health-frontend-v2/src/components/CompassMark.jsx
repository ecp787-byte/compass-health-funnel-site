// The Compass Health mark: an 8-facet compass-rose star inside a broken ring
// (open where the east point crosses it), redrawn from the approved brand
// sheet. Colors and facet light/dark placement are taken directly from that
// artwork: navy facets and ring, teal facets catching the light, in the
// same alternating pattern as the reference (N-left/E-top/S-right/W-top
// dark; the opposite facet on each point light). Colors are fixed brand
// values, not theme tokens, so the mark never shifts if a UI token is
// later retuned.
const NAVY = '#0C2C47';
const RING = '#0C2C47';

export default function CompassMark({ className = 'brand-mark', title = 'Compass Health' }) {
  return (
    <svg className={className} viewBox="0 0 100 100" role="img" aria-label={title}>
      <defs>
        <radialGradient id="chTealFacet" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#14607A" />
          <stop offset="100%" stopColor="#8FD3D8" />
        </radialGradient>
      </defs>

      {/* broken ring, open on the east side where the star's right point crosses it */}
      <path
        d="M 68.93 77.03 A 33 33 0 1 1 68.93 22.97"
        fill="none"
        stroke={RING}
        strokeWidth="6.5"
        strokeLinecap="round"
      />

      {/* 8-facet star, drawn over the ring */}
      <g>
        {/* North */}
        <polygon points="50,50 42.22,42.22 50,4" fill={NAVY} />
        <polygon points="50,50 50,4 57.78,42.22" fill="url(#chTealFacet)" />
        {/* East */}
        <polygon points="50,50 57.78,42.22 96,50" fill={NAVY} />
        <polygon points="50,50 96,50 57.78,57.78" fill="url(#chTealFacet)" />
        {/* South */}
        <polygon points="50,50 57.78,57.78 50,96" fill={NAVY} />
        <polygon points="50,50 50,96 42.22,57.78" fill="url(#chTealFacet)" />
        {/* West */}
        <polygon points="50,50 42.22,57.78 4,50" fill="url(#chTealFacet)" />
        <polygon points="50,50 4,50 42.22,42.22" fill={NAVY} />
      </g>
    </svg>
  );
}
